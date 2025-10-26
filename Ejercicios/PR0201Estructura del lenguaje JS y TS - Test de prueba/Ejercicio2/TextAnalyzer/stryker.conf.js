/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  coverageAnalysis: "perTest",
  tsconfigFile: "tsconfig.json",
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec).ts?(x)',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js',
    enableFindRelatedTests: true
  }
};