import { useState, useMemo, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import './styles.css';

// =========================================================
// FASE 1: El Analizador (Interfaces y Lógica TypeScript)
// =========================================================

/** Define la estructura para el conteo de palabras clave */
interface WordCount {
    word: string;
    count: number;
}

/** Define la estructura tipada de los resultados del análisis */
interface TextStatistics {
    characterCount: number; // Total de caracteres (con espacios)
    characterCountNoSpaces: number; // Total de caracteres (sin espacios)
    wordCount: number; // Total de palabras
    uniqueWordCount: number; // Total de palabras únicas utilizadas
    sentenceCount: number; // Total de oraciones
    paragraphCount: number; // Total de párrafos
    averageWordLength: number; // Longitud media de las palabras
    averageSentenceLength: number; // Número medio de palabras por oración
    topKeywords: WordCount[]; // Las 5 palabras más comunes
    wordFrequency: Map<string, number>; // Un mapa con la frecuencia de cada palabra
}

// Lista de 'stop words' en español
const SPANISH_STOP_WORDS: Set<string> = new Set([
    "a", "al", "algo", "algunas", "algunos", "ante", "antes", "como", "con", "contra", 
    "cual", "cuando", "de", "del", "desde", "donde", "durante", "e", "el", "ella", 
    "ellas", "ellos", "en", "entre", "era", "eras", "es", "esa", "esas", "ese", 
    "eso", "esos", "esta", "estas", "este", "esto", "estos", "ha", "hace", "hacer", 
    "hasta", "hay", "la", "las", "le", "les", "lo", "los", "me", "mi", "mis", 
    "muy", "más", "nada", "ni", "no", "o", "os", "otra", "otras", "otro", 
    "otros", "para", "pero", "puedo", "puede", "que", "quien", "se", "si", "sin", 
    "so", "sobre", "solo", "su", "sus", "tal", "tambien", "también", "te", "tendrá", 
    "tendrán", "tengo", "tiene", "una", "unas", "uno", "unos", "usa", "usted", "va", 
    "van", "y", "ya", "yo",
]);

/**
 * Limpia y tokeniza el texto, convirtiéndolo a minúsculas para un conteo preciso.
 * @param {string} text - El texto de entrada.
 * @returns {string[]} Un array de palabras limpias.
 */
const getCleanWords = (text: string): string[] => {
    // Convertir a minúsculas
    const lowerText: string = text.toLowerCase();
    // Reemplazar todo lo que NO sea letra, número, espacio, apóstrofe o guion por espacio.
    // Usamos propiedades Unicode para soportar letras acentuadas en español.
    const punctuationRegex: RegExp = /[^\p{L}\p{N}\s'-]+/gu;
    const cleanText: string = lowerText.replace(punctuationRegex, ' ');
    
    // Dividir por espacios (uno o más) y filtrar cadenas vacías o solo numéricas
    return cleanText.split(/\s+/)
        .filter(word => word.length > 0)
        .filter(word => !/^\d+$/.test(word));
};

/**
 * Calcula la frecuencia de cada palabra en el texto, excluyendo stop words.
 * @param {string} text - El texto de entrada.
 * @returns {Map<string, number>} Un mapa con la frecuencia de las palabras clave.
 */
const getWordFrequency = (text: string): Map<string, number> => {
    const words: string[] = getCleanWords(text);
    const frequency: Map<string, number> = new Map();

    words.forEach(word => {
        if (!SPANISH_STOP_WORDS.has(word)) {
            frequency.set(word, (frequency.get(word) || 0) + 1);
        }
    });

    return frequency;
};

/**
 * Función principal que analiza un texto y devuelve todas las estadísticas tipadas.
 * @param {string} text - El texto a analizar.
 * @returns {TextStatistics} El objeto con todas las estadísticas calculadas.
 */
const analyzeText = (text: string): TextStatistics => {
    if (!text || text.trim().length === 0) {
        // Objeto de resultados para texto vacío
        return {
            characterCount: 0, characterCountNoSpaces: 0, wordCount: 0, uniqueWordCount: 0, 
            sentenceCount: 0, paragraphCount: 0, averageWordLength: 0, averageSentenceLength: 0, 
            topKeywords: [], wordFrequency: new Map<string, number>()
        };
    }

    // --- Cuentas Básicas ---
    const characterCount: number = text.length;
    const characterCountNoSpaces: number = text.replace(/[\s\n\r\t]/g, '').length; 
    
    // --- Palabras y Frecuencia ---
    const words: string[] = getCleanWords(text);
    const wordCount: number = words.length;
    
    const wordFrequencyMap: Map<string, number> = getWordFrequency(text);
    const uniqueWordCount: number = wordFrequencyMap.size;
    
    // --- Sentencias y Párrafos ---
    // Oraciones: busca signos de puntuación finales (., !, ?) seguidos de espacio o fin de línea
    const sentenceMatches: RegExpMatchArray | null = text.match(/[^.!?]+[.!?](\s|$)/g);
    const sentenceCount: number = sentenceMatches ? sentenceMatches.length : 0;
    
    // Párrafos: divide por uno o más saltos de línea y filtra los vacíos
    const paragraphs: string[] = text.split(/\n+/).filter(p => p.trim().length > 0);
    const paragraphCount: number = paragraphs.length;

    // --- Promedios ---
    
    // Longitud media de palabras
    const totalWordLength: number = words.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength: number = wordCount > 0 ? parseFloat((totalWordLength / wordCount).toFixed(2)) : 0;
    
    // Longitud media de sentencias (en palabras)
    const averageSentenceLength: number = sentenceCount > 0 ? parseFloat((wordCount / sentenceCount).toFixed(2)) : 0;

    // --- Palabras Clave Principales ---
    const topKeywords: WordCount[] = Array.from(wordFrequencyMap.entries())
        .map(([word, count]): WordCount => ({ word, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return {
        characterCount,
        characterCountNoSpaces,
        wordCount,
        uniqueWordCount,
        sentenceCount,
        paragraphCount,
        averageWordLength,
        averageSentenceLength,
        topKeywords,
        wordFrequency: wordFrequencyMap,
    };
};


// =========================================================
// FASE 3: Interfaz de Usuario (React TSX Component)
// =========================================================

// Usamos la interfaz para inicializar el estado
const initialStats: TextStatistics = analyzeText('');

/**
 * Componente principal de la aplicación Text Analyzer Pro.
 * @returns {JSX.Element} El componente de React.
 */
const App = () => {
    const [text, setText] = useState<string>('');
    const [stats, setStats] = useState<TextStatistics>(initialStats);
    const [fullAnalysisRun, setFullAnalysisRun] = useState<boolean>(false);

    // Usa useMemo para calcular estadísticas simples en tiempo real
    const realTimeStats: TextStatistics = useMemo(() => {
        return analyzeText(text);
    }, [text]);

    // Función para el análisis completo (disparado por el botón)
    const handleAnalyze = useCallback((): void => {
        const result: TextStatistics = analyzeText(text);
        setStats(result);
        setFullAnalysisRun(true);
    }, [text]);

    // Maneja la entrada del usuario (tipado ChangeEvent de HTMLTextAreaElement)
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const newText: string = event.target.value;
        setText(newText);
        
        // Actualización en tiempo real de los contadores básicos en el dashboard
        if (!fullAnalysisRun) {
             setStats(analyzeText(newText));
        }
    };
    
    // Definición tipada de los datos de las tarjetas
    const cardData: { label: string, value: number, description: string }[] = [
        { label: "Caracteres (Total)", value: stats.characterCount, description: "Total incluyendo espacios" },
        { label: "Caracteres (s/espacios)", value: stats.characterCountNoSpaces, description: "Solo letras y dígitos" },
        { label: "Total de Palabras", value: stats.wordCount, description: "Contadas tras limpieza de puntuación" },
        { label: "Palabras Únicas", value: stats.uniqueWordCount, description: "Número de palabras clave distintas" },
        { label: "Oraciones", value: stats.sentenceCount, description: "Finalizadas con ., ! o ?" },
        { label: "Párrafos", value: stats.paragraphCount, description: "Separados por uno o más saltos de línea" },
        { label: "Longitud Media Palabra", value: stats.averageWordLength, description: "Promedio de caracteres por palabra" },
        { label: "Longitud Media Oración", value: stats.averageSentenceLength, description: "Promedio de palabras por oración" },
    ];


    return (
            <div className="app">
                <div className="container">
                    <header className="header">
                        <h1 className="title">Text Analyzer Pro</h1>
                        <p className="subtitle">Herramienta de Análisis Estadístico de Texto Avanzado</p>
                    </header>

                    <div className="grid">
                        <div className="card">
                            <h2 style={{marginTop:0, marginBottom:12}}>Introduce tu Texto</h2>
                            <div className="input-area">
                                <textarea
                                    className="textarea"
                                    rows={15}
                                    placeholder="Pega aquí el texto que deseas analizar. Recuerda usar el botón 'Analizar' para las estadísticas completas."
                                    value={text}
                                    onChange={handleChange}
                                />

                                <div style={{display:'flex',gap:12,alignItems:'center',justifyContent:'space-between',marginTop:6}}>
                                    <button onClick={handleAnalyze} className="btn" disabled={text.trim().length === 0}>
                                        {fullAnalysisRun ? 'Re-Analizar Texto' : 'Analizar Texto Completo'}
                                    </button>
                                    <div className="quick-bar">Conteo Rápido: {realTimeStats.wordCount} palabras · {realTimeStats.characterCount} caracteres</div>
                                </div>
                            </div>
                        </div>

                        <aside className="card">
                            <h2 style={{marginTop:0}}>Estadísticas Clave</h2>

                            <div className="stats-grid" style={{marginTop:12}}>
                                {cardData.map(({ label, value, description }) => (
                                    <div key={label} className="stat">
                                        <span className="label">{label}</span>
                                        <span className="value">{value}</span>
                                        <small style={{color:'var(--muted)'}}>{description}</small>
                                    </div>
                                ))}
                            </div>

                            <div className="top-list">
                                <h3 style={{marginTop:14}}>Top 5 Palabras Clave</h3>
                                {stats.topKeywords.length > 0 ? (
                                    <div style={{marginTop:8}}>
                                        {stats.topKeywords.map((item, index) => (
                                            <div key={item.word} className="top-item">
                                                <div style={{display:'flex',alignItems:'center',gap:10}}>
                                                    <div className={`rank ${index < 3 ? 'primary' : 'secondary'}`}>{index+1}</div>
                                                    <div style={{fontWeight:600}}>{item.word}</div>
                                                </div>
                                                <div style={{color:'var(--muted)',fontWeight:700}}>{item.count}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-note">Las palabras clave aparecerán aquí después del análisis.</div>
                                )}
                            </div>
                        </aside>
                    </div>

                    <div className="footer">Text Analyzer Pro — Diseño modernizado</div>
                </div>
            </div>
    );
};

export default App;
