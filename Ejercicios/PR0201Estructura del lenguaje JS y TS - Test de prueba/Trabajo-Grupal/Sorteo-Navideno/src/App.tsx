import { useState } from 'react';
import RaffleBoard from './components/sorteo/tablero';
import type { NumeroStatus, ParticipanteData } from './core/types';
import FormularioParticipante from './components/sorteo/registroparticipantes';
import SeleccionGanador from './components/sorteo/empiezasorteo';
import './App.css';

function App() {
  const [participantes, setParticipantes] = useState<ParticipanteData[]>([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>('');

  const emptyTablero: NumeroStatus[] = Array.from({ length: 100 }, (_, i) => ({
    numero: i.toString().padStart(2, '0'),
    ocupado: false,
    participanteId: null,
    nombreParticipante: null,
  }));
  const [tableroStatus, setTableroStatus] = useState<NumeroStatus[]>(emptyTablero);
  const [reservedNumbers, setReservedNumbers] = useState<string[]>([]);

  const AgregarParticipante = (data: { nombre: string; email: string }) => {
    const nuevo: ParticipanteData = {
      id: Date.now().toString(),
      nombre: data.nombre,
      email: data.email,
    };
    setParticipantes(prev => [...prev, nuevo]);
  };

  const handleReserve = (numero: string) => {
    if (!selectedParticipantId) { alert('Selecciona un participante'); return; }
    setTableroStatus(prev => prev.map(n =>
      n.numero === numero
        ? { ...n, ocupado: true, participanteId: selectedParticipantId, nombreParticipante: participantes.find(p => p.id === selectedParticipantId)?.nombre ?? null }
        : n
    ));
    setReservedNumbers(prev => [...prev, numero]);
  };

  const handleRelease = (numero: string) => {
    setTableroStatus(prev => prev.map(n =>
      n.numero === numero
        ? { ...n, ocupado: false, participanteId: null, nombreParticipante: null }
        : n
    ));
    setReservedNumbers(prev => prev.filter(x => x !== numero));
  };

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormularioParticipante onAgregarParticipante={AgregarParticipante} />
        <SeleccionGanador tableroStatus={tableroStatus} participantes={participantes} />
      </div>

      <div style={{ flex: 1 }}>
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
  );
}

export default App;
