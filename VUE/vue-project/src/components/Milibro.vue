<template>
    <div>
        <h1>Mi libro</h1>
        <h2>Ya dispobible</h2>
        <button>{{ buttonText }}</button>
        <button :disabled="buttonDisabled">Comprar ahora</button>
        <button :class="buttonClass">Comprar ahora</button>
        <button :style="buttonStyle">Comprar ahora</button>
        <button @click="comprarLibro">Comprar ahora</button>
        <button @click="comprarLibro2()">Comprar ahora</button>
        <button @click="comprarLibro3">Comprar ahora</button>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    const buttonText = ref('Comprar ahora');
    const buttonDisabled = ref(false);
    const buttonClass = ref('button');
    const buttonStyle = ref('color: red');

    function comprarLibro() {
        alert('Libro comprado');
    }
    function comprarLibro2() {
        alert('Libro comprado');
    }
    function comprarLibro3() {
        alert('Libro comprado');
    }
</script>