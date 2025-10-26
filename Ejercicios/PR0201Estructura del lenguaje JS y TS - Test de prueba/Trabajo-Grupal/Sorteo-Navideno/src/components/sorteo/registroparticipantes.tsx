import React, { useState } from 'react';
import Boton from '../../UI/Boton';
import '../../assets/css/registroparticipantesestilos.css';
import type { ParticipanteData } from '../../core/types';

interface DatosParticipanteForm {
    nombre: string;
    email: string;
}

interface FormularioProps {
    onAgregarParticipante: (data: DatosParticipanteForm) => void;
    participantes?: ParticipanteData[];
    onEliminarParticipante?: (id: string) => void;
}

const FormularioParticipante: React.FC<FormularioProps> = ({ onAgregarParticipante, participantes = [], onEliminarParticipante }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (nombre.trim() === '' || email.trim() === '') {
            alert('Ingresa tu nombre y el email.');
            return;
        }

        onAgregarParticipante({ nombre, email });

        setNombre('');
        setEmail('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-participante-container">
                <h3>Agregar Nuevo Participante</h3>

                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="form-input"/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
                </div>

                <Boton type="submit">Agregar Participante</Boton>
            </form>

            {/* Lista de participantes actuales */}
            <div className="mt-6">
                <h4 className="mb-2">Participantes Registrados</h4>
                {participantsMessage(participantes)}
                <ul className="space-y-2">
                    {participantes.map(p => (
                        <li key={p.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div>
                                <div className="font-semibold">{p.nombre} <span className="text-xs text-gray-500">({p.id})</span></div>
                                <div className="text-sm text-gray-600">{p.email}</div>
                            </div>
                            {onEliminarParticipante && (
                                <button onClick={() => onEliminarParticipante(p.id)} className="text-sm text-red-600 hover:underline">Eliminar</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

function participantsMessage(participantes: ParticipanteData[]) {
    if (!participantes || participantes.length === 0) return <p className="text-sm text-gray-600">No hay participantes aún.</p>;
    return null;
}

export default FormularioParticipante;