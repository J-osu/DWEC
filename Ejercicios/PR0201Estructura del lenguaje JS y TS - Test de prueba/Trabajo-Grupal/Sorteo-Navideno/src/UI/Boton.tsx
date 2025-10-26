// src/UI/Boton.tsx

import React from 'react';

// 1. Define the props
interface BotonProps {
    type: 'button' | 'submit' | 'reset'; 
    children: React.ReactNode; 
    onClick?: () => void;
    className?: string;
}

// 2. Use the props in the component
const Boton: React.FC<BotonProps> = ({ children, type, onClick, className }) => {
    return (
        <button 
            type={type} 
            onClick={onClick}
            className={className ? className : "boton"}
        >
            {children}
        </button>
    );
};

export default Boton;