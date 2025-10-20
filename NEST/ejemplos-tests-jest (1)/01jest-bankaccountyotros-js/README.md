# Proyecto Jest - Pruebas Unitarias en JavaScript

Este proyecto es un ejercicio educativo para aprender a realizar pruebas unitarias con Jest en JavaScript.

## 📋 Contenido

- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecutar Tests](#ejecutar-tests)
- [Conceptos de Jest](#conceptos-de-jest)
- [Ejemplos de Tests](#ejemplos-de-tests)
- [Recursos Adicionales](#recursos-adicionales)

## 🚀 Instalación

1. Clona o descarga este proyecto
2. Instala las dependencias:

```bash
npm install
```

## 📁 Estructura del Proyecto

```
01jest/
├── src/
│   ├── BankAccount.js       # Clase cuenta bancaria (ejemplo TDD)
│   ├── calculadora.js       # Funciones matemáticas de ejemplo
│   └── utilidades.js        # Funciones de utilidad de ejemplo
├── tests/
│   ├── BankAccount.test.js  # Tests para BankAccount (28 tests)
│   ├── calculadora.test.js  # Tests para calculadora (21 tests)
│   └── utilidades.test.js   # Tests para utilidades (25 tests)
├── coverage/                # Reportes de cobertura de código
│   ├── lcov-report/        # Reporte HTML interactivo
│   ├── lcov.info           # Formato LCOV
│   └── coverage-final.json # Datos de cobertura en JSON
├── jest.config.js          # Configuración de Jest
├── package.json            # Dependencias y scripts
├── README.md               # Este archivo
├── COVERAGE_REPORT.md      # Reporte detallado de cobertura
└── .gitignore              # Archivos ignorados por Git
```

## 🧪 Ejecutar Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (se re-ejecutan al guardar cambios)
```bash
npm run test:watch
```

### Ejecutar tests con reporte de cobertura
```bash
npm run test:coverage
```

## 📚 Conceptos de Jest

### 1. Estructura Básica de un Test

```javascript
describe('Nombre del grupo de tests', () => {
  test('descripción de lo que hace el test', () => {
    // Arrange: preparar datos
    const a = 2;
    const b = 3;
    
    // Act: ejecutar la función
    const resultado = sumar(a, b);
    
    // Assert: verificar el resultado
    expect(resultado).toBe(5);
  });
});
```

### 2. Matchers Comunes (Aserciones)

- **`toBe()`**: Igualdad estricta (===)
- **`toEqual()`**: Igualdad de valores (para objetos y arrays)
- **`toBeCloseTo()`**: Para números decimales con aproximación
- **`toBeTruthy()` / `toBeFalsy()`**: Valores truthy/falsy
- **`toThrow()`**: Verificar que se lance un error
- **`toHaveProperty()`**: Verificar que un objeto tenga una propiedad
- **`toContain()`**: Verificar que un array contenga un elemento
- **`toMatch()`**: Verificar que una cadena coincida con una expresión regular

### 3. Organización de Tests

#### `describe()` - Agrupa tests relacionados
```javascript
describe('Operaciones matemáticas', () => {
  describe('sumar()', () => {
    test('debe sumar dos números', () => {
      expect(sumar(2, 3)).toBe(5);
    });
  });
});
```

#### `test()` o `it()` - Define un test individual
```javascript
test('debe sumar dos números', () => {
  expect(sumar(2, 3)).toBe(5);
});
```

### 4. Tests Asíncronos

#### Con async/await
```javascript
test('debe obtener usuario', async () => {
  const usuario = await obtenerUsuarioAsync(1);
  expect(usuario.id).toBe(1);
});
```

#### Verificar que una promesa se rechace
```javascript
test('debe rechazar con ID inválido', async () => {
  await expect(obtenerUsuarioAsync(-1)).rejects.toThrow('ID inválido');
});
```

### 5. Tests de Excepciones

```javascript
test('debe lanzar error al dividir por cero', () => {
  expect(() => dividir(10, 0)).toThrow('No se puede dividir por cero');
});
```

## 💡 Ejemplos de Tests

### Ejemplo 1: Test Simple
```javascript
test('debe sumar dos números', () => {
  expect(sumar(2, 3)).toBe(5);
});
```

### Ejemplo 2: Tests con Múltiples Casos
```javascript
describe('esPar()', () => {
  test('debe retornar true para números pares', () => {
    expect(esPar(4)).toBe(true);
    expect(esPar(0)).toBe(true);
    expect(esPar(-2)).toBe(true);
  });
  
  test('debe retornar false para números impares', () => {
    expect(esPar(3)).toBe(false);
    expect(esPar(-5)).toBe(false);
  });
});
```

### Ejemplo 3: Test de Arrays
```javascript
test('debe filtrar solo números pares', () => {
  const resultado = filtrarPares([1, 2, 3, 4, 5, 6]);
  expect(resultado).toEqual([2, 4, 6]);
});
```

### Ejemplo 4: Test de Objetos
```javascript
test('debe crear un objeto usuario correctamente', () => {
  const usuario = crearUsuario('Juan', 25);
  
  expect(usuario).toHaveProperty('nombre');
  expect(usuario).toHaveProperty('edad');
  expect(usuario.nombre).toBe('Juan');
  expect(usuario.edad).toBe(25);
});
```

### Ejemplo 5: Test Asíncrono
```javascript
test('debe obtener usuario con ID válido', async () => {
  const usuario = await obtenerUsuarioAsync(1);
  expect(usuario.id).toBe(1);
  expect(usuario.nombre).toBe('Usuario 1');
});
```

## 🎯 Buenas Prácticas

1. **Descriptivo**: Los nombres de los tests deben describir claramente qué están probando
2. **Independientes**: Cada test debe ser independiente de los demás
3. **Repetibles**: Los tests deben dar el mismo resultado cada vez
4. **Rápidos**: Los tests deben ejecutarse rápidamente
5. **AAA Pattern**: Arrange (preparar), Act (actuar), Assert (verificar)
6. **Un concepto por test**: Cada test debe verificar una sola cosa
7. **Coverage**: Buscar una cobertura alta pero con tests significativos

## 📊 Cobertura de Código

La cobertura de código te indica qué porcentaje de tu código está siendo testeado:

```bash
npm run test:coverage
```

Esto genera un reporte mostrando:
- **Statements**: Porcentaje de líneas ejecutadas
- **Branches**: Porcentaje de ramas condicionales probadas
- **Functions**: Porcentaje de funciones ejecutadas
- **Lines**: Porcentaje de líneas de código cubiertas

## 🔧 Configuración de Jest

El archivo `jest.config.js` contiene la configuración:

```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js'],
  verbose: true,
};
```

## 📖 Recursos Adicionales

- [Documentación oficial de Jest](https://jestjs.io/)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)
- [Testing JavaScript](https://testingjavascript.com/)

## 🎓 Ejercicios Propuestos

1. **Ejercicio Básico**: Añade tests para una función que calcule el área de un círculo
2. **Ejercicio Intermedio**: Crea una función que valide emails y escribe tests para diferentes casos
3. **Ejercicio Avanzado**: Implementa una función de ordenamiento y testea casos límite
4. **Ejercicio TDD**: Practica Test-Driven Development: escribe primero los tests, luego el código

## 📝 Notas del Profesor

Este proyecto incluye ejemplos de:
- ✅ Tests básicos con `toBe()` y `toEqual()`
- ✅ Tests de números decimales con `toBeCloseTo()`
- ✅ Tests de excepciones con `toThrow()`
- ✅ Tests de arrays y objetos
- ✅ Tests asíncronos con async/await
- ✅ Organización de tests con `describe()`
- ✅ Múltiples aserciones por test
- ✅ Casos límite y edge cases

## 🤝 Contribuir

Siéntete libre de agregar más ejemplos de funciones y tests para enriquecer este proyecto educativo.

## 📄 Licencia

Este proyecto es de código abierto con fines educativos.

---

# 📚 Documentación de Módulos y Casos de Prueba

---

# Módulo Calculadora

El módulo `calculadora.js` contiene funciones matemáticas básicas y avanzadas para practicar pruebas unitarias. Incluye validaciones y manejo de excepciones para casos inválidos.

## Funciones

| Función | Descripción |
|---------|-------------|
| `sumar(a, b)` | Suma dos números y retorna el resultado. |
| `restar(a, b)` | Resta dos números (a - b) y retorna el resultado. |
| `multiplicar(a, b)` | Multiplica dos números y retorna el resultado. |
| `dividir(a, b)` | Divide dos números. Lanza excepción si el denominador es cero. |
| `potencia(base, exponente)` | Calcula la potencia de un número (base^exponente). |
| `factorial(n)` | Calcula el factorial de un número. Lanza excepción si n es negativo. |

## Tabla de Casos de Prueba para Calculadora

| # | Función | Descripción del caso de prueba | Entrada | Salida esperada / Excepción |
|---|---------|-------------------------------|---------|----------------------------|
| 1 | sumar | Suma de números positivos | 2, 3 | 5 |
| 2 | sumar | Suma de números negativos | -5, -3 | -8 |
| 3 | sumar | Suma de positivo y negativo | 10, -3 | 7 |
| 4 | sumar | Suma con ceros | 0, 0 | 0 |
| 5 | sumar | Suma con decimales | 2.5, 3.7 | ~6.2 |
| 6 | restar | Resta de números positivos | 10, 3 | 7 |
| 7 | restar | Resta de números negativos | -5, -3 | -2 |
| 8 | restar | Resta con resultado negativo | 3, 10 | -7 |
| 9 | multiplicar | Multiplicación de positivos | 4, 5 | 20 |
| 10 | multiplicar | Multiplicación por cero | 5, 0 | 0 |
| 11 | multiplicar | Multiplicación de negativos | -3, -4 | 12 |
| 12 | multiplicar | Multiplicación positivo y negativo | 3, -4 | -12 |
| 13 | dividir | División válida | 10, 2 | 5 |
| 14 | dividir | División con decimales | 10, 3 | ~3.333 |
| 15 | dividir | División por cero | 10, 0 | Excepción: "No se puede dividir por cero" |
| 16 | dividir | División de números negativos | -10, 2 | -5 |
| 17 | potencia | Potencia básica | 2, 3 | 8 |
| 18 | potencia | Potencia con exponente cero | 5, 0 | 1 |
| 19 | potencia | Potencia con exponente negativo | 2, -2 | 0.25 |
| 20 | factorial | Factorial de número positivo | 5 | 120 |
| 21 | factorial | Factorial de cero | 0 | 1 |
| 22 | factorial | Factorial de uno | 1 | 1 |
| 23 | factorial | Factorial de número negativo | -5 | Excepción: "No se puede calcular el factorial de un número negativo" |

---

# Módulo Utilidades

El módulo `utilidades.js` contiene funciones de utilidad que trabajan con números, strings, arrays, objetos y operaciones asíncronas. Es ideal para demostrar diferentes tipos de tests en Jest.

## Funciones

| Función | Descripción |
|---------|-------------|
| `esPar(num)` | Verifica si un número es par. Retorna boolean. |
| `esPrimo(num)` | Verifica si un número es primo. Retorna boolean. |
| `invertirCadena(str)` | Invierte una cadena de texto. |
| `aMayusculas(str)` | Convierte una cadena a mayúsculas. |
| `filtrarPares(array)` | Filtra solo los números pares de un array. |
| `obtenerMaximo(array)` | Obtiene el valor máximo de un array. Lanza excepción si está vacío. |
| `crearUsuario(nombre, edad)` | Crea un objeto usuario con validación de mayoría de edad. |
| `obtenerUsuarioAsync(id)` | Función asíncrona que simula obtener un usuario. Rechaza si ID inválido. |

## Tabla de Casos de Prueba para Utilidades

| # | Función | Descripción del caso de prueba | Entrada | Salida esperada / Excepción |
|---|---------|-------------------------------|---------|----------------------------|
| 1 | esPar | Números pares positivos | 4, 0, -2 | true (todos) |
| 2 | esPar | Números impares | 3, -5 | false (todos) |
| 3 | esPrimo | Números primos válidos | 2, 3, 5, 7, 11 | true (todos) |
| 4 | esPrimo | Números no primos | 1, 4, 6, 9 | false (todos) |
| 5 | esPrimo | Números negativos y cero | 0, -5 | false (ambos) |
| 6 | invertirCadena | Invertir cadena normal | "hola" | "aloh" |
| 7 | invertirCadena | Invertir cadena compleja | "JavaScript" | "tpircSavaJ" |
| 8 | invertirCadena | Cadena vacía | "" | "" |
| 9 | invertirCadena | Palíndromo | "oso" | "oso" |
| 10 | aMayusculas | Convertir minúsculas | "hola" | "HOLA" |
| 11 | aMayusculas | Mantener mayúsculas | "HOLA" | "HOLA" |
| 12 | filtrarPares | Array con pares e impares | [1,2,3,4,5,6] | [2,4,6] |
| 13 | filtrarPares | Array sin pares | [1,3,5,7] | [] |
| 14 | filtrarPares | Array vacío | [] | [] |
| 15 | filtrarPares | Array con negativos | [-4,-3,-2,-1,0,1,2] | [-4,-2,0,2] |
| 16 | obtenerMaximo | Array normal | [1,5,3,9,2] | 9 |
| 17 | obtenerMaximo | Array con negativos | [-5,-1,-10,-3] | -1 |
| 18 | obtenerMaximo | Array vacío | [] | Excepción: "El array no puede estar vacío" |
| 19 | obtenerMaximo | Array con un elemento | [42] | 42 |
| 20 | crearUsuario | Usuario adulto | "Juan", 25 | {nombre:"Juan", edad:25, esAdulto:true} |
| 21 | crearUsuario | Usuario menor de edad | "Ana", 15 | {nombre:"Ana", edad:15, esAdulto:false} |
| 22 | crearUsuario | Usuario exactamente 18 años | "Pedro", 18 | {nombre:"Pedro", edad:18, esAdulto:true} |
| 23 | obtenerUsuarioAsync | ID válido | 1 | resolve: {id:1, nombre:"Usuario 1", email:"usuario1@ejemplo.com"} |
| 24 | obtenerUsuarioAsync | ID cero | 0 | reject: Error("ID inválido") |
| 25 | obtenerUsuarioAsync | ID negativo | -1 | reject: Error("ID inválido") |

---

# Clase BankAccount

La clase `BankAccount` representa una cuenta bancaria sencilla para practicar TDD y pruebas unitarias. Modela el saldo, operaciones de ingreso y retirada, transferencia entre cuentas y permite cerrar la cuenta. Incluye lógica para lanzar excepciones en casos inválidos como saldos insuficientes, importes no positivos o manipulaciones sobre cuentas cerradas.

## Atributos

- **owner**: Nombre del titular de la cuenta.
- **balance**: Saldo de la cuenta (número). Inicialmente 0.
- **isClosed**: Indica si la cuenta está cerrada (booleano). Inicialmente false.

## Métodos

| Método | Descripción |
|--------|-------------|
| `deposit(amount)` | Ingresa dinero. Lanza excepción si la cuenta está cerrada o la cantidad no es positiva. |
| `withdraw(amount)` | Retira dinero si hay saldo suficiente. Lanza excepción si la cuenta está cerrada, cantidad no positiva o fondos insuficientes. |
| `getBalance()` | Devuelve el saldo actual de la cuenta. |
| `hasFunds(amount)` | Devuelve true si hay saldo suficiente para la cantidad indicada, false si no. |
| `transferTo(amount, otherAccount)` | Transfiere el importe a otra cuenta BankAccount. Lanza excepción si saldo insuficiente, cantidad inválida, cuenta cerrada o cuenta destino no válida. |
| `closeAccount()` | Cierra la cuenta (saldo a 0 y marca como cerrada). Lanza excepción si ya está cerrada. |

## Tabla de Casos de Prueba para BankAccount

| # | Método | Descripción del caso de prueba | Entrada | Salida esperada / Excepción |
|---|--------|-------------------------------|---------|----------------------------|
| 1 | deposit | Ingreso válido | 100 | saldo == 100 |
| 2 | deposit | Ingreso de cantidad negativa | -50 | Excepción: "Deposit amount must be positive" |
| 3 | deposit | Intentar ingresar en cuenta cerrada | 50 (después de cerrar) | Excepción: "Account is closed" |
| 4 | withdraw | Retirada válida | ingresar 200 y retirar 50 | saldo == 150 |
| 5 | withdraw | Retirada mayor que el saldo | saldo 100, retirar 200 | Excepción: "Insufficient funds" |
| 6 | withdraw | Retirada de cantidad negativa | -20 | Excepción: "Withdraw amount must be positive" |
| 7 | withdraw | Intentar retirar de cuenta cerrada | 20 (después de cerrar) | Excepción: "Account is closed" |
| 8 | getBalance | Consultar saldo inicial | - | saldo == 0 |
| 9 | hasFunds | Verificar fondos suficientes | saldo 50, preguntar 20 | true |
| 10 | hasFunds | Verificar fondos insuficientes | saldo 10, preguntar 50 | false |
| 11 | transferTo | Transferencia válida entre cuentas | 50 desde cuenta1 a cuenta2 | saldo1 -= 50, saldo2 += 50 |
| 12 | transferTo | Transferencia con saldo insuficiente | intentar transferir 200 con 100 de saldo | Excepción: "Insufficient funds" |
| 13 | transferTo | Transferencia a objeto que no es BankAccount | transferir a objeto {} | Excepción: "The target must be a BankAccount" |
| 14 | closeAccount | Cerrar cuenta abierta | - | isClosed == true, saldo == 0 |
| 15 | closeAccount | Cerrar cuenta ya cerrada | tras cerrar, llamar de nuevo | Excepción: "Account already closed" |
