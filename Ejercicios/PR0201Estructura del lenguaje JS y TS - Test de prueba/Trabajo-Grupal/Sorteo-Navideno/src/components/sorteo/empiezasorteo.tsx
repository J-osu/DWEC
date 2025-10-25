import React, { useState } from 'react';
import type { NumeroStatus, ParticipanteData } from '../../core/types';
import Boton from '../../UI/Boton';
import '../../assets/css/empiezasorteo.css';

interface SeleccionGanadorProps {
    tableroStatus: NumeroStatus[];
    participantes: ParticipanteData[];
}

const SeleccionGanador: React.FC<SeleccionGanadorProps> = ({ tableroStatus, participantes }) => {
    const [numeroGanador, setNumeroGanador] = useState<string | null>(null);
    const [ganador, setGanador] = useState<ParticipanteData | null>(null);

    const elegirGanador = () => {
        const numerosOcupados = tableroStatus.filter(n => n.ocupado);
        
        if (numerosOcupados.length === 0) {
            alert('No hay numeros reservados');
            return;
        }

        const aleatorio = numerosOcupados[Math.floor(Math.random() * numerosOcupados.length)];
        setNumeroGanador(aleatorio.numero);

        const participanteGanador = participantes.find(p => p.id === aleatorio.participanteId) || null;
        setGanador(participanteGanador);
    };

    return (
        <div className="seleccion-ganador-container">
            <h3>Numero Ganador</h3>
            <p>Pulsa el boton</p>

            <Boton type="button" onClick={elegirGanador}>Elegir Ganador</Boton>

            {numeroGanador && ganador && (
                <div className="ganador-info">
                    <h4>Ganador:</h4>
                    <p><strong>Numero:</strong> {numeroGanador}</p>
                    <p><strong>Participante:</strong> {ganador.nombre}</p>
                    <p><strong>Email:</strong> {ganador.email}</p>
                </div>
            )}
        </div>
    );
};

export default React.memo(SeleccionGanador);
