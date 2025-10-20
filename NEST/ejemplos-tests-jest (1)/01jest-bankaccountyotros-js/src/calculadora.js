/**
 * Módulo de Calculadora
 * Contiene funciones matemáticas básicas para demostrar tests unitarios
 */

/**
 * Suma dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La suma de a y b
 */
function sumar(a, b) {
  return a + b;
}

/**
 * Resta dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La resta de a menos b
 */
function restar(a, b) {
  return a - b;
}

/**
 * Multiplica dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} El producto de a por b
 */
function multiplicar(a, b) {
  return a * b;
}

/**
 * Divide dos números
 * @param {number} a - Numerador
 * @param {number} b - Denominador
 * @returns {number} El cociente de a entre b
 * @throws {Error} Si el denominador es cero
 */
function dividir(a, b) {
  if (b === 0) {
    throw new Error('No se puede dividir por cero');
  }
  return a / b;
}

/**
 * Calcula la potencia de un número
 * @param {number} base - Base
 * @param {number} exponente - Exponente
 * @returns {number} El resultado de base elevado a exponente
 */
function potencia(base, exponente) {
  return Math.pow(base, exponente);
}

/**
 * Calcula el factorial de un número
 * @param {number} n - Número para calcular el factorial
 * @returns {number} El factorial de n
 * @throws {Error} Si n es negativo
 */
function factorial(n) {
  if (n < 0) {
    throw new Error('No se puede calcular el factorial de un número negativo');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

module.exports = {
  sumar,
  restar,
  multiplicar,
  dividir,
  potencia,
  factorial
};
