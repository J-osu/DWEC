import {
  reservarNumero,
  liberarNumero,
  getEstadoTablero,
  getNumerosReservadosPorParticipante,
  getSorteoInstance,
  registrarParticipante
} from '../core/sorteoService';
import type { NumeroStatus } from '../core/types';

describe('Gestión del Tablero', () => {
  beforeEach(() => {
    // Limpiar el estado antes de cada test
    localStorage.clear();
    getSorteoInstance().loadState({
      participants: [],
      tablero: {},
      participanteIdCounter: 0
    });
  });

  describe('Inicialización del tablero', () => {
    it('debería inicializar el tablero con 100 números libres', () => {
      const tablero = getEstadoTablero();
      expect(tablero).toHaveLength(100);
      tablero.forEach((numero: NumeroStatus) => {
        expect(numero.ocupado).toBe(false);
      });
    });

    it('debería tener números del 00 al 99', () => {
      const tablero = getEstadoTablero();
      expect(tablero[0].numero).toBe('00');
      expect(tablero[99].numero).toBe('99');
    });
  });

  describe('Reserva de números', () => {
    it('debería reservar un número libre exitosamente', () => {
      const participante = {
        nombre: 'Juan',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      reservarNumero('42', nuevoParticipante.id);
      
      const tablero = getEstadoTablero();
      const numeroReservado = tablero.find((n: NumeroStatus) => n.numero === '42');
      
      expect(numeroReservado?.ocupado).toBe(true);
      expect(numeroReservado?.participanteId).toBe(nuevoParticipante.id);
    });

    it('debería fallar al intentar reservar un número ya ocupado', () => {
      const participante = {
        nombre: 'Juan',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      reservarNumero('42', nuevoParticipante.id);
      
      expect(() => reservarNumero('42', 'otro-id')).toThrow('ocupado');
    });

    it('debería permitir que un participante reserve múltiples números', () => {
      const participante = {
        nombre: 'Juan',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      reservarNumero('42', nuevoParticipante.id);
      reservarNumero('43', nuevoParticipante.id);
      
      const numerosReservados = getNumerosReservadosPorParticipante(nuevoParticipante.id);
      expect(numerosReservados).toHaveLength(2);
      expect(numerosReservados).toContain('42');
      expect(numerosReservados).toContain('43');
    });
  });

  describe('Liberación de números', () => {
    it('debería liberar un número correctamente', () => {
      const participante = {
        nombre: 'Juan',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      reservarNumero('42', nuevoParticipante.id);
      liberarNumero('42');
      
      const tablero = getEstadoTablero();
      const numeroLiberado = tablero.find((n: NumeroStatus) => n.numero === '42');
      
      expect(numeroLiberado?.ocupado).toBe(false);
      expect(numeroLiberado?.participanteId).toBeNull();
    });

    it('debería fallar al intentar liberar un número que no está ocupado', () => {
      expect(() => liberarNumero('42')).toThrow('libre');
    });
  });

  describe('Consulta de estado', () => {
    it('debería verificar correctamente el estado de los números', () => {
      const participante = {
        nombre: 'Juan',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      reservarNumero('42', nuevoParticipante.id);
      
      const tablero = getEstadoTablero();
      const numero42 = tablero.find((n: NumeroStatus) => n.numero === '42');
      const numero43 = tablero.find((n: NumeroStatus) => n.numero === '43');
      
      expect(numero42?.ocupado).toBe(true);
      expect(numero43?.ocupado).toBe(false);
    });

    it('debería consultar correctamente los números de un participante', () => {
      const participanteId = '1';
      reservarNumero('42', participanteId);
      reservarNumero('43', participanteId);
      
      const numerosReservados = getNumerosReservadosPorParticipante(participanteId);
      expect(numerosReservados).toContain('42');
      expect(numerosReservados).toContain('43');
      expect(numerosReservados).not.toContain('44');
    });
  });
});