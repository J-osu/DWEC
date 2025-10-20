# Generador de Contraseñas (TypeScript)

Este proyecto es una pequeña librería en TypeScript para generar contraseñas aleatorias configurables. Permite definir rangos de longitud, incluir o excluir mayúsculas, minúsculas, números y símbolos, y usar símbolos personalizados.

Está pensada para uso en utilidades, formularios o scripts donde se necesite generar contraseñas con reglas definidas. Incluye tests unitarios y documentación automática con TypeDoc.

## Características

- Generación de contraseñas con longitud aleatoria entre un mínimo y un máximo.
- Opciones para incluir mayúsculas, minúsculas, números y símbolos.
- Permite símbolos personalizados.
- Código en TypeScript y tests con Jest.
- Documentación generada con TypeDoc en `./docs`.

## Instalación

Clona el repositorio e instala dependencias:

```powershell
cd <ruta-del-proyecto>
npm install
```

## Uso

La función principal exportada es `generatePassword` (exportada desde `src/index.ts`).

Firma (TypeScript):

```ts
generatePassword(minLength: number, maxLength: number, useUppercase: boolean, useLowercase: boolean, useNumbers: boolean, useSymbols: boolean, customSymbols?: string): string
```

Ejemplo básico:

```ts
import { generatePassword } from './src';

const pwd = generatePassword(8, 12, true, true, true, true);
console.log(pwd);
```

Ejemplo con símbolos personalizados:

```ts
const pwd = generatePassword(10, 10, false, false, false, false, '@#*');
```

## API y comportamiento

- La longitud resultante es aleatoria entre `minLength` y `maxLength` (ambos incluidos).
- Si `minLength > maxLength`, la función lanza: `Error("La longitud mínima no puede ser mayor que la longitud máxima.")`.
- Si no se elige ningún tipo de carácter (ni mayúsculas, ni minúsculas, ni números, ni símbolos y no hay `customSymbols`), la función lanza: `Error("Debe seleccionar al menos una opción de caracteres.")`.
- La selección de caracteres se realiza con `Math.random()` (no criptográficamente segura por defecto).

Conjuntos de caracteres usados internamente:

- Mayúsculas: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
- Minúsculas: `abcdefghijklmnopqrstuvwxyz`
- Números: `0123456789`
- Símbolos por defecto: `!@#$%^&*()_+[]{}|;:,.<>?`

