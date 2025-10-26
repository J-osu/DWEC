import { Sorteo, SorteoError } from '../core/logicaSorteo'; // Ajusta la ruta si es necesario

const VALID_PARTICIPANT_DATA = {
    nombre: 'Ana López',
    email: 'ana.lopez@ejemplo.com',
    telefono: '123456789'
};

const SECOND_PARTICIPANT_DATA = {
    nombre: 'Bruno Díaz',
    email: 'bruno.diaz@ejemplo.com',
    telefono: '987654321'
};


describe('Gestión de Participantes (RF1)', () => {
    let sorteo: Sorteo;

    beforeEach(() => {
        sorteo = new Sorteo();
    });

    test('debería registrar un participante con datos válidos y generar un ID', () => {
        const p = sorteo.registrarParticipante(VALID_PARTICIPANT_DATA);
        
        expect(p.nombre).toBe(VALID_PARTICIPANT_DATA.nombre);
        expect(p.email).toBe(VALID_PARTICIPANT_DATA.email);
        expect(p.id).toMatch(/^P-\d+$/); // Verifica el formato del ID generado
        expect(sorteo.getParticipante(p.id)).toEqual(p);
    });

    test('debería lanzar SorteoError al intentar crear un participante con email mal formado', () => {
        const invalidData = { ...VALID_PARTICIPANT_DATA, email: 'email.invalido' };
        
        expect(() => sorteo.registrarParticipante(invalidData)).toThrow(SorteoError);
        expect(() => sorteo.registrarParticipante(invalidData)).toThrow("El formato del email es inválido.");
    });

    test('debería lanzar SorteoError al intentar crear un participante con nombre vacío', () => {
        const emptyNameData = { ...VALID_PARTICIPANT_DATA, nombre: ' ' };
        
        // La validación de 'isValid' dentro de registrarParticipante debe capturar el campo vacío.
        expect(() => sorteo.registrarParticipante(emptyNameData)).toThrow(SorteoError);
        expect(() => sorteo.registrarParticipante(emptyNameData)).toThrow("Datos incompletos para el registro.");
    });
    
    test('debería lanzar SorteoError al intentar registrar participantes duplicados (mismo email)', () => {
        sorteo.registrarParticipante(VALID_PARTICIPANT_DATA);

        const duplicateData = { ...VALID_PARTICIPANT_DATA, nombre: 'Ana Duplicada' };

        expect(() => sorteo.registrarParticipante(duplicateData)).toThrow(SorteoError);
        expect(() => sorteo.registrarParticipante(duplicateData)).toThrow(`El participante con email ${VALID_PARTICIPANT_DATA.email} ya está registrado.`);
    });
    
    test('debería consultar y devolver la lista completa de participantes registrados', () => {
        const p1 = sorteo.registrarParticipante(VALID_PARTICIPANT_DATA);
        const p2 = sorteo.registrarParticipante(SECOND_PARTICIPANT_DATA);
        
        const lista = sorteo.getListaParticipantes();

        expect(lista).toHaveLength(2);
        expect(lista).toEqual(expect.arrayContaining([p1, p2]));
    });
});

// --- Tests para Gestión del Tablero (RF2) ---

