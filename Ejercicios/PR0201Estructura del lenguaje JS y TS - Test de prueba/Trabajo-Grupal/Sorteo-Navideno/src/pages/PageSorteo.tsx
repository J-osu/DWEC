import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { NumeroStatus, ParticipanteData } from '../core/types';
import RaffleBoard from '../components/sorteo/tablero';
import SeleccionGanador from '../components/sorteo/empiezasorteo';
import StatCard from '../UI/StatCard';
import Boton from '../UI/Boton';
import {
  reservarNumero,
  liberarNumero,
  realizarSorteo,
  getEstadoTablero,
  getListaParticipantes,
  getNumerosReservadosPorParticipante,
  getEstadisticas,
} from '../core/sorteoService';

const PageSorteo: React.FC = () => {
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>('');
  const [tableroStatus, setTableroStatus] = useState<NumeroStatus[]>(() => getEstadoTablero());
  const [participantes, setParticipantes] = useState<ParticipanteData[]>(() => getListaParticipantes());

  useEffect(() => {
    // sincronizar estado al montar
    setTableroStatus(getEstadoTablero());
    setParticipantes(getListaParticipantes());
  }, []);

  const handleReserve = (numero: string) => {
    try {
      reservarNumero(numero, selectedParticipantId);
      setTableroStatus(getEstadoTablero());
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al reservar número');
    }
  };

  const handleRelease = (numero: string) => {
    try {
      liberarNumero(numero);
      setTableroStatus(getEstadoTablero());
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al liberar número');
    }
  };

  const navigate = useNavigate();
  const handleSorteoComplete = (numeroGanador: string) => {
    realizarSorteo(numeroGanador);
    setTableroStatus(getEstadoTablero());
    setParticipantes(getListaParticipantes());
    navigate('/ganador');
  };

  const reservedNumbers = selectedParticipantId 
    ? getNumerosReservadosPorParticipante(selectedParticipantId)
    : [];

  const stats = getEstadisticas();

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Tablero del Sorteo</h1>
          <Link to="/">
            <Boton type="button">Volver al Inicio</Boton>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Stats y Selección */}
          <div className="space-y-6">
            <StatCard
              title="Estadísticas del Sorteo"
              stats={[
                { label: 'Números Disponibles', value: stats.availableNumbers },
                { label: 'Números Ocupados', value: stats.occupiedNumbers },
                { label: 'Participantes', value: stats.totalParticipants }
              ]}
            />

            <SeleccionGanador
              tableroStatus={tableroStatus}
              participantes={participantes}
              onSorteoComplete={handleSorteoComplete}
            />

            <div className="text-center mt-4">
              <Link to="/registro">
                <Boton type="button">Registrar Nuevo Participante</Boton>
              </Link>
            </div>
          </div>

          {/* Columna derecha: Tablero */}
          <div className="lg:col-span-2">
            <RaffleBoard 
              tableroStatus={tableroStatus}
              participantes={participantes}
              selectedParticipantId={selectedParticipantId}
              setSelectedParticipantId={setSelectedParticipantId}
              handleReserve={handleReserve}
              handleRelease={handleRelease}
              reservedNumbers={reservedNumbers}
            />
          </div>
        </div>
      </div>

      {/* El ganador ya no se muestra aquí, sino en la página /ganador */}
    </div>
  );
};

export default PageSorteo;
