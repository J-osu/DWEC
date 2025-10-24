<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-body">
      <h5 class="card-title text-primary">{{ currentSceneKey.replace('_', ' ').toUpperCase() }}</h5>
      
      <p class="card-text fs-5">
        {{ sceneText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

// 1. Acceder a la store
const store = useGameStore();

// 2. Usar computed para reactividad y obtener el texto y la clave de la escena
const sceneText = computed(() => {
  // Verificamos si la escena existe antes de acceder a su 'text'
  return store.currentScene ? store.currentScene.text : 'Cargando historia...';
});

const currentSceneKey = computed(() => store.currentSceneKey);

</script>

<style scoped>
/* Estilos muy básicos, aprovechando las clases de Bootstrap */
.card {
  border-left: 5px solid #007bff; /* Color primario de Bootstrap */
}
</style>