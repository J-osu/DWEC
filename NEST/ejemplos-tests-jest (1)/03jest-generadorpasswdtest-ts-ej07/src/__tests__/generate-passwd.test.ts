// src/__tests__/app.test.ts

import { generatePassword } from "..";

describe("generatePassword", () => {
  it("debería generar una contraseña con la longitud especificada", () => {
    const minLength = 8;
    const maxLength = 16;
    const password = generatePassword(minLength, maxLength, true, true, true, true, "");
    expect(password.length).toBeGreaterThanOrEqual(minLength);
    expect(password.length).toBeLessThanOrEqual(maxLength);
  });

  it("debería lanzar un error si la longitud mínima es mayor que la longitud máxima", () => {
    expect(() => {
      generatePassword(10, 5, true, true, true, true, "");
    }).toThrow("La longitud mínima no puede ser mayor que la longitud máxima.");
  });

  it("debería lanzar un error si no se selecciona ninguna opción de caracteres", () => {
    expect(() => {
      generatePassword(8, 16, false, false, false, false, "");
    }).toThrow("Debe seleccionar al menos una opción de caracteres.");
  });

  it("debería incluir letras mayúsculas si se selecciona la opción", () => {
    const password = generatePassword(10, 10, true, false, false, false, "");
    expect(/[A-Z]/.test(password)).toBe(true);
  });

  it("debería incluir letras minúsculas si se selecciona la opción", () => {
    const password = generatePassword(10, 10, false, true, false, false, "");
    expect(/[a-z]/.test(password)).toBe(true);
  });

  it("debería incluir números si se selecciona la opción", () => {
    const password = generatePassword(10, 10, false, false, true, false, "");
    expect(/[0-9]/.test(password)).toBe(true);
  });

  it("debería incluir símbolos si se selecciona la opción", () => {
    const password = generatePassword(10, 10, false, false, false, true, "");
    expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(true);
  });

  it("debería utilizar los símbolos personalizados si se proporcionan", () => {
    const customSymbols = "@#*";
    const password = generatePassword(10, 10, false, false, false, false, customSymbols);
    expect(/[@#*]/.test(password)).toBe(true);
  });
});
