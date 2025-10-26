import React from 'react';
import { Link } from 'react-router-dom';
import Boton from '../UI/Boton';

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-8">
          ¡Bienvenido al Sorteo Navideño!
        </h1>
        
        <p className="text-xl text-indigo-100 mb-12">
          Participa en nuestro sorteo especial y gana increíbles premios. 
          Registra tus datos y elige tus números de la suerte.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/registro">
            <Boton type="button" className="bg-white text-indigo-600 hover:bg-indigo-50">
              Registrarme
            </Boton>
          </Link>
          
          <Link to="/sorteo">
            <Boton type="button" className="bg-indigo-700 text-white hover:bg-indigo-800">
              Ver Tablero
            </Boton>
          </Link>
        </div>

        <div className="mt-12 text-indigo-100 text-sm">
          <p>¡No pierdas la oportunidad de participar!</p>
          <p>El sorteo se realizará próximamente.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
