import React from 'react';

interface TarjetaProps {
  titulo: string;
  descripcion: string;
}

export default function Tarjeta({ titulo, descripcion }: TarjetaProps) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '16px',
        maxWidth: '250px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ marginBottom: '8px', color: '#333' }}>{titulo}</h3>
      <p style={{ color: '#555', fontSize: '14px' }}>{descripcion}</p>
    </div>
  );
}
