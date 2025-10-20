# Casos de prueba detallados

Este documento describe con más detalle los casos de prueba incluidos en la suite y cómo reproducirlos o añadir más.

Nota: la función genera resultados aleatorios; los tests comprueban propiedades (longitud, presencia de clases de caracteres, excepciones) y no valores fijos.

## Ejecutar la suite

```powershell
npm test
```

Para ejecutar un test concreto con jest puedes usar:

```powershell
npx jest src/__tests__/generate-passwd.test.ts -t "debería incluir números" --runInBand
```

## Casos (detallado)

1) Generación con longitud dentro del rango

- Parámetros: minLength = 8, maxLength = 16, useUppercase = true, useLowercase = true, useNumbers = true, useSymbols = true, customSymbols = ""
- Comprobaciones:
  - La longitud de la contraseña está entre 8 y 16 (inclusive).
  - Se generan caracteres de los conjuntos seleccionados (no se comprueba obligatoriedad de cada uno en este test, solo la longitud).

2) Error si min > max

- Parámetros: minLength = 10, maxLength = 5, todos los flags booleanos true
- Comprobaciones:
  - Lanza Error con mensaje exacto: "La longitud mínima no puede ser mayor que la longitud máxima."

3) Error si no se elige ningún tipo de carácter

- Parámetros: minLength = 8, maxLength = 16, useUppercase = false, useLowercase = false, useNumbers = false, useSymbols = false, customSymbols = ""
- Comprobaciones:
  - Lanza Error con mensaje exacto: "Debe seleccionar al menos una opción de caracteres."

4) Incluir mayúsculas

- Parámetros: minLength = 10, maxLength = 10, useUppercase = true, useLowercase = false, useNumbers = false, useSymbols = false
- Comprobaciones:
  - Resultado cumple la regex /[A-Z]/ (al menos una mayúscula)

5) Incluir minúsculas

- Parámetros: minLength = 10, maxLength = 10, useUppercase = false, useLowercase = true, useNumbers = false, useSymbols = false
- Comprobaciones:
  - Resultado cumple la regex /[a-z]/ (al menos una minúscula)

6) Incluir números

- Parámetros: minLength = 10, maxLength = 10, useUppercase = false, useLowercase = false, useNumbers = true, useSymbols = false
- Comprobaciones:
  - Resultado cumple la regex /[0-9]/ (al menos un dígito)

7) Incluir símbolos por defecto

- Parámetros: minLength = 10, maxLength = 10, useUppercase = false, useLowercase = false, useNumbers = false, useSymbols = true
- Comprobaciones:
  - Resultado contiene al menos un carácter del conjunto por defecto: `!@#$%^&*()_+[]{}|;:,.<>?`

8) Símbolos personalizados

