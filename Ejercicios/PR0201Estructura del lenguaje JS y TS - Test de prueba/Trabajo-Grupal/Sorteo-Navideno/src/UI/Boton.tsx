import React from 'react';

const Boton: React.FC = () => {
  return (
    <button
      style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Boton
    </button>
  );
};

export default Boton;
