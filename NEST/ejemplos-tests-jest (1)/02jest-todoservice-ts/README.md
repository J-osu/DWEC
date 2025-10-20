# TodoService App

Esta aplicación es un ejemplo de proyecto TypeScript con Jest para pruebas unitarias. El objetivo principal es gestionar tareas (todos) y demostrar cómo estructurar y testear servicios en TypeScript.

## Especificaciones

- **Lenguaje:** TypeScript
- **Framework de pruebas:** Jest (con ts-jest)
- **Carpeta principal de código:** `src/`
- **Carpeta de tests:** `src/tests/`
- **Servicio principal:** `TodoService.ts` para la gestión de tareas
- **Ejemplo de test:** `todoService.test.ts` para validar el funcionamiento del servicio
- **Configuración de TypeScript:** `tsconfig.json`
- **Configuración de Jest:** `jest.config.js`

## Funcionalidades principales

- Crear, listar, actualizar y eliminar tareas
- Pruebas unitarias para asegurar el correcto funcionamiento del servicio

## Cómo ejecutar

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta los tests:
   ```bash
   npm test
   ```

## Configuración (rápida)

Sigue estos pasos para configurar el entorno local y ejecutar las pruebas. Los comandos están escritos para PowerShell en Windows, pero funcionan igual en otras shells cambiando el prompt si lo deseas.

1. Requisitos previos

   - Node.js (recomendado >= 16, ideal 18+). Verifica la versión con:

```powershell
node -v
npm -v
```

2. Clona el repositorio y entra en la carpeta del proyecto (si corresponde):

```powershell
git clone <repo-url>
cd 02jest-todoservice-ts
```

3. Instala dependencias del proyecto:

```powershell
npm install
```

4. Dependencia opcional para el entorno de pruebas

   A partir de Jest 28 el entorno `jsdom` no se instala por defecto. Si al ejecutar `npm test` ves un error sobre `jest-environment-jsdom`, instala la dependencia de desarrollo:

```powershell
npm install -D jest-environment-jsdom
```

5. Comandos útiles

```powershell
npm test            # Ejecuta la suite de tests
npm run test:watch  # Ejecuta Jest en modo watch
npm run test:coverage # Ejecuta tests y genera informe de cobertura
```

6. Alternativa: usar el entorno `node` en lugar de `jsdom`

   Si las pruebas no necesitan APIs de navegador (como localStorage) puedes cambiar `testEnvironment` en `jest.config.js` a `node` para evitar instalar `jest-environment-jsdom`:

```js
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // ...otras opciones
}
```

Notas
- `ts-jest` transforma TypeScript para que Jest pueda ejecutar los tests sin compilar manualmente.
- Si trabajas en CI asegúrate de usar la misma versión de Node que en desarrollo para evitar diferencias en behavior.

## Estructura de carpetas

```
├── src/
│   ├── TodoService.ts
│   └── tests/
│       └── todoService.test.ts
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

Este proyecto es ideal para aprender sobre testing en TypeScript y buenas prácticas de organización de código.

| ID    | Caso de prueba                 | Acción (Act)                                                              | Resultado esperado (Assert)                                                             |
| ----- | ------------------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| TC-01 | Crear tarea                    | Llamar a `add("Aprender Jest")`                                           | Devuelve un Todo con `text="Aprender Jest"`, `done=false`, y se guarda en localStorage. |
| TC-02 | Alternar tarea                 | Crear una tarea y llamar a `toggle(id)`                                   | La propiedad `done` cambia de `false → true` y se persiste en localStorage.             |
| TC-03 | Eliminar tarea existente       | Crear una tarea y llamar a `remove(id)`                                   | Devuelve `true` y la lista queda vacía.                                                 |
| TC-04 | Eliminar tarea inexistente     | Llamar a `remove(9999)` sin que exista                                    | Devuelve `false` y la lista no cambia.                                                  |
| TC-05 | Limpiar completadas            | Crear 2 tareas, marcar una como done, llamar `clearCompleted()`           | Devuelve `1` (eliminadas), la lista contiene solo la tarea pendiente.                   |
| TC-06 | Cargar desde localStorage      | Guardar manualmente un array en localStorage y crear un nuevo TodoService | `getAll()` devuelve exactamente ese array.                                              |
| TC-07 | Persistencia en localStorage   | Crear tarea y verificar `localStorage.getItem("todos")`                   | Contenido JSON válido con la tarea recién creada.                                       |
| TC-08 | Llamada a localStorage.setItem | Espiar `Storage.prototype.setItem` y llamar a `add()`                     | El spy debe haberse ejecutado al menos una vez.                                         |