- Parámetros: minLength = 10, maxLength = 10, todos los flags booleanos false, customSymbols = "@#*"
- Comprobaciones:
  - Resultado cumple la regex /[@#*]/ (al menos uno de los símbolos personalizados)

## Añadir nuevos tests

Para añadir más tests sigue la convención existente en `src/__tests__/generate-passwd.test.ts`:

- Usa `describe`/`it` de Jest.
- Comprueba propiedades con expresiones regulares y comparaciones de longitud.
- Para tests que dependan de aleatoriedad, comprueba propiedades estadísticas o usa `seed`/stubs si introduces una interfaz inyectable para el generador de números aleatorios.

## Notas para tests deterministas

Si quieres comprobar resultados deterministas (por ejemplo, para integración end-to-end), considera:

- Introducir una abstracción para el generador de índices (por defecto usa `Math.random()`), y en tests inyectar una implementación determinista.
- O añadir una función `generatePasswordFromRandom(randomFn)` que haga la selección a partir de una función `randomFn(): number` predecible.

## Tests

Se incluyen tests unitarios con Jest. Para ejecutar la suite:

```powershell
npm test
```

Actualmente hay pruebas que verifican longitud, errores por parámetros inválidos y presencia de tipos de caracteres solicitados.

### Casos de prueba

La siguiente tabla resume los tests incluidos en `src/__tests__/generate-passwd.test.ts`.

| # | Nombre del test | Parámetros (resumen) | Condición comprobada | Resultado esperado |
|---:|---|---|---|---|
| 1 | Generación con longitud dentro del rango | min=8, max=16, mayúsculas=true, minúsculas=true, números=true, símbolos=true | Longitud de la contraseña | Longitud entre 8 y 16 (inclusive) |
| 2 | Error si min > max | min=10, max=5, mayúsculas=true, ... | Validación de límites | Lanza Error: "La longitud mínima no puede ser mayor que la longitud máxima." |
| 3 | Error si no se elige ningún tipo de carácter | min=8, max=16, todas las opciones=false | Validación de opciones | Lanza Error: "Debe seleccionar al menos una opción de caracteres." |
| 4 | Incluir mayúsculas | min=10, max=10, mayúsculas=true | Presencia de mayúsculas | La contraseña contiene al menos una letra mayúscula (/[A-Z]/) |
| 5 | Incluir minúsculas | min=10, max=10, minúsculas=true | Presencia de minúsculas | La contraseña contiene al menos una letra minúscula (/[a-z]/) |
| 6 | Incluir números | min=10, max=10, números=true | Presencia de números | La contraseña contiene al menos un dígito (/[0-9]/) |
| 7 | Incluir símbolos por defecto | min=10, max=10, símbolos=true | Presencia de símbolos | La contraseña contiene al menos un símbolo del conjunto por defecto (ej. !@#$%...) |
| 8 | Símbolos personalizados | min=10, max=10, todas las opciones=false, customSymbols='@#*' | Uso de símbolos personalizados | La contraseña contiene al menos uno de los símbolos personalizados (/[@#*]/) |


## Documentación

## Propuesta: Casos de prueba exhaustivos (mejora de calidad)

La siguiente tabla propone tests adicionales y más exhaustivos para aumentar la confianza en la librería.

| # | Categoría | Nombre del test | Parámetros | Condición comprobada | Resultado esperado |
|---:|---|---|---|---|---|
| 9 | Validación | minLength == maxLength | min=12, max=12, useUppercase=true,... | Longitud fija | Devuelve contraseña de longitud 12 |
| 10 | Validación | minLength = 0 | min=0, max=0, opciones válidas | Longitud 0 permitida? | Depende de la política: se espera '' (cadena vacía) o lanzar error; clarificar comportamiento. |
| 11 | Valores no enteros | min/max no enteros | min=8.5, max=12.2 | Manejo de floats | Redondear/validar: se debería forzar enteros o lanzar error (recomendado lanzar error) |
| 12 | Valores negativos | min < 0 | min=-1, max=5 | Validación de entradas | Debe lanzar Error (entradas inválidas) |
| 13 | Unicode / símbolos largos | customSymbols con Unicode | customSymbols = 'Ω≈ç√∫˜µ≤≥' | Manejo de símbolos Unicode | La función debe aceptar y utilizar símbolos Unicode correctamente (no romper la selección indexada) |
| 14 | Exhaustividad de conjuntos | Todas las combinaciones de flags | Probar varias combinaciones booleanas | Ninguna combinación debe producir error inesperado y la salida debe respetar los flags | Cobertura amplia de combinaciones (automatizable) |
| 15 | Uniformidad / distribución | Estadística de selección | Generar 10000 contraseñas de longitud fija y contar frecuencias por carácter | Distribución relativamente uniforme | Ningún carácter debería aparecer con frecuencia anómala; detectar sesgos fuertes de `Math.random()` |
| 16 | Rendimiento | Long passwords | min=10000, max=10000 | Tiempo de ejecución y memoria | Debe ejecutarse en tiempo razonable (benchmark) y sin excesiva memoria; documentar límites prácticos |
| 17 | Seguridad | Entorno seguro con `crypto` | Usar implementación con `crypto.randomInt` | No predictibilidad | Tests que aseguren que la implementación usa el generador seguro (mock de `crypto.randomInt`) |
| 18 | Comportamiento determinista | Inyectar generador determinista | Implementar función `generatePasswordFromRandom(randomFn)` | Determinismo | Con `randomFn` fijo, la salida debe ser determinista y reproducible |
| 19 | Edge case: allChars length 1 | customSymbols='A' y flags false | allChars tiene longitud 1 | Selección de caracteres | Debe generar la cadena repetida 'A' sin errores |
| 20 | Mensajes de error exactos | Mensajes de error | Parámetros inválidos | Mensajes consistentes | Los mensajes de error deben ser exactamente los esperados (evitar cambios no intencionales) |

Notas y recomendaciones:

- Para casos de entrada inválida (floats, negativos, cero), decidir una política de validación y documentarla (recomiendo: validar y lanzar errores para entradas no enteras o negativas).
- Para pruebas estadísticas (distribución), automatizar y definir umbrales razonables (p. ej., chi-square o límites relativos) para detectar sesgos.
- Añadir tests para la versión segura (`generatePasswordSecure`) que mockeen `crypto.randomInt` para comprobar que se utiliza correctamente.
- Automatizar la generación de combinaciones en test 14 para cubrir exhaustivamente los posibles flags.


La documentación se genera con TypeDoc en la carpeta `./docs`. Para generarla (limpia la carpeta `docs` y la regenera):

```powershell
npm run docs
```

Para servir localmente la documentación (si tienes Python instalado):

```powershell
cd docs
python -m http.server 8000
# abrir http://localhost:8000
```

## Consideraciones de seguridad

Esta librería usa `Math.random()` para la selección aleatoria, por lo que NO es adecuada para generar contraseñas de alta seguridad o claves criptográficas en producción.

Recomendación: implementar una variante segura que use la API `crypto` de Node.js (por ejemplo `crypto.randomInt`) para seleccionar índices de forma no predecible.

## Mejoras sugeridas

- Añadir una función `generatePasswordSecure` que use `crypto.randomInt`.
- Cambiar la API para aceptar un objeto de opciones en vez de argumentos largos.
- Añadir CI (GitHub Actions) que ejecute tests y genere documentación.
- Publicar paquete y añadir `CHANGELOG.md` para releases.

## Estado actual

- Tests: 8 pasando.
- Documentación: generada en `./docs`.
- Dependencias: actualizadas a versiones recientes (devDependencies).

---

Si quieres, puedo implementar la variante segura y refactorizar la API para aceptar un objeto de opciones. ¿Qué prefieres que haga a continuación?
