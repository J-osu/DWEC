/**
 * Configuración de Jest
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Directorio raíz de los tests
  testEnvironment: 'node',
  
  // Patrón para encontrar archivos de test
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js',
  ],
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  
  // Umbral mínimo de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Mostrar resultados detallados
  verbose: true,
};
