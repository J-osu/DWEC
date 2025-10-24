// src/stores/gameStore.js (Actualizado)
import { defineStore } from 'pinia';
import storyData from '@/data/storyData.json';

export const useGameStore = defineStore('game', {
  state: () => ({
    currentSceneKey: 'start', // Clave de la escena actual
    history: [],              // Para guardar las decisiones tomadas
    story: storyData
  }),
  getters: {
    // ... (getters sin cambios)
    currentScene: (state) => {
      return state.story[state.currentSceneKey];
    }
  },
  actions: {
    // Acción para cambiar de escena (sin cambios)
    makeDecision(nextSceneKey) {
      if (this.story[nextSceneKey]) {
        this.history.push({ 
          from: this.currentSceneKey, 
          to: nextSceneKey 
        });
        this.currentSceneKey = nextSceneKey;
      } else {
        console.error(`Error: La escena ${nextSceneKey} no existe.`);
      }
    },
    
    // 💡 NUEVA ACCIÓN: Reiniciar el juego
    restartGame() {
      this.currentSceneKey = 'start'; // Volver al inicio
      this.history = [];              // Limpiar el historial
      console.log('Juego Reiniciado.');
    }
  }
});