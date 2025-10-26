import { analyzeText } from '../utils/textAnalyzer';

describe('Text Analysis Utils', () => {
  describe('analyzeText', () => {
    it('should return empty statistics for empty text', () => {
      const result = analyzeText('');
      expect(result.characterCount).toBe(0);
      expect(result.wordCount).toBe(0);
      expect(result.topKeywords).toHaveLength(0);
    });

    it('should count characters correctly', () => {
      const text = 'Hola mundo!';
      const result = analyzeText(text);
      expect(result.characterCount).toBe(11); // Including space and !
      expect(result.characterCountNoSpaces).toBe(10); // Without space
    });

    it('should count words correctly', () => {
      const text = 'Hola mundo, esto es una prueba.';
      const result = analyzeText(text);
      expect(result.wordCount).toBe(6);
    });

    it('should calculate sentence count correctly', () => {
      const text = 'Esta es una oración. Esta es otra! Y una más?';
      const result = analyzeText(text);
      expect(result.sentenceCount).toBe(3);
    });

    it('should calculate paragraph count correctly', () => {
      const text = 'Párrafo 1.\n\nPárrafo 2.\n\nPárrafo 3.';
      const result = analyzeText(text);
      expect(result.paragraphCount).toBe(3);
    });

    it('should identify top keywords correctly', () => {
      const text = 'el gato y el perro, el gato negro';
      const result = analyzeText(text);
      const topWords = result.topKeywords;
      expect(topWords[0].word).toBe('gato');
      expect(topWords[0].count).toBe(2);
    });

    it('should calculate average word length correctly', () => {
      const text = 'casa árbol sol';
      const result = analyzeText(text);
      // (4 + 5 + 3) / 3 = 4
      expect(result.averageWordLength).toBe(4);
    });

    it('should calculate average sentence length correctly', () => {
      const text = 'Esta tiene cuatro palabras. Esta tres palabras.';
      const result = analyzeText(text);
      // (4 + 3) / 2 = 3.5
      expect(result.averageSentenceLength).toBe(3.5);
    });

    it('should handle special characters and punctuation', () => {
      const text = '¡Hola! ¿Qué tal? Bien...';
      const result = analyzeText(text);
      expect(result.wordCount).toBe(4);
    });

    it('should ignore stop words in keyword counting', () => {
      const text = 'el la los las un una unos unas gato gato perro';
      const result = analyzeText(text);
      const keywords = Array.from(result.wordFrequency.keys());
      expect(keywords).not.toContain('el');
      expect(keywords).not.toContain('la');
      expect(keywords).toContain('gato');
      expect(keywords).toContain('perro');
    });
  });
});