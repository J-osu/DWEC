/**
 * Genera una contraseña aleatoria basada en los criterios especificados.
 *
 * @param minLength - La longitud mínima de la contraseña.
 * @param maxLength - La longitud máxima de la contraseña.
 * @param useUppercase - Si se deben incluir letras mayúsculas en la contraseña.
 * @param useLowercase - Si se deben incluir letras minúsculas en la contraseña.
 * @param useNumbers - Si se deben incluir números en la contraseña.
 * @param useSymbols - Si se deben incluir símbolos en la contraseña.
 * @param customSymbols - Una cadena de símbolos personalizados para usar en la contraseña. Si no se proporciona, se usará un conjunto de símbolos predeterminado.
 * @returns Una contraseña generada aleatoriamente que cumple con los criterios especificados.
 * @throws Lanzará un error si la longitud mínima es mayor que la longitud máxima.
 * @throws Lanzará un error si no se selecciona ningún tipo de carácter.
 */
export function generatePassword(
  minLength: number,
  maxLength: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  customSymbols?: string
): string {
  // Delegate to deterministic version using Math.random
  return generatePasswordFromRandom(minLength, maxLength, useUppercase, useLowercase, useNumbers, useSymbols, customSymbols, Math.random);
}

export function generatePasswordFromRandom(
  minLength: number,
  maxLength: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  customSymbols: string | undefined,
  randomFn: () => number
): string {
  // Validate integer lengths
  if (!Number.isInteger(minLength) || !Number.isInteger(maxLength)) {
    throw new Error("Las longitudes deben ser enteros.");
  }
  if (minLength < 0 || maxLength < 0) {
    throw new Error("Las longitudes deben ser enteros no negativos.");
  }
  if (minLength > maxLength) {
    throw new Error("La longitud mínima no puede ser mayor que la longitud máxima.");
  }

  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols && !customSymbols) {
    throw new Error("Debe seleccionar al menos una opción de caracteres.");
  }

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const defaultSymbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  const symbols = customSymbols || defaultSymbols;

  let allChars = "";
  if (useUppercase) allChars += uppercaseChars;
  if (useLowercase) allChars += lowercaseChars;
  if (useNumbers) allChars += numberChars;
  if (useSymbols || customSymbols) allChars += symbols;

  const range = maxLength - minLength + 1;
  const passwordLength = Math.floor(randomFn() * range) + minLength;
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(randomFn() * allChars.length);
    password += allChars[randomIndex];
  }
  return password;
}

import * as crypto from 'crypto';

/**
 * Variante criptográficamente segura que usa crypto.randomInt
 */
export function generatePasswordSecure(
  minLength: number,
  maxLength: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  customSymbols?: string
): string {
  // Delegate to crypto-based generator
  // Validate integer lengths
  if (!Number.isInteger(minLength) || !Number.isInteger(maxLength)) {
    throw new Error("Las longitudes deben ser enteros.");
  }
  if (minLength < 0 || maxLength < 0) {
    throw new Error("Las longitudes deben ser enteros no negativos.");
  }
  if (minLength > maxLength) {
    throw new Error("La longitud mínima no puede ser mayor que la longitud máxima.");
  }
  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols && !customSymbols) {
    throw new Error("Debe seleccionar al menos una opción de caracteres.");
  }

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const defaultSymbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  const symbols = customSymbols || defaultSymbols;

  let allChars = "";
  if (useUppercase) allChars += uppercaseChars;
  if (useLowercase) allChars += lowercaseChars;
  if (useNumbers) allChars += numberChars;
  if (useSymbols || customSymbols) allChars += symbols;

  // randomInt(min, max) returns integer in [min, max)
  const passwordLength = crypto.randomInt(minLength, maxLength + 1);
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = crypto.randomInt(0, allChars.length);
    password += allChars[randomIndex];
  }
  return password;
}

