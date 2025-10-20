// __tests__/calculadora.test.ts
import { Calculadora } from '../calculadora';

describe('Calculadora', () => {
  const calculadora = new Calculadora();

  it('should sum two numbers', () => {
    expect(calculadora.sumar(2, 3)).toBe(5);
  });

  it('should subtract two numbers', () => {
    expect(calculadora.restar(5, 3)).toBe(2);
  });

  // Agrega más pruebas para los demás métodos...

  it('should throw an error when dividing by zero', () => {
    expect(() => calculadora.dividir(5, 0)).toThrow('No se puede dividir por cero');
  });

  it('should multiply two numbers', () => {
    expect(calculadora.multiplicar(4, 5)).toBe(20);
  });
  
  it('should calculate the square root of a number', () => {
    expect(calculadora.raizCuadrada(16)).toBe(4);
  });
  
  it('should round a number to two decimal places', () => {
    expect(calculadora.redondear(3.14159)).toBe(3.14);
  });


  //Después de ejecutar Styker se añadieron las siguientes pruebas
  it('dividir 4 por 2 debe ser 2', () => {
    expect(calculadora.dividir(4, 2)).toBe(2);
  });

  it('dividir por 0 debe lanzar un error', () => {
    expect(() => calculadora.dividir(4, 0)).toThrow('No se puede dividir por cero');
  });

  
});

