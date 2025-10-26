import React from 'react';
import type { RaffleModalProps } from '../../core/types';

const RaffleModal: React.FC<RaffleModalProps> = ({ result, closeModal }) => {
    if (!result) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center transition-opacity z-50 p-4">
            <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full text-center transform transition-all border-t-8 border-indigo-600">
                <h3 className={`text-3xl font-bold mb-4 ${result.ganador ? 'text-green-600' : 'text-red-600'}`}>
                    {result.ganador ? '¡TENEMOS GANADOR!' : 'SORTEO DESIERTO'}
                </h3>
                <p className="text-xl text-gray-700 mb-6">{result.mensaje}</p>

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <p className="text-lg font-semibold text-indigo-700">Número Premiado:</p>
                    <p className="text-6xl font-extrabold text-indigo-900 mt-1">{result.numeroGanador}</p>
                </div>

                {result.ganador && (
                    <div className="mt-6 text-left p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                        <p className="font-bold text-lg text-yellow-800 mb-1">Detalles del Ganador:</p>
                        <p className="text-gray-700"><strong>{result.ganador.nombre}</strong></p>
                        <p className="text-sm text-gray-600">Email: {result.ganador.email}</p>
                    </div>
                )}
                
                <button onClick={closeModal} className="mt-8 w-full py-3 px-4 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 shadow-lg">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default RaffleModal;