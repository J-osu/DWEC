import { useState } from 'react'
import RaffleBoard from './components/sorteo/tablero';
import type { NumeroStatus, ParticipanteData } from './core/types';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Datos mínimos para renderizar el tablero
  const [participantes] = useState<ParticipanteData[]>([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>('');

  // crear tablero de ejemplo (00-99) como estados locales
  const emptyTablero = Array.from({length:100}, (_,i): NumeroStatus => ({
    numero: i.toString().padStart(2,'0'),
    ocupado: false,
    participanteId: null,
    nombreParticipante: null,
  }));
  const [tableroStatus, setTableroStatus] = useState<NumeroStatus[]>(emptyTablero);

  const [reservedNumbers, setReservedNumbers] = useState<string[]>([]);

  const handleReserve = (numero: string) => {
    if (!selectedParticipantId) { alert('Selecciona un participante'); return; }
    setTableroStatus(prev => prev.map(n => n.numero === numero ? {...n, ocupado:true, participanteId:selectedParticipantId, nombreParticipante: participantes.find(p=>p.id===selectedParticipantId)?.nombre ?? null} : n));
    setReservedNumbers(prev => [...prev, numero]);
  };

  const handleRelease = (numero: string) => {
    setTableroStatus(prev => prev.map(n => n.numero === numero ? {...n, ocupado:false, participanteId:null, nombreParticipante:null} : n));
    setReservedNumbers(prev => prev.filter(x => x !== numero));
  };

  return (
    <>
  <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{marginTop:20}}>
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
    </>
  )
}

export default App
