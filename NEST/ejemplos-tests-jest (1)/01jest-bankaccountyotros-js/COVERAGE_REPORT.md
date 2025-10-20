# Reporte de Cobertura de Código

## 📊 Resumen de Cobertura

**Fecha del reporte:** 2 de octubre de 2025

### Cobertura General

| Archivo | % Declaraciones | % Ramas | % Funciones | % Líneas | Líneas sin cubrir |
|---------|----------------|---------|-------------|----------|-------------------|
| **Todos los archivos** | **100%** | **100%** | **100%** | **100%** | - |
| BankAccount.js | 100% | 100% | 100% | 100% | - |
| calculadora.js | 100% | 100% | 100% | 100% | - |
| utilidades.js | 100% | 100% | 100% | 100% | - |

---

## ✅ Métricas de Cobertura

### 🎯 100% de Cobertura en Todas las Categorías

El proyecto alcanza una **cobertura completa del 100%** en todas las métricas:

- **Statements (Declaraciones)**: 100% - Todas las instrucciones del código han sido ejecutadas
- **Branches (Ramas)**: 100% - Todas las ramas condicionales (if/else) han sido probadas
- **Functions (Funciones)**: 100% - Todas las funciones han sido invocadas
- **Lines (Líneas)**: 100% - Todas las líneas de código han sido ejecutadas

---

## 📈 Desglose por Archivo

### 1. BankAccount.js - 100% de cobertura

**Tests totales:** 28 tests

**Métodos cubiertos:**
- ✅ `constructor()` - Inicialización de cuenta
- ✅ `deposit()` - Ingreso de fondos (casos válidos e inválidos)
- ✅ `withdraw()` - Retiro de fondos (casos válidos e inválidos)
- ✅ `getBalance()` - Consulta de saldo
- ✅ `hasFunds()` - Verificación de fondos
- ✅ `transferTo()` - Transferencias entre cuentas
- ✅ `closeAccount()` - Cierre de cuenta

**Ramas cubiertas:**
- ✅ Cuenta cerrada (todas las operaciones)
- ✅ Montos negativos o cero
- ✅ Fondos insuficientes
- ✅ Validación de instancia BankAccount
- ✅ Cuenta ya cerrada

### 2. calculadora.js - 100% de cobertura

**Tests totales:** 21 tests

**Funciones cubiertas:**
- ✅ `sumar()` - Suma con positivos, negativos, ceros y decimales
- ✅ `restar()` - Resta con diversos casos
- ✅ `multiplicar()` - Multiplicación incluyendo por cero
- ✅ `dividir()` - División con validación de división por cero
- ✅ `potencia()` - Potenciación con exponentes positivos, negativos y cero
- ✅ `factorial()` - Factorial con validación de números negativos

**Ramas cubiertas:**
- ✅ División por cero (excepción)
- ✅ Factorial de número negativo (excepción)
- ✅ Casos base del factorial (0 y 1)
- ✅ Recursión en factorial

### 3. utilidades.js - 100% de cobertura

**Tests totales:** 25 tests

**Funciones cubiertas:**
- ✅ `esPar()` - Verificación de números pares/impares
- ✅ `esPrimo()` - Detección de números primos
- ✅ `invertirCadena()` - Inversión de strings
- ✅ `aMayusculas()` - Conversión a mayúsculas
- ✅ `filtrarPares()` - Filtrado de arrays
- ✅ `obtenerMaximo()` - Búsqueda de máximo con validación
- ✅ `crearUsuario()` - Creación de objetos con lógica condicional
- ✅ `obtenerUsuarioAsync()` - Funciones asíncronas con promesas

**Ramas cubiertas:**
- ✅ Array vacío en `obtenerMaximo()` (excepción)
- ✅ Lógica de números primos (múltiples condiciones)
- ✅ Validación de adultos en `crearUsuario()`
- ✅ Validación de ID en función asíncrona
- ✅ Resolución y rechazo de promesas

---

## 🎓 Logros Destacados

### Cobertura de Excepciones
Todas las excepciones del código están probadas:
- ✅ "Account is closed"
- ✅ "Deposit amount must be positive"
- ✅ "Withdraw amount must be positive"
- ✅ "Insufficient funds"
- ✅ "The target must be a BankAccount"
- ✅ "Account already closed"
- ✅ "No se puede dividir por cero"
- ✅ "No se puede calcular el factorial de un número negativo"
- ✅ "El array no puede estar vacío"
- ✅ "ID inválido"

### Casos Límite Cubiertos
- ✅ Operaciones con cero
- ✅ Números negativos
- ✅ Números decimales
- ✅ Arrays vacíos
- ✅ Strings vacíos
- ✅ Valores exactos en comparaciones
- ✅ Cuentas cerradas
- ✅ Transferencias entre múltiples cuentas

### Tests de Integración
- ✅ Múltiples operaciones en secuencia
- ✅ Transferencias encadenadas entre cuentas
- ✅ Validación de estado después de cerrar cuenta

---

## 📋 Estadísticas de Tests

- **Total de Test Suites:** 3
- **Test Suites Exitosos:** 3 (100%)
- **Tests Totales:** 74
- **Tests Exitosos:** 74 (100%)
- **Tests Fallidos:** 0
- **Snapshots:** 0
- **Tiempo de Ejecución:** ~2 segundos

---

## 🎯 Umbral de Cobertura Configurado

El proyecto tiene configurado un umbral mínimo del 80% en `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
}
```

**✅ El proyecto supera ampliamente este umbral, alcanzando el 100% en todas las categorías.**

---

## 📂 Archivos de Reporte

El reporte detallado de cobertura se genera en la carpeta `/coverage/`:

- **coverage/lcov-report/index.html** - Reporte HTML visual interactivo
- **coverage/lcov.info** - Formato LCOV para integración con CI/CD
- **coverage/coverage-final.json** - Datos en formato JSON

Para ver el reporte HTML detallado:
```bash
open coverage/lcov-report/index.html
```

---

## 🏆 Conclusión

El proyecto **01jest** demuestra excelentes prácticas de testing con:

1. ✅ **Cobertura completa del 100%** en todos los archivos
2. ✅ **74 tests exhaustivos** que cubren casos normales, límite y de error
3. ✅ **Todas las ramas condicionales probadas**
4. ✅ **Todas las excepciones validadas**
5. ✅ **Tests bien organizados y documentados**
6. ✅ **Patrón AAA implementado consistentemente**
7. ✅ **Tests de integración para escenarios complejos**

Este nivel de cobertura garantiza que el código es robusto, confiable y está listo para producción. Es un excelente ejemplo para enseñar testing y TDD (Test-Driven Development).

---

## 🔄 Comandos para Regenerar Reporte

```bash
# Ejecutar tests con cobertura
npm run test:coverage

# Ver reporte HTML
open coverage/lcov-report/index.html

# Ejecutar tests en modo watch
npm run test:watch
```

---

**Nota:** Este reporte fue generado automáticamente usando Jest v29.7.0
