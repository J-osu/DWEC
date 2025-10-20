/**
 * Tests para el módulo utilidades
 * Demuestra tests con diferentes tipos de datos y casos de uso
 */

const {
  esPar,
  esPrimo,
  invertirCadena,
  aMayusculas,
  filtrarPares,
  obtenerMaximo,
  crearUsuario,
  obtenerUsuarioAsync
} = require('../src/utilidades');

describe('Utilidades - Funciones numéricas', () => {
  
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

  describe('esPrimo()', () => {
    test('debe identificar números primos correctamente', () => {
      expect(esPrimo(2)).toBe(true);
      expect(esPrimo(3)).toBe(true);
      expect(esPrimo(5)).toBe(true);
      expect(esPrimo(7)).toBe(true);
      expect(esPrimo(11)).toBe(true);
    });

    test('debe identificar números no primos', () => {
      expect(esPrimo(1)).toBe(false);
      expect(esPrimo(4)).toBe(false);
      expect(esPrimo(6)).toBe(false);
      expect(esPrimo(9)).toBe(false);
    });

    test('debe manejar números negativos y cero', () => {
      expect(esPrimo(0)).toBe(false);
      expect(esPrimo(-5)).toBe(false);
    });
  });
});

describe('Utilidades - Funciones de cadenas', () => {
  
  describe('invertirCadena()', () => {
    test('debe invertir una cadena correctamente', () => {
      expect(invertirCadena('hola')).toBe('aloh');
      expect(invertirCadena('JavaScript')).toBe('tpircSavaJ');
    });

    test('debe manejar cadenas vacías', () => {
      expect(invertirCadena('')).toBe('');
    });

    test('debe manejar palíndromos', () => {
      expect(invertirCadena('oso')).toBe('oso');
    });
  });

  describe('aMayusculas()', () => {
    test('debe convertir a mayúsculas', () => {
      expect(aMayusculas('hola')).toBe('HOLA');
      expect(aMayusculas('JavaScript')).toBe('JAVASCRIPT');
    });

    test('debe mantener mayúsculas existentes', () => {
      expect(aMayusculas('HOLA')).toBe('HOLA');
    });
  });
});

describe('Utilidades - Funciones de arrays', () => {
  
  describe('filtrarPares()', () => {
    test('debe filtrar solo números pares', () => {
      expect(filtrarPares([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
    });

    test('debe retornar array vacío si no hay pares', () => {
      expect(filtrarPares([1, 3, 5, 7])).toEqual([]);
    });

    test('debe manejar arrays vacíos', () => {
      expect(filtrarPares([])).toEqual([]);
    });

    test('debe manejar números negativos', () => {
      expect(filtrarPares([-4, -3, -2, -1, 0, 1, 2])).toEqual([-4, -2, 0, 2]);
    });
  });

  describe('obtenerMaximo()', () => {
    test('debe obtener el valor máximo del array', () => {
      expect(obtenerMaximo([1, 5, 3, 9, 2])).toBe(9);
    });

    test('debe manejar números negativos', () => {
      expect(obtenerMaximo([-5, -1, -10, -3])).toBe(-1);
    });

    test('debe lanzar error con array vacío', () => {
      expect(() => obtenerMaximo([])).toThrow('El array no puede estar vacío');
    });

    test('debe funcionar con un solo elemento', () => {
      expect(obtenerMaximo([42])).toBe(42);
    });
  });
});

describe('Utilidades - Funciones de objetos', () => {
  
  describe('crearUsuario()', () => {
    test('debe crear un objeto usuario correctamente', () => {
      const usuario = crearUsuario('Juan', 25);
      
      expect(usuario).toHaveProperty('nombre');
      expect(usuario).toHaveProperty('edad');
      expect(usuario).toHaveProperty('esAdulto');
      expect(usuario.nombre).toBe('Juan');
      expect(usuario.edad).toBe(25);
      expect(usuario.esAdulto).toBe(true);
    });

    test('debe marcar como no adulto si es menor de 18', () => {
      const usuario = crearUsuario('Ana', 15);
      expect(usuario.esAdulto).toBe(false);
    });

    test('debe marcar como adulto exactamente a los 18', () => {
      const usuario = crearUsuario('Pedro', 18);
      expect(usuario.esAdulto).toBe(true);
    });

    test('el objeto debe tener la estructura esperada', () => {
      const usuario = crearUsuario('María', 30);
      expect(usuario).toMatchObject({
        nombre: 'María',
        edad: 30,
        esAdulto: true
      });
    });
  });
});

describe('Utilidades - Funciones asíncronas', () => {
  
  describe('obtenerUsuarioAsync()', () => {
    test('debe obtener usuario con ID válido', async () => {
      const usuario = await obtenerUsuarioAsync(1);
      
      expect(usuario).toHaveProperty('id');
      expect(usuario).toHaveProperty('nombre');
      expect(usuario).toHaveProperty('email');
      expect(usuario.id).toBe(1);
      expect(usuario.nombre).toBe('Usuario 1');
      expect(usuario.email).toBe('usuario1@ejemplo.com');
    });

    test('debe rechazar con ID inválido', async () => {
      await expect(obtenerUsuarioAsync(0)).rejects.toThrow('ID inválido');
      await expect(obtenerUsuarioAsync(-1)).rejects.toThrow('ID inválido');
    });

    test('debe retornar el formato correcto de usuario', async () => {
      const usuario = await obtenerUsuarioAsync(5);
      expect(usuario).toMatchObject({
        id: 5,
        nombre: expect.any(String),
        email: expect.stringContaining('@ejemplo.com')
      });
    });
  });
});
