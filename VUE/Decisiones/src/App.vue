
<template>
  <div id="game-container" class="container mt-5 p-4 rounded bg-light shadow-lg">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-secondary mb-0">Elige Tu Propia Aventura</h1>
      
      <button 
        @click="store.restartGame()" 
        class="btn btn-warning btn-sm"
        title="Reiniciar la historia y todas las decisiones"
      >
        <i class="bi bi-arrow-clockwise me-1"></i> Reiniciar
      </button>
    </div>
    
    <StoryScene />
    
    <DecisionPanel class="mt-4" />

    <HistoryLog />
    
    <small class="d-block mt-3 text-muted text-end">Escena actual: {{ store.currentSceneKey }}</small>
  </div>
</template>

<script setup>
import StoryScene from '@/components/StoryScene.vue';
import DecisionPanel from '@/components/DecisionPanel.vue';
import HistoryLog from '@/components/HistoryLog.vue'; // 💡 Importamos el nuevo componente
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore();

import 'bootstrap-icons/font/bootstrap-icons.css'; 
</script>

<style>
/* ... (Estilos sin cambios) ... */
</style>