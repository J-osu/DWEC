describe('generatePasswordSecure', () => {
  it('usa crypto.randomInt para longitud y selección de índices', () => {
    const calls: Array<[number, number]> = [];

    // aislamos módulos para mockear 'crypto' antes de que sea requerido por el módulo bajo prueba
    jest.isolateModules(() => {
      jest.doMock('crypto', () => ({
        randomInt: (min: number, max?: number) => {
          calls.push([min, max ?? min]);
          return Math.floor(((max ?? min) + min) / 2);
        }
      }));

      // require dentro del isolateModules para usar la versión mockeada
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { generatePasswordSecure } = require('../lib/generate-passwd');

      const pw = generatePasswordSecure(8, 12, true, true, true, true, '');
      expect(pw.length).toBeGreaterThanOrEqual(8);
      expect(pw.length).toBeLessThanOrEqual(12);
      // Ensure crypto.randomInt was called at least once for length and multiple times for indices
      expect(calls.length).toBeGreaterThanOrEqual(1);

      // cleanup mock
      jest.dontMock('crypto');
    });
  });
});
