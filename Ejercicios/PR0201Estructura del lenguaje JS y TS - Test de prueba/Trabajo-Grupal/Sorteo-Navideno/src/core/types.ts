/** Interfaz para el formulario de registro de participante */
export interface DatosParticipanteForm {
    nombre: string;
    email: string;
}

/** Interfaz para los datos básicos del participante. */
export interface ParticipanteData {
    id: string;
    nombre: string;
    email: string;
}

export interface SorteoStateData {
    participants: ParticipanteData[];
    tablero: Record<string, string | null>;
    participanteIdCounter: number;
}

/** Estructura del objeto devuelto al obtener el estado de un número. */
export type NumeroStatus = {
    numero: string;
    ocupado: boolean;
    participanteId: string | null;
    nombreParticipante: string | null;
}

/** Estructura para las estadísticas del sorteo. */
export interface SorteoStats {
    totalNumbers: number;
    occupiedNumbers: number;
    availableNumbers: number;
    percentageOccupied: number;
    totalParticipants: number;
}

/** Objeto de resultado del sorteo. */
export interface SorteoResult {
    numeroGanador: string;
    ganador: ParticipanteData | null;
    mensaje: string;
}

export interface DatosParticipante {
    id: string;
    nombre: string;
    email: string;
}

export interface RaffleModalProps {
    result: SorteoResult | null;
    closeModal: () => void;
}