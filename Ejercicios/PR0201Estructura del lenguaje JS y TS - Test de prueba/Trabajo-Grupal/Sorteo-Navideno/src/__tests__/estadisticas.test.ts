import {
  getEstadisticas,
  reservarNumero,
  registrarParticipante,
  getSorteoInstance
} from '../core/sorteoService';

describe('Gestión de Estadísticas', () => {
  beforeEach(() => {
    localStorage.clear();
    getSorteoInstance().loadState({
      participants: [],
      tablero: {},
      participanteIdCounter: 0
    });
  });

  describe('Cálculo de estadísticas', () => {
    it('debería calcular correctamente el número de casillas ocupadas y libres', () => {
      const participanteId = '1';
      reservarNumero('42', participanteId);
      reservarNumero('43', participanteId);
      
      const stats = getEstadisticas();
      expect(stats.occupiedNumbers).toBe(2);
      expect(stats.availableNumbers).toBe(98); // 100 - 2 ocupados
    });

    it('debería contar correctamente el número de participantes únicos', () => {
      // Registrar participantes
      const participante1 = {
        id: '1',
        nombre: 'Juan',
        dni: '12345678A',
        email: 'juan@example.com'
      };
      const participante2 = {
        id: '2',
        nombre: 'Ana',
        dni: '87654321B',
        email: 'ana@example.com'
      };

      registrarParticipante(participante1);
      registrarParticipante(participante2);

      // Reservar números para ambos
      reservarNumero('42', participante1.id);
      reservarNumero('43', participante2.id);
      
      const stats = getEstadisticas();
      expect(stats.totalParticipants).toBe(2);
    });

    it('debería calcular correctamente el porcentaje de ocupación', () => {
      const participanteId = '1';
      // Reservar 10 números
      for (let i = 0; i < 10; i++) {
        reservarNumero(i.toString().padStart(2, '0'), participanteId);
      }
      
      const stats = getEstadisticas();
      expect(stats.percentageOccupied).toBe(10); // 10%
    });

    it('debería mostrar 0% de ocupación cuando el tablero está vacío', () => {
      const stats = getEstadisticas();
      expect(stats.percentageOccupied).toBe(0);
    });

    it('debería mostrar estadísticas correctas después de liberar números', () => {
      const participante = {
        nombre: 'Juan',
        email: 'juan@example.com'
      };
      const nuevoParticipante = registrarParticipante(participante);
      
      reservarNumero('42', nuevoParticipante.id);
      reservarNumero('43', nuevoParticipante.id);
      
      let stats = getEstadisticas();
      expect(stats.occupiedNumbers).toBe(2);
      
      getSorteoInstance().liberarNumero('42');
      
      stats = getEstadisticas();
      expect(stats.occupiedNumbers).toBe(1);
      expect(stats.availableNumbers).toBe(99);
    });
  });
});