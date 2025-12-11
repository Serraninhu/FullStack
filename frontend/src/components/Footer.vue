<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <span class="footer-text">SMPM</span>
      </div>
      <p>© 2025 SMPM — Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
:root {
  --azul-escuro: #0b1d3a;
  --azul-claro: #009ee3;
  --verde-limao: #8cd600;
  --branco: #f2f2f2;
}

.footer {
  background-color: var(--azul-escuro);
  color: var(--branco);
  padding: 1rem 2rem;
  border-top: 3px solid var(--azul-claro);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo img {
  height: 32px;
  width: auto;
}

.footer-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--branco);
}
</style>
