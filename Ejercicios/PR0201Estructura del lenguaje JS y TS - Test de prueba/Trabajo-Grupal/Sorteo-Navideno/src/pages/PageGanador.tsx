import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLastResult, clearLastResult } from '../core/sorteoService';
import Boton from '../UI/Boton';
import type { SorteoResult } from '../core/types';

const PageGanador: React.FC = () => {
  const [result, setResult] = useState<SorteoResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setResult(getLastResult());
  }, []);

  const handleLimpiar = () => {
    clearLastResult();
    setResult(null);
    navigate('/sorteo');
  };

  if (!result || !result.ganador) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">No hay ganador registrado</h1>
          <p className="mb-6">Realiza el sorteo para ver el ganador aquí.</p>
          <Link to="/sorteo">
            <Boton type="button">Ir al Tablero</Boton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-200 to-green-500">
      <div className="bg-white rounded-xl shadow-2xl p-10 text-center max-w-md">
        <h1 className="text-4xl font-bold text-green-700 mb-6">¡Ganador del Sorteo!</h1>
        <div className="mb-8">
          <p className="text-2xl font-semibold text-indigo-700 mb-2">Número Premiado:</p>
          <p className="text-6xl font-extrabold text-indigo-900">{result.numeroGanador}</p>
        </div>
        <div className="mb-6">
          <p className="font-bold text-lg text-yellow-800 mb-1">Nombre:</p>
          <p className="text-2xl text-gray-800 mb-2">{result.ganador.nombre}</p>
          <p className="text-sm text-gray-600">Email: {result.ganador.email}</p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <Link to="/">
            <Boton type="button">Volver al Inicio</Boton>
          </Link>
          <Boton type="button" onClick={handleLimpiar} className="bg-red-600 text-white">Limpiar ganador y volver al tablero</Boton>
        </div>
      </div>
    </div>
  );
};

export default PageGanador;
