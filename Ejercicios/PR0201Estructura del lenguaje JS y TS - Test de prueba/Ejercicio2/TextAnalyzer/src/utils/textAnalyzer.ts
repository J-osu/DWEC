export interface WordCount {
    word: string;
    count: number;
}

export interface TextStatistics {
    characterCount: number;
    characterCountNoSpaces: number;
    wordCount: number;
    uniqueWordCount: number;
    sentenceCount: number;
    paragraphCount: number;
    averageWordLength: number;
    averageSentenceLength: number;
    topKeywords: WordCount[];
    wordFrequency: Map<string, number>;
}

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

export const getCleanWords = (text: string): string[] => {
    const lowerText: string = text.toLowerCase();
    const punctuationRegex: RegExp = /[^\p{L}\p{N}\s'-]+/gu;
    const cleanText: string = lowerText.replace(punctuationRegex, ' ');
    
    return cleanText.split(/\s+/)
        .filter(word => word.length > 0)
        .filter(word => !/^\d+$/.test(word));
};

export const getWordFrequency = (text: string): Map<string, number> => {
    const words: string[] = getCleanWords(text);
    const frequency: Map<string, number> = new Map();

    words.forEach(word => {
        if (!SPANISH_STOP_WORDS.has(word)) {
            frequency.set(word, (frequency.get(word) || 0) + 1);
        }
    });

    return frequency;
};
export const analyzeText = (text: string): TextStatistics => {
    if (!text || text.trim().length === 0) {
        return {
            characterCount: 0,
            characterCountNoSpaces: 0,
            wordCount: 0,
            uniqueWordCount: 0,
            sentenceCount: 0,
            paragraphCount: 0,
            averageWordLength: 0,
            averageSentenceLength: 0,
            topKeywords: [],
            wordFrequency: new Map<string, number>()
        };
    }

    const characterCount: number = text.length;
    const characterCountNoSpaces: number = text.replace(/[\s\n\r\t]/g, '').length;
    
    const words: string[] = getCleanWords(text);
    const wordCount: number = words.length;
    
    const wordFrequencyMap: Map<string, number> = getWordFrequency(text);
    const uniqueWordCount: number = wordFrequencyMap.size;
    
    const sentenceMatches: RegExpMatchArray | null = text.match(/[^.!?]+[.!?](\s|$)/g);
    const sentenceCount: number = sentenceMatches ? sentenceMatches.length : 0;
    
    const paragraphs: string[] = text.split(/\n+/).filter(p => p.trim().length > 0);
    const paragraphCount: number = paragraphs.length;

    const totalWordLength: number = words.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength: number = wordCount > 0 ? parseFloat((totalWordLength / wordCount).toFixed(2)) : 0;
    
    const averageSentenceLength: number = sentenceCount > 0 ? parseFloat((wordCount / sentenceCount).toFixed(2)) : 0;

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