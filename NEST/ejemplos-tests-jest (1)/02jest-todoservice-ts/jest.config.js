// ...existing code...

const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',    // usamos jsdom porque estamos en entorno cliente
  roots: ['<rootDir>/src'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage'
};
export default config;