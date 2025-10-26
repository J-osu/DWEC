import {
  registrarParticipante,
  getListaParticipantes,
  getSorteoInstance
} from '../core/sorteoService';

describe('Gestión de Participantes', () => {
  beforeEach(() => {
    // Limpiar el estado antes de cada test
    localStorage.clear();
    getSorteoInstance().loadState({
      participants: [],
      tablero: {},
      participanteIdCounter: 0
    });
  });

  describe('Registro de participantes', () => {
    it('debería crear un participante con datos válidos', () => {
      const participante = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com'
      };

      const nuevoParticipante = registrarParticipante(participante);
      expect(nuevoParticipante.nombre).toBe(participante.nombre);
      expect(nuevoParticipante.email).toBe(participante.email);
      expect(nuevoParticipante.id).toBeDefined();
    });

    it('debería fallar al crear un participante con email inválido', () => {
      const participante = {
        nombre: 'Juan Pérez',
        email: 'emailinvalido'
      };

      expect(() => registrarParticipante(participante))
        .toThrow('El formato del email es inválido');
    });

    it('debería fallar al crear un participante con campos vacíos', () => {
      const participante = {
        nombre: '',
        email: 'juan@example.com'
      };

      expect(() => registrarParticipante(participante))
        .toThrow('Datos incompletos para el registro');
    });

    it('debería fallar al registrar participantes con el mismo email', () => {
      const participante1 = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com'
      };

      const participante2 = {
        nombre: 'Juan Diferente',
        email: 'juan@example.com'
      };

      registrarParticipante(participante1);
      expect(() => registrarParticipante(participante2))
        .toThrow('ya está registrado');
    });
  });

  describe('Consulta de participantes', () => {
    it('debería devolver la lista de participantes correctamente', () => {
      const participante1 = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com'
      };

      const participante2 = {
        nombre: 'Ana García',
        email: 'ana@example.com'
      };

      registrarParticipante(participante1);
      registrarParticipante(participante2);

      const participantes = getListaParticipantes();
      expect(participantes).toHaveLength(2);
      expect(participantes[0].nombre).toBe(participante1.nombre);
      expect(participantes[1].nombre).toBe(participante2.nombre);
    });

    it('debería devolver lista vacía cuando no hay participantes', () => {
      const participantes = getListaParticipantes();
      expect(participantes).toHaveLength(0);
    });
  });
});