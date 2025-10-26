import { useState, useMemo, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import './styles.css';
import { analyzeText } from './utils/textAnalyzer';
import type { TextStatistics} from './utils/textAnalyzer';

const initialStats: TextStatistics = analyzeText('');

const App = () => {
    const [text, setText] = useState<string>('');
    const [stats, setStats] = useState<TextStatistics>(initialStats);
    const [fullAnalysisRun, setFullAnalysisRun] = useState<boolean>(false);

    const realTimeStats: TextStatistics = useMemo(() => analyzeText(text), [text]);

    const handleAnalyze = useCallback((): void => {
        const result: TextStatistics = analyzeText(text);
        setStats(result);
        setFullAnalysisRun(true);
    }, [text]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const newText: string = event.target.value;
        setText(newText);
        
        if (!fullAnalysisRun) {
             setStats(analyzeText(newText));
        }
    };
    
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
                        <h1 className="title">Text Analyzer</h1>
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

                    <div className="footer">Text Analyzer Pro — Diseñado por mi abuela</div>
                </div>
            </div>
    );
};

export default App;
