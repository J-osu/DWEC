import React from 'react';
import type { NumeroStatus, ParticipanteData } from '../../core/types';
import '../../assets/css/tablero.css';

/** Componente: Tablero de Números */
export interface RaffleBoardProps {
    tableroStatus: NumeroStatus[];
    participantes: ParticipanteData[];
    selectedParticipantId: string;
    setSelectedParticipantId: (id: string) => void;
    handleReserve: (numero: string) => void;
    handleRelease: (numero: string) => void;
    reservedNumbers: string[];
}
const RaffleBoard: React.FC<RaffleBoardProps> = ({
    tableroStatus, participantes, selectedParticipantId, setSelectedParticipantId,
    handleReserve, handleRelease, reservedNumbers
}) => {
    
    const selectedParticipant = participantes.find(p => p.id === selectedParticipantId);

    const handleCellAction = (status: NumeroStatus) => {
        if (!selectedParticipantId) {
            alert('⚠️ Por favor, selecciona un participante de la lista antes de interactuar con el tablero.');
            return;
        }

        if (status.ocupado) {
            handleRelease(status.numero);
        } else {
            handleReserve(status.numero);
        }
    };

    return (
        <div className="raffle-board-container">
            <h2>Tablero de la Cesta (00-99)</h2>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap',marginBottom:12}}>
                <select 
                    value={selectedParticipantId} 
                    onChange={(e) => setSelectedParticipantId(e.target.value)}
                >
                    <option value="">-- Selecciona un Participante --</option>
                    {participantes.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre} ({p.id})</option>
                    ))}
                </select>
                <div style={{color:'#6b7280',fontSize:14}}>Modo Local</div>
            </div>
            
            {/* Números Reservados por Participante */}
            {selectedParticipant && (
                <div className="participant-info">
                    <p><strong>Números de {selectedParticipant.nombre}:</strong></p>
                    <p>{reservedNumbers.length > 0 ? reservedNumbers.join(', ') : 'No tiene números reservados.'}</p>
                </div>
            )}


            <div className="raffle-grid">
                {tableroStatus.map(status => {
                    const isSelected = status.participanteId === selectedParticipantId;
                    const statusClass = isSelected ? 'status-selected' : (status.ocupado ? 'status-occupied' : 'status-available');
                    const tooltip = isSelected ? `Tuyo: ${status.nombreParticipante}. Click para liberar.` : (status.ocupado ? `Ocupado por ${status.nombreParticipante}. Click para liberar.` : (selectedParticipant ? 'Click para reservar.' : 'Libre. Selecciona un participante para reservar.'));

                    return (
                        <div 
                            key={status.numero}
                            className={`raffle-cell ${statusClass}`}
                            onClick={() => handleCellAction(status)}
                            title={tooltip}
                        >
                            <span className="raffle-cell-number">{status.numero}</span>
                            {status.ocupado && <span className="raffle-cell-status" title={status.nombreParticipante || ''}>{status.nombreParticipante?.split(' ')[0]}</span>}
                            {!status.ocupado && <span className="raffle-cell-status">Libre</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(RaffleBoard);