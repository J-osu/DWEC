import React from 'react';
import type { NumeroStatus, ParticipanteData } from '../../core/types';
import Boton from '../../UI/Boton';
import '../../assets/css/empiezasorteo.css';

interface SeleccionGanadorProps {
    tableroStatus: NumeroStatus[];
    participantes: ParticipanteData[];
    onSorteoComplete: (numeroGanador: string) => void;
}

const SeleccionGanador: React.FC<SeleccionGanadorProps> = ({ tableroStatus, onSorteoComplete }) => {
    const elegirGanador = () => {
        const numerosOcupados = tableroStatus.filter(n => n.ocupado);
        if (numerosOcupados.length === 0) {
            alert('No hay números reservados');
            return;
        }
        const aleatorio = numerosOcupados[Math.floor(Math.random() * numerosOcupados.length)];
        onSorteoComplete(aleatorio.numero);
    };

    return (
        <div className="seleccion-ganador-container">
            <h3>Elegir Ganador</h3>
            <p>Pulsa el botón para seleccionar aleatoriamente el número ganador. El resultado se mostrará en la página de ganador.</p>
            <Boton type="button" onClick={elegirGanador}>Elegir Ganador</Boton>
        </div>
    );
};

export default React.memo(SeleccionGanador);
