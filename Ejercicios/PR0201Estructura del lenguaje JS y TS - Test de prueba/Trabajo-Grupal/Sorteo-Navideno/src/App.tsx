import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import PageFormulario from './pages/PageFormulario';
import PageSorteo from './pages/PageSorteo';
import PageGanador from './pages/PageGanador';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/registro" element={<PageFormulario />} />
        <Route path="/sorteo" element={<PageSorteo />} />
  <Route path="/ganador" element={<PageGanador />} />
      </Routes>
    </Router>
  );
};

export default App;
