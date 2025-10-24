<template>
  <div class="list-group">
    <template v-if="options.length > 0">
      <button 
        v-for="(option, index) in options"
        :key="option.nextScene"
        @click="handleDecision(option.nextScene)"
        class="list-group-item list-group-item-action list-group-item-primary mb-2"
      >
        {{ option.label }}
      </button>
    </template>
    <div v-else class="alert alert-info" role="alert">
      Fin de la aventura. ¡Gracias por jugar!
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

// 1. Acceder a la store
const store = useGameStore();

// 2. Obtener las opciones de la escena actual
const options = computed(() => {
  // Si la escena no existe o no tiene 'options', retornamos un array vacío
  return store.currentScene && store.currentScene.options ? store.currentScene.options : [];
});

// 3. Manejador de la decisión que llama a la action de Pinia
const handleDecision = (nextSceneKey) => {
  store.makeDecision(nextSceneKey);
};
</script>

<style scoped>
/* Estilos para que los botones de decisión se vean bien */
.list-group-item-action:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}
</style>