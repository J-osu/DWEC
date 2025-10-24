<template>
  <div class="mt-5 p-3 bg-white border rounded">
    <h6 class="text-secondary mb-3">Historial de Decisiones ({{ history.length }})</h6>
    
    <div v-if="history.length === 0" class="text-muted fst-italic small">
      Aún no se ha tomado ninguna decisión.
    </div>
    
    <ul v-else class="list-group list-group-flush small">
      <li 
        v-for="(decision, index) in history" 
        :key="`${decision.from}-${decision.to}-${index}`"
        class="list-group-item d-flex justify-content-between align-items-start px-0"
      >
        <span class="text-wrap">
          Decisión {{ index + 1 }}: De **{{ formatSceneKey(decision.from) }}** a **{{ formatSceneKey(decision.to) }}**
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore();

// Usamos computed para acceder al historial de forma reactiva
const history = computed(() => store.history);

// Función de utilidad para formatear las claves (ej: 'forest_entry' -> 'Forest Entry')
const formatSceneKey = (key) => {
  if (!key) return 'Inicio';
  return key.replace(/_/g, ' ') // Reemplaza guiones bajos por espacios
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palabra
            .join(' ');
};
</script>

<style scoped>
/* Estilos muy ligeros de Bootstrap para la caja */
.list-group-item {
  line-height: 1.4;
}
</style>