# Calculadora Test

Este proyecto es una calculadora matemática desarrollada en TypeScript, diseñada para servir como ejemplo y práctica de pruebas unitarias, cobertura de código y pruebas de mutación.

## Propósito
- Demostrar cómo implementar y probar una clase de calculadora con operaciones matemáticas básicas.
- Servir de base para aprender y practicar herramientas como Jest (pruebas unitarias), Stryker (mutación) y TypeDoc (documentación).

## Funcionalidades
La clase `Calculadora` incluye los siguientes métodos:
- **sumar(a, b)**: Suma dos números.
- **restar(a, b)**: Resta dos números.
- **multiplicar(a, b)**: Multiplica dos números.
- **dividir(a, b)**: Divide dos números (lanza error si el divisor es cero).
- **potencia(base, exponente)**: Calcula la potencia de un número.
- **raizCuadrada(numero)**: Calcula la raíz cuadrada (lanza error si el número es negativo).
- **modulo(a, b)**: Calcula el resto de la división.
- **redondear(numero, decimales=2)**: Redondea un número a los decimales indicados.

## Estructura del proyecto
- `src/`: Código fuente principal y pruebas.
- `docs/`: Documentación generada con TypeDoc.
- `coverage/`: Reportes de cobertura de pruebas.
- `reports/mutation/`: Reportes de pruebas de mutación con Stryker.

## Pruebas y calidad
- **Pruebas unitarias**: Ejecuta `npm test` para correr las pruebas con Jest.
- **Cobertura**: Ejecuta `npm run test:coverage` para ver el reporte de cobertura.
- **Mutación**: Ejecuta `npm run test:mutation` para analizar la calidad de las pruebas con Stryker.

## Documentación
Genera la documentación con:
```sh
npm run docs
```
La documentación estará disponible en la carpeta `docs/`.

## Requisitos
- Node.js
- npm

## Instalación
```sh
npm install
```

## Ejemplo de uso
```typescript
import { Calculadora } from './src/calculadora';
const calc = new Calculadora();
console.log(calc.sumar(2, 3)); // 5
console.log(calc.dividir(10, 2)); // 5
```

## Casos de prueba

| Método                | Caso de prueba                                 | Entrada                | Salida esperada                  |
|----------------------|------------------------------------------------|------------------------|-----------------------------------|
| sumar                | Suma dos números                               | 2, 3                   | 5                                 |
| restar               | Resta dos números                              | 5, 3                   | 2                                 |
| multiplicar          | Multiplica dos números                         | 4, 5                   | 20                                |
| dividir              | Divide dos números                             | 4, 2                   | 2                                 |
| dividir              | Divide por cero (error)                        | 5, 0                   | Error: No se puede dividir por cero|
| dividir              | Divide por cero (error)                        | 4, 0                   | Error: No se puede dividir por cero|
| raizCuadrada         | Raíz cuadrada de un número                     | 16                     | 4                                 |
| redondear            | Redondea a dos decimales                       | 3.14159                | 3.14                              |

Estos casos de prueba están implementados en el archivo `src/__tests__/calculadora.test.ts` y cubren las principales funcionalidades de la clase `Calculadora`.

## Casos de prueba exhaustivos sugeridos

| Método                | Caso de prueba                                         | Entrada                        | Salida esperada                        |
|----------------------|--------------------------------------------------------|--------------------------------|-----------------------------------------|
| sumar                | Suma números negativos                                 | -2, -3                         | -5                                      |
| sumar                | Suma con cero                                          | 0, 5                            | 5                                       |
| restar               | Resta con resultado negativo                           | 3, 5                            | -2                                      |
| multiplicar          | Multiplica por cero                                    | 0, 10                           | 0                                       |
| multiplicar          | Multiplica números negativos                           | -2, 3                           | -6                                      |
| dividir              | Divide número negativo                                 | -10, 2                          | -5                                      |
| dividir              | Divide dos negativos                                   | -10, -2                         | 5                                       |
| dividir              | Divide por uno                                         | 10, 1                           | 10                                      |
| dividir              | Divide por número decimal                              | 5, 2.5                          | 2                                       |
| potencia             | Potencia con exponente cero                            | 5, 0                            | 1                                       |
| potencia             | Potencia con exponente negativo                        | 2, -2                           | 0.25                                    |
| raizCuadrada         | Raíz cuadrada de cero                                  | 0                               | 0                                       |
| raizCuadrada         | Raíz cuadrada de número negativo (error)               | -4                              | Error: No se puede calcular la raíz cuadrada de un número negativo |
| modulo               | Módulo con divisor mayor que dividendo                 | 3, 5                            | 3                                       |
| modulo               | Módulo con números negativos                           | -10, 3                          | -1                                      |
| redondear            | Redondear sin decimales                                | 3.14159, 0                      | 3                                       |
| redondear            | Redondear a más decimales                              | 3.14159, 4                      | 3.1416                                  |
| redondear            | Redondear número negativo                              | -2.71828, 2                     | -2.72                                   |

Estos casos de prueba adicionales ayudarían a cubrir situaciones límite, valores negativos, decimales y errores, mejorando la calidad y robustez de los tests del proyecto.
