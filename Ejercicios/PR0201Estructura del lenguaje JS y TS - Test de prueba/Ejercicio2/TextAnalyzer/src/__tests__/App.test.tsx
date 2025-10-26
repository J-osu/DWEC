import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Text Analyzer Pro')).toBeInTheDocument();
  });

  it('renders all initial UI elements', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Pega aquí el texto/i)).toBeInTheDocument();
    expect(screen.getByText(/Analizar Texto Completo/i)).toBeInTheDocument();
    expect(screen.getByText(/Estadísticas Clave/i)).toBeInTheDocument();
    expect(screen.getByText(/Top 5 Palabras Clave/i)).toBeInTheDocument();
  });

  it('shows initial empty state statistics', () => {
    render(<App />);
    expect(screen.getByText(/Conteo Rápido: 0 palabras · 0 caracteres/i)).toBeInTheDocument();
  });

  it('updates quick count in real-time', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Pega aquí el texto/i);
    fireEvent.change(textarea, { target: { value: 'Hola mundo' } });
    expect(screen.getByText(/Conteo Rápido: 2 palabras · 10 caracteres/i)).toBeInTheDocument();
  });

  it('enables analyze button when text is entered', () => {
    render(<App />);
    const button = screen.getByText(/Analizar Texto Completo/i);
    expect(button).toBeDisabled();

    const textarea = screen.getByPlaceholderText(/Pega aquí el texto/i);
    fireEvent.change(textarea, { target: { value: 'Hola mundo' } });
    expect(button).not.toBeDisabled();
  });

  it('updates statistics after analysis', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Pega aquí el texto/i);
    const analyzeButton = screen.getByText(/Analizar Texto Completo/i);

    fireEvent.change(textarea, { target: { value: 'Hola mundo. Este es un texto.' } });
    fireEvent.click(analyzeButton);

    // Buscar el elemento que contiene "2" dentro del contenedor de oraciones
    const sentences = screen.getByText('Oraciones').closest('.stat');
    expect(sentences?.querySelector('.value')?.textContent).toBe('2'); // Sentences
    expect(screen.getByText('6')).toBeInTheDocument(); // Words
  });

  it('shows top keywords after analysis', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Pega aquí el texto/i);
    const analyzeButton = screen.getByText(/Analizar Texto Completo/i);

    fireEvent.change(textarea, { target: { value: 'gato gato perro gato perro casa' } });
    fireEvent.click(analyzeButton);

    const topKeywords = screen.getAllByText(/gato|perro|casa/i);
    expect(topKeywords.length).toBeGreaterThan(0);
  });

  it('changes button text after first analysis', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Pega aquí el texto/i);
    const analyzeButton = screen.getByText(/Analizar Texto Completo/i);

    fireEvent.change(textarea, { target: { value: 'Texto de prueba' } });
    fireEvent.click(analyzeButton);

    expect(screen.getByText('Re-Analizar Texto')).toBeInTheDocument();
  });
});