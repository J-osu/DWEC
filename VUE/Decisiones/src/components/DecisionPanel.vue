<template>
  <div class="list-group">
    <template v-if="options.length > 0">
      <template v-for="(option, index) in options" :key="index">
        <button 
          v-if="!option.requiresInventory || store.inventory[option.requiresInventory]"
          @click="handleDecision(option.nextScene)"
          class="list-group-item list-group-item-action list-group-item-primary mb-2"
        >
          {{ option.label }}
        </button>
        <button 
          v-else
          class="list-group-item list-group-item-action list-group-item-secondary mb-2"
          disabled
        >
          {{ option.label }} (Necesitas: {{ option.requiresText }})
        </button>
      </template>
    </template>
    <div v-else class="alert alert-info" role="alert">
      Fin de la aventura. ¡Gracias por jugar!
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore();

const options = computed(() => {
  return store.currentScene && store.currentScene.options ? store.currentScene.options : [];
});

const handleDecision = (nextSceneKey) => {
  store.makeDecision(nextSceneKey);
};
</script>