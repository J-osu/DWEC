/**
 * Tests para el módulo calculadora
 * Este archivo demuestra diferentes tipos de tests con Jest
 */

const {
  sumar,
  restar,
  multiplicar,
  dividir,
  potencia,
  factorial
} = require('../src/calculadora');

// Grupo de tests para operaciones básicas
describe('Operaciones matemáticas básicas', () => {
  
  // Tests para la función sumar
  describe('sumar()', () => {
    test('debe sumar dos números positivos correctamente', () => {
      expect(sumar(2, 3)).toBe(5);
    });

    test('debe sumar números negativos', () => {
      expect(sumar(-5, -3)).toBe(-8);
    });

    test('debe sumar un número positivo y uno negativo', () => {
      expect(sumar(10, -3)).toBe(7);
    });

    test('debe manejar ceros', () => {
      expect(sumar(0, 0)).toBe(0);
      expect(sumar(5, 0)).toBe(5);
    });

    test('debe manejar números decimales', () => {
      expect(sumar(2.5, 3.7)).toBeCloseTo(6.2);
    });
  });

  // Tests para la función restar
  describe('restar()', () => {
    test('debe restar dos números positivos', () => {
      expect(restar(10, 3)).toBe(7);
    });

    test('debe restar números negativos', () => {
      expect(restar(-5, -3)).toBe(-2);
    });

    test('debe dar resultado negativo cuando el segundo número es mayor', () => {
      expect(restar(3, 10)).toBe(-7);
    });
  });

  // Tests para la función multiplicar
  describe('multiplicar()', () => {
    test('debe multiplicar dos números positivos', () => {
      expect(multiplicar(4, 5)).toBe(20);
    });

    test('debe multiplicar por cero', () => {
      expect(multiplicar(5, 0)).toBe(0);
    });

    test('debe multiplicar números negativos', () => {
      expect(multiplicar(-3, -4)).toBe(12);
      expect(multiplicar(3, -4)).toBe(-12);
    });
  });

  // Tests para la función dividir
  describe('dividir()', () => {
    test('debe dividir dos números correctamente', () => {
      expect(dividir(10, 2)).toBe(5);
    });

    test('debe manejar divisiones con decimales', () => {
      expect(dividir(10, 3)).toBeCloseTo(3.333, 2);
    });

    test('debe lanzar un error al dividir por cero', () => {
      expect(() => dividir(10, 0)).toThrow('No se puede dividir por cero');
    });

    test('debe dividir números negativos', () => {
      expect(dividir(-10, 2)).toBe(-5);
      expect(dividir(-10, -2)).toBe(5);
    });
  });
});

// Tests para operaciones avanzadas
describe('Operaciones matemáticas avanzadas', () => {
  
  describe('potencia()', () => {
    test('debe calcular la potencia correctamente', () => {
      expect(potencia(2, 3)).toBe(8);
      expect(potencia(5, 2)).toBe(25);
    });

    test('debe manejar exponente cero', () => {
      expect(potencia(5, 0)).toBe(1);
    });

    test('debe manejar exponentes negativos', () => {
      expect(potencia(2, -2)).toBe(0.25);
    });
  });

  describe('factorial()', () => {
    test('debe calcular el factorial correctamente', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(4)).toBe(24);
    });

    test('debe manejar casos base', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
    });

    test('debe lanzar error con números negativos', () => {
      expect(() => factorial(-5)).toThrow('No se puede calcular el factorial de un número negativo');
    });
  });
});
