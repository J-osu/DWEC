import type { ParticipanteData, SorteoStateData, NumeroStatus, SorteoResult, SorteoStats } from "../core/types";

/** Clase de error personalizada para operaciones inválidas. */
class SorteoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SorteoError";
    }
}

/** Clase Participante */
class Participante implements ParticipanteData {
    public id: string;
    public nombre: string;
    public email: string;

    constructor(data: ParticipanteData) {
        this.id = data.id;
        this.nombre = data.nombre.trim();
        this.email = data.email.trim();
    }

    public isValid(): boolean {
        return !!this.nombre && !!this.email && Participante.isValidEmail(this.email);
    }

    public static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/** Clase Sorteo: Maneja la lógica y el estado (ahora serializable a un objeto JS simple) */
export class Sorteo {
    private participantes: Map<string, Participante> = new Map();
    private tablero: Map<string, string | null> = new Map();
    private participanteIdCounter: number = 0;
    
    constructor(initialData?: SorteoStateData) {
        if (initialData) {
            this.loadState(initialData);
        } else {
            this.inicializarTablero();
        }
    }

    private inicializarTablero(): void {
        for (let i = 0; i < 100; i++) {
            const numero = i.toString().padStart(2, '0');
            this.tablero.set(numero, null); 
        }
    }
    
    // Serialización para guardar en el estado de React
    public toStateData(): SorteoStateData {
        const tableroObject: Record<string, string | null> = {};
        this.tablero.forEach((value, key) => { tableroObject[key] = value; });

        return {
            participants: Array.from(this.participantes.values()).map(p => ({
                id: p.id, nombre: p.nombre, email: p.email
            })),
            tablero: tableroObject,
            participanteIdCounter: this.participanteIdCounter,
        };
    }

    // Deserialización desde el estado de React
    public loadState(data: SorteoStateData): void {
        this.participantes.clear();
        this.tablero.clear();

        data.participants.forEach((pData: ParticipanteData) => {
            this.participantes.set(pData.id, new Participante(pData));
        });

        Object.entries(data.tablero).forEach(([numero, participanteId]) => {
            // participanteId viene de JSON/estado: puede ser string o null
            this.tablero.set(numero, participanteId as string | null);
        });

        this.participanteIdCounter = data.participanteIdCounter || 0;
        
        if (this.tablero.size !== 100) { this.inicializarTablero(); }
    }

    // Métodos de Lógica Core (Simplificados al usar 'this' y devolver void)
    public registrarParticipante(data: Omit<ParticipanteData, 'id'>): Participante {
        // [Lógica de registro...]
        const { email } = data;
        if (!Participante.isValidEmail(email)) { throw new SorteoError("El formato del email es inválido."); }
        for (const p of this.participantes.values()) {
            if (p.email.toLowerCase() === email.toLowerCase()) {
                throw new SorteoError(`El participante con email ${email} ya está registrado.`);
            }
        }
        this.participanteIdCounter++;
        const newId = `P-${this.participanteIdCounter}`;
        const newParticipante = new Participante({ id: newId, ...data });
        if (!newParticipante.isValid()) { throw new SorteoError("Datos incompletos para el registro."); }

        this.participantes.set(newId, newParticipante);
        return newParticipante;
    }

    public getParticipante(id: string): Participante | undefined { return this.participantes.get(id); }
    public getListaParticipantes(): Participante[] { return Array.from(this.participantes.values()); }

    /** Elimina un participante por id y libera sus números reservados */
    public eliminarParticipante(participanteId: string): void {
        if (!this.participantes.has(participanteId)) {
            throw new SorteoError(`Participante con id ${participanteId} no encontrado.`);
        }

        // Liberar todos los números asignados a ese participante
        for (const [numero, id] of this.tablero.entries()) {
            if (id === participanteId) {
                this.tablero.set(numero, null);
            }
        }

        this.participantes.delete(participanteId);
    }

    public reservarNumero(numero: string, participanteId: string): void {
        const numFormatted = Sorteo.formatNumero(numero);
        if (this.tablero.get(numFormatted) !== null) { throw new SorteoError(`El número ${numFormatted} ya está ocupado.`); }
        this.tablero.set(numFormatted, participanteId);
    }

    public liberarNumero(numero: string): void {
        const numFormatted = Sorteo.formatNumero(numero);
        if (this.tablero.get(numFormatted) === null) { throw new SorteoError(`El número ${numFormatted} ya está libre.`); }
        this.tablero.set(numFormatted, null);
    }
    
    public getNumeroStatus(numero: string): NumeroStatus {
        const numFormatted = Sorteo.formatNumero(numero);
        const participanteId = this.tablero.get(numFormatted);
        if (participanteId === undefined) { throw new SorteoError(`Número inválido: ${numero}.`); }

        const participante = participanteId ? this.participantes.get(participanteId) : null;
        
        return {
            numero: numFormatted,
            ocupado: participanteId !== null,
            participanteId: participanteId,
            nombreParticipante: participante ? participante.nombre : null,
        };
    }
    
    public getNumerosReservadosPorParticipante(participanteId: string): string[] {
        const numeros: string[] = [];
        for (const [numero, id] of this.tablero.entries()) {
            if (id === participanteId) { numeros.push(numero); }
        }
        return numeros;
    }

    public getEstadoTablero(): NumeroStatus[] {
        return Array.from(this.tablero.keys()).map(numero => this.getNumeroStatus(numero));
    }

    public realizarSorteo(numeroGanador: string): SorteoResult {
        const numFormatted = Sorteo.formatNumero(numeroGanador);
        const participanteId = this.tablero.get(numFormatted);
        
        if (participanteId && this.participantes.has(participanteId)) {
            const ganador = this.participantes.get(participanteId)!;
            return {
                numeroGanador: numFormatted,
                ganador: ganador,
                mensaje: `¡Felicidades! El ganador es ${ganador.nombre} con el número ${numFormatted}.`,
            };
        } else {
            return {
                numeroGanador: numFormatted,
                ganador: null,
                mensaje: `El número ${numFormatted} ha sido premiado, pero no estaba reservado. ¡Sorteo desierto!`,
            };
        }
    }
    
    public getEstadisticas(): SorteoStats {
        let occupiedCount = 0;
        for (const id of this.tablero.values()) { if (id !== null) { occupiedCount++; } }

        const totalNumbers = 100;
        const availableNumbers = totalNumbers - occupiedCount;
        const percentageOccupied = parseFloat(((occupiedCount / totalNumbers) * 100).toFixed(2));

        return {
            totalNumbers,
            occupiedNumbers: occupiedCount,
            availableNumbers,
            percentageOccupied,
            totalParticipants: this.participantes.size,
        };
    }

    private static formatNumero(num: string | number): string {
        const numberValue = typeof num === 'string' ? parseInt(num, 10) : num;
        if (isNaN(numberValue) || numberValue < 0 || numberValue > 99) {
            throw new SorteoError(`El número ${num} no es un valor válido entre 00 y 99.`);
        }
        return numberValue.toString().padStart(2, '0');
    }
}