describe('Gestión del Tablero (RF2)', () => {
    let sorteo: Sorteo;
    let p1Id: string;
    let p2Id: string;

    beforeEach(() => {
        sorteo = new Sorteo();
        p1Id = sorteo.registrarParticipante(VALID_PARTICIPANT_DATA).id;
        p2Id = sorteo.registrarParticipante(SECOND_PARTICIPANT_DATA).id;
    });

    test('debería inicializar el tablero correctamente con 100 números y todos libres', () => {
        const estado = sorteo.getEstadoTablero();
        
        expect(estado).toHaveLength(100);
        // Verifica que el número 00 existe y está libre
        expect(sorteo.getNumeroStatus('00').ocupado).toBe(false); 
        // Verifica que el número 99 existe y está libre
        expect(sorteo.getNumeroStatus('99').ocupado).toBe(false); 
        // Verifica que todos están libres
    });

    test('debería reservar un número libre exitosamente (usando string o number)', () => {
        sorteo.reservarNumero('10', p1Id);
        sorteo.reservarNumero('5', p2Id); // La función formatNumero debe manejar números

        expect(sorteo.getNumeroStatus('10').ocupado).toBe(true);
        expect(sorteo.getNumeroStatus('10').participanteId).toBe(p1Id);

        expect(sorteo.getNumeroStatus('05').ocupado).toBe(true);
        expect(sorteo.getNumeroStatus('05').participanteId).toBe(p2Id);
    });

    test('debería lanzar SorteoError al intentar reservar un número ya ocupado', () => {
        sorteo.reservarNumero('25', p1Id);

        expect(() => sorteo.reservarNumero('25', p2Id)).toThrow(SorteoError);
        expect(() => sorteo.reservarNumero('25', p2Id)).toThrow("El número 25 ya está ocupado.");
    });

    test('debería permitir que un participante reserve múltiples números', () => {
        sorteo.reservarNumero('01', p1Id);
        sorteo.reservarNumero('02', p1Id);
        sorteo.reservarNumero('03', p1Id);

        expect(sorteo.getNumerosReservadosPorParticipante(p1Id)).toEqual(['01', '02', '03']);
        expect(sorteo.getNumeroStatus('02').participanteId).toBe(p1Id);
    });

    test('debería liberar un número correctamente', () => {
        sorteo.reservarNumero('50', p1Id);
        expect(sorteo.getNumeroStatus('50').ocupado).toBe(true);

        sorteo.liberarNumero('50');
        expect(sorteo.getNumeroStatus('50').ocupado).toBe(false);
    });

    test('debería lanzar SorteoError al intentar liberar un número que ya está libre', () => {
        // '07' está libre por defecto
        expect(() => sorteo.liberarNumero('07')).toThrow(SorteoError);
        expect(() => sorteo.liberarNumero('07')).toThrow("El número 07 ya está libre.");
    });
    
    test('debería consultar qué números tiene asignados un participante específico', () => {
        sorteo.reservarNumero('11', p1Id);
        sorteo.reservarNumero('22', p2Id);
        sorteo.reservarNumero('33', p1Id);
        
        expect(sorteo.getNumerosReservadosPorParticipante(p1Id)).toEqual(['11', '33']);
        expect(sorteo.getNumerosReservadosPorParticipante(p2Id)).toEqual(['22']);
    });
});

// --- Tests para Sorteo y Estadísticas (RF3 & RF4) ---

describe('Sorteo y Estadísticas (RF3 & RF4)', () => {
    let sorteo: Sorteo;
    let p1: any;
    let p2: any;

    beforeEach(() => {
        sorteo = new Sorteo();
        p1 = sorteo.registrarParticipante(VALID_PARTICIPANT_DATA);
        p2 = sorteo.registrarParticipante(SECOND_PARTICIPANT_DATA);
        
        sorteo.reservarNumero('15', p1.id);
        sorteo.reservarNumero('77', p2.id);
        sorteo.reservarNumero('00', p1.id);
    });

    test('debería calcular correctamente el número de casillas ocupadas/libres', () => {
        const stats = sorteo.getEstadisticas();
        
        expect(stats.totalNumbers).toBe(100);
        expect(stats.occupiedNumbers).toBe(3);
        expect(stats.availableNumbers).toBe(97);
    });

    test('debería contar correctamente el número de participantes únicos', () => {
        const stats = sorteo.getEstadisticas();
        expect(stats.totalParticipants).toBe(2);
    });

    test('debería calcular el porcentaje de ocupación correctamente', () => {
        // Ocupación: 3/100 = 0.03 = 3.00%
        const stats = sorteo.getEstadisticas();
        expect(stats.percentageOccupied).toBe(3.00);
    });
    
    test('debería realizar un sorteo con número ganador ocupado', () => {
        const result = sorteo.realizarSorteo('15');
        
        expect(result.numeroGanador).toBe('15');
        expect(result.ganador).toEqual(p1);
        expect(result.mensaje).toContain(`El ganador es ${p1.nombre}`);
    });

    test('debería realizar un sorteo con número ganador libre (desierto)', () => {
        const result = sorteo.realizarSorteo('40'); // '40' está libre
        
        expect(result.numeroGanador).toBe('40');
        expect(result.ganador).toBeNull();
        expect(result.mensaje).toContain("¡Sorteo desierto!");
    });

    test('debería lanzar SorteoError si el número de sorteo es inválido (<0 o >99)', () => {
        // Prueba con un número negativo
        expect(() => sorteo.realizarSorteo('-1')).toThrow(SorteoError);
        // Prueba con un número demasiado grande
        expect(() => sorteo.realizarSorteo('100')).toThrow(SorteoError);
        // Prueba con texto inválido
        expect(() => sorteo.realizarSorteo('A')).toThrow(SorteoError);
    });
    
    test('debería verificar que se devuelve correctamente la información del ganador', () => {
        const result = sorteo.realizarSorteo('77'); 
        
        expect(result.ganador).not.toBeNull();
        expect(result.ganador!.nombre).toBe(p2.nombre);
        expect(result.ganador!.email).toBe(p2.email);
    });
});