import {
  realizarSorteo,
  reservarNumero,
  registrarParticipante,
  getSorteoInstance
} from '../core/sorteoService';

describe('Gestión del Sorteo', () => {
  beforeEach(() => {
    localStorage.clear();
    getSorteoInstance().loadState({
      participants: [],
      tablero: {},
      participanteIdCounter: 0
    });
  });

  describe('Realización del sorteo', () => {
    it('debería realizar un sorteo exitoso con número ocupado', () => {
      const participante = {
        nombre: 'Juan',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      const numeroGanador = '42';
      
      reservarNumero(numeroGanador, nuevoParticipante.id);
      const resultado = realizarSorteo(numeroGanador);
      
      expect(resultado.numeroGanador).toBe(numeroGanador);
      expect(resultado.ganador).toBeDefined();
      expect(resultado.ganador?.id).toBe(nuevoParticipante.id);
    });

    it('debería resultar en sorteo desierto con número libre', () => {
      const numeroGanador = '42';
      const resultado = realizarSorteo(numeroGanador);
      
      expect(resultado.numeroGanador).toBe(numeroGanador);
      expect(resultado.ganador).toBeNull();
      expect(resultado.mensaje).toContain('desierto');
    });

    it('debería fallar con número fuera de rango (mayor que 99)', () => {
      expect(() => realizarSorteo('100')).toThrow('no es un valor válido');
    });

    it('debería fallar con número fuera de rango (menor que 00)', () => {
      expect(() => realizarSorteo('-1')).toThrow('no es un valor válido');
    });

    it('debería devolver correctamente la información del ganador', () => {
      const participante = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      const numeroGanador = '42';
      
      reservarNumero(numeroGanador, nuevoParticipante.id);
      const resultado = realizarSorteo(numeroGanador);
      
      expect(resultado).toEqual({
        numeroGanador,
        ganador: expect.objectContaining({
          id: nuevoParticipante.id,
          nombre: participante.nombre,
          email: participante.email
        }),
        mensaje: expect.stringContaining('Felicidades')
      });
    });
  });
});