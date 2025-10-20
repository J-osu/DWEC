/**
 * La clase `Calculadora` proporciona métodos para realizar operaciones matemáticas básicas 
 * como suma, resta, multiplicación, división, potencia, raíz cuadrada, módulo y redondeo.

 * @example
 * ```typescript
 * const calculadora = new Calculadora();
 * 
 * // Suma
 * console.log(calculadora.sumar(5, 3)); // 8
 * 
 * // Resta
 * console.log(calculadora.restar(5, 3)); // 2
 * 
 * // Multiplicación
 * console.log(calculadora.multiplicar(5, 3)); // 15
 * 
 * // División
 * console.log(calculadora.dividir(6, 3)); // 2
 * 
 * // Potencia
 * console.log(calculadora.potencia(2, 3)); // 8
 * 
 * // Raíz Cuadrada
 * console.log(calculadora.raizCuadrada(9)); // 3
 * 
 * // Módulo
 * console.log(calculadora.modulo(10, 3)); // 1
 * 
 * // Redondeo
 * console.log(calculadora.redondear(3.14159)); // 3.14
 * console.log(calculadora.redondear(3.14159, 3)); // 3.142
 * ```
 */
export class Calculadora {
  /**
   * Suma dos números.
   * @param {number} a - El primer número.
   * @param {number} b - El segundo número.
   * @returns {number} La suma de los dos números.
   */
  sumar(a: number, b: number): number {
    return a + b;
  }

  /**
   * Resta dos números.
   * @param {number} a - El primer número.
   * @param {number} b - El segundo número.
   * @returns {number} La resta de los dos números.
   */
  restar(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplica dos números.
   * @param {number} a - El primer número.
   * @param {number} b - El segundo número.
   * @returns {number} El producto de los dos números.
   */
  multiplicar(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide dos números.
   * @param {number} a - El numerador.
   * @param {number} b - El denominador.
   * @returns {number} El cociente de los dos números.
   * @throws {Error} Si el denominador es cero.
   */
  dividir(a: number, b: number): number {
    if (b === 0) {
      throw new Error("No se puede dividir por cero");
    }
    return a / b;
  }

  /**
   * Calcula la potencia de un número.
   * @param {number} base - La base.
   * @param {number} exponente - El exponente.
   * @returns {number} El resultado de elevar la base al exponente.
   */
  potencia(base: number, exponente: number): number {
    return Math.pow(base, exponente);
  }

  /**
   * Calcula la raíz cuadrada de un número.
   *
   * @param numero - El número del cual se quiere calcular la raíz cuadrada.
   * @returns La raíz cuadrada del número dado.
   * @throws {Error} Si el número es negativo, se lanza un error indicando que no se puede calcular la raíz cuadrada de un número negativo.
   */
  raizCuadrada(numero: number): number {
    if (numero < 0) {
      throw new Error(
        "No se puede calcular la raíz cuadrada de un número negativo"
      );
    }
    return Math.sqrt(numero);
  }

  /**
   * Calcula el resto de la división de dos números.
   *
   * @param a - El dividendo.
   * @param b - El divisor.
   * @returns El resto de la división de `a` por `b`.
   */
  modulo(a: number, b: number): number {
    return a % b;
  }

  /**
   * Redondea un número a un número especificado de decimales.
   *
   * @param numero - El número a redondear.
   * @param decimales - El número de decimales al cual redondear. Por defecto es 2.
   * @returns El número redondeado.
   */
  redondear(numero: number, decimales: number = 2): number {
    return Number(numero.toFixed(decimales));
  }
}
