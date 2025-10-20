/**
 * Módulo de Utilidades
 * Contiene funciones de utilidad para demostrar diferentes tipos de tests
 */

/**
 * Verifica si un número es par
 * @param {number} num - Número a verificar
 * @returns {boolean} true si es par, false si es impar
 */
function esPar(num) {
  return num % 2 === 0;
}

/**
 * Verifica si un número es primo
 * @param {number} num - Número a verificar
 * @returns {boolean} true si es primo, false si no lo es
 */
function esPrimo(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Invierte una cadena de texto
 * @param {string} str - Cadena a invertir
 * @returns {string} La cadena invertida
 */
function invertirCadena(str) {
  return str.split('').reverse().join('');
}

/**
 * Convierte una cadena a mayúsculas
 * @param {string} str - Cadena a convertir
 * @returns {string} La cadena en mayúsculas
 */
function aMayusculas(str) {
  return str.toUpperCase();
}

/**
 * Filtra números pares de un array
 * @param {number[]} array - Array de números
 * @returns {number[]} Array con solo números pares
 */
function filtrarPares(array) {
  return array.filter(num => num % 2 === 0);
}

/**
 * Obtiene el valor máximo de un array
 * @param {number[]} array - Array de números
 * @returns {number} El valor máximo
 * @throws {Error} Si el array está vacío
 */
function obtenerMaximo(array) {
  if (array.length === 0) {
    throw new Error('El array no puede estar vacío');
  }
  return Math.max(...array);
}

/**
 * Crea un objeto usuario
 * @param {string} nombre - Nombre del usuario
 * @param {number} edad - Edad del usuario
 * @returns {Object} Objeto con los datos del usuario
 */
function crearUsuario(nombre, edad) {
  return {
    nombre,
    edad,
    esAdulto: edad >= 18
  };
}

/**
 * Función asíncrona que simula una petición a una API
 * @param {number} id - ID del usuario
 * @returns {Promise<Object>} Promesa que resuelve con los datos del usuario
 */
async function obtenerUsuarioAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({
          id,
          nombre: `Usuario ${id}`,
          email: `usuario${id}@ejemplo.com`
        });
      } else {
        reject(new Error('ID inválido'));
      }
    }, 100);
  });
}

module.exports = {
  esPar,
  esPrimo,
  invertirCadena,
  aMayusculas,
  filtrarPares,
  obtenerMaximo,
  crearUsuario,
  obtenerUsuarioAsync
};
