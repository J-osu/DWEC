// src/stores/gameStore.js (Actualizado)
import { defineStore } from 'pinia';
import storyData from '@/data/storyData.json';

export const useGameStore = defineStore('game', {
  state: () => ({
    currentSceneKey: 'start', // Clave de la escena actual
    history: [],
    inventory: {
      hasKey: false 
    },              // Para guardar las decisiones tomadas
    story: storyData
  }),
  getters: {
    // ... (getters sin cambios)
    currentScene: (state) => {
      return state.story[state.currentSceneKey];
    }
  },
  
  actions: {
    // 💡 NUEVA ACCIÓN: AÑADIR AL INVENTARIO
    addToInventory(item) {
      if (item === 'key') {
        this.inventory.hasKey = true;
        console.log('¡Llave de hierro añadida al inventario!');
      }
      // Se pueden añadir más ítems aquí con un switch o lógica más compleja
    },
    makeDecision(nextSceneKey) {
      if (this.story[nextSceneKey]) {
        
        // 💡 LÓGICA ESPECIAL PARA LA ESCENA DE LA LLAVE
        // Si la decisión te lleva a la escena donde encuentras la llave:
        if (this.currentSceneKey === 'path_choice' && nextSceneKey === 'coffin_open') {
             this.addToInventory('key');
        }

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