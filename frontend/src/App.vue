<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div class="app-container">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<style scoped>
:root {
  --azul-escuro: #0d1b2a;
  --azul-claro: #1b263b;
}

.app-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, var(--azul-escuro) 0%, var(--azul-claro) 100%);
}

/* Seu estilo original */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
