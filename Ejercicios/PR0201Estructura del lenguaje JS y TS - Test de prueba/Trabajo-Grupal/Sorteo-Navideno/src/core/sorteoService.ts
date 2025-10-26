import { Sorteo } from './logicaSorteo';
import type { ParticipanteData, SorteoStateData } from './types';

const STORAGE_KEY = 'sorteo_state_v1';

const sorteo = new Sorteo();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: SorteoStateData = JSON.parse(raw);
      sorteo.loadState(data);
    }
  } catch (e) {
    // ignore parsing errors
    console.warn('No se pudo cargar el estado del sorteo desde localStorage', e);
  }
}

function save() {
  try {
    const data = sorteo.toStateData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('No se pudo guardar el estado del sorteo en localStorage', e);
  }
}

// Cargar estado al inicializar el servicio
load();

export function getSorteoInstance(): Sorteo {
  return sorteo;
}

export function registrarParticipante(data: Omit<ParticipanteData, 'id'>) {
  const p = sorteo.registrarParticipante(data);
  save();
  return p;
}

export function eliminarParticipante(id: string) {
  sorteo.eliminarParticipante(id);
  save();
}

export function reservarNumero(numero: string, participanteId: string) {
  sorteo.reservarNumero(numero, participanteId);
  save();
}

export function liberarNumero(numero: string) {
  sorteo.liberarNumero(numero);
  save();
}

export function realizarSorteo(numeroGanador: string) {
  const res = sorteo.realizarSorteo(numeroGanador);
  save();
  try {
    localStorage.setItem('sorteo_last_result', JSON.stringify(res));
  } catch {
    console.warn('No se pudo guardar el resultado del sorteo');
  }
  return res;
}

export function getEstadoTablero() { return sorteo.getEstadoTablero(); }
export function getListaParticipantes() { return sorteo.getListaParticipantes(); }
export function getNumerosReservadosPorParticipante(id: string) { return sorteo.getNumerosReservadosPorParticipante(id); }
export function getEstadisticas() { return sorteo.getEstadisticas(); }

export function getLastResult() {
  try {
    const raw = localStorage.getItem('sorteo_last_result');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearLastResult() {
  try {
    localStorage.removeItem('sorteo_last_result');
  } catch {
    // ignore
  }
}
