import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RegistroParticipantes from '../components/sorteo/registroparticipantes';
import Boton from '../UI/Boton';
import type { ParticipanteData } from '../core/types';
import { registrarParticipante, getListaParticipantes, eliminarParticipante } from '../core/sorteoService';

const PageFormulario: React.FC = () => {
  const [participantes, setParticipantes] = useState<ParticipanteData[]>([]);

  useEffect(() => {
    setParticipantes(getListaParticipantes());
  }, []);

  const handleAgregar = (data: { nombre: string; email: string }) => {
    try {
      registrarParticipante(data);
      setParticipantes(getListaParticipantes());
      alert('¡Participante registrado con éxito!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al registrar participante');
    }
  };

  const handleEliminar = (id: string) => {
    if (!confirm('¿Eliminar participante? Se liberarán sus números.')) return;
    try {
      eliminarParticipante(id);
      setParticipantes(getListaParticipantes());
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al eliminar participante');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-600">Registro de Participantes</h1>
            <Link to="/">
              <Boton type="button">Volver</Boton>
            </Link>
          </div>

          <RegistroParticipantes onAgregarParticipante={handleAgregar} participantes={participantes} onEliminarParticipante={handleEliminar} />

          <div className="mt-8 text-center">
            <Link to="/sorteo">
              <Boton type="button">Ir al Tablero</Boton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFormulario;
