<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '../stores/usuario';

const menuOpen = ref(false);
const router = useRouter();
const usuariosStore = useUsuariosStore();

const currentUser = computed(() => usuariosStore.currentUser);
const isLoggedIn = computed(() => !!currentUser.value);

function handleLogout() {
  usuariosStore.logout();
  menuOpen.value = false;
  router.push('/');
}

onMounted(() => {
  console.log('Header montado - Usuário logado:', currentUser.value);
});
</script>

<template>
  <header class="header">
    <div class="container">
      <!-- Logo Area -->
      <div class="logo-area">
        <img src="/src/assets/logo2.png" alt="Logo SMPPM" class="logo-img" />
        <h1 class="logo-text">SMPM</h1>
      </div>

      <!-- Botão Mobile Menu -->
      <button
        @click="menuOpen = !menuOpen"
        class="mobile-menu-btn"
        aria-label="Abrir menu"
      >
        <svg
          v-if="!menuOpen"
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Desktop Navigation -->
      <nav class="nav desktop-nav">
        <router-link to="/" class="nav-link" exact>Home</router-link>
        <router-link to="/servicos" class="nav-link">Serviços</router-link>
        <router-link to="/contato" class="nav-link">Contato</router-link>
        
        <!-- Se estiver logado -->
        <template v-if="isLoggedIn">
          <router-link to="/perfil" class="user-badge">
            <span class="user-icon">👤</span>
            <span class="user-name">Olá, {{ currentUser?.name }}</span>
          </router-link>
          <button @click="handleLogout" class="btn-logout">
            Sair
          </button>
        </template>
        
        <!-- Se NÃO estiver logado -->
        <router-link v-else to="/login" class="nav-link">
          Login
        </router-link>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="mobile-menu">
      <router-link @click="menuOpen = false" to="/" class="mobile-link">Home</router-link>
      <router-link @click="menuOpen = false" to="/servicos" class="mobile-link">Serviços</router-link>
      <router-link @click="menuOpen = false" to="/contato" class="mobile-link">Contato</router-link>
      
      <!-- Se estiver logado (Mobile) -->
      <template v-if="isLoggedIn">
        <div class="mobile-user-section">
          <router-link 
            to="/perfil"
            @click="menuOpen = false"
            class="mobile-user-badge"
          >
            <span class="user-icon">👤</span>
            <span>Olá, {{ currentUser?.name }}</span>
          </router-link>
          <button @click="handleLogout" class="mobile-logout-btn">
            Sair
          </button>
        </div>
      </template>
      
      <!-- Se NÃO estiver logado (Mobile) -->
      <router-link 
        v-else 
        @click="menuOpen = false" 
        to="/login" 
        class="mobile-link"
      >
        Login
      </router-link>
    </div>
  </header>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

/* Paleta SMPPM */
:root {
  --azul-escuro: #0D1B2A;
  --azul-eletrico: #00A8E8;
  --cinzento-metalico: #5C677D;
  --branco-gelo: #E0E1DD;
}

/* Header */
.header {
  background-color: #0D1B2A;
  color: #E0E1DD;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid #00A8E8;
}

/* Container */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo Area */
.logo-area {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
}

.logo-img {
  width: 50px;
  height: auto;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  letter-spacing: 1px;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s;
}

.mobile-menu-btn:hover {
  background: rgba(0, 168, 232, 0.2);
}

.mobile-menu-btn .icon {
  width: 28px;
  height: 28px;
  color: white;
}

/* Desktop Navigation */
.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.desktop-nav {
  display: flex;
}

.nav-link {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  padding: 8px 0;
}

.nav-link:hover {
  color: #00A8E8;
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #00A8E8;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

/* User Badge */
.user-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  background-color: rgba(0, 168, 232, 0.15);
  border-radius: 25px;
  border: 2px solid #00A8E8;
  text-decoration: none;
  transition: all 0.3s ease;
}

.user-badge:hover {
  background-color: rgba(0, 168, 232, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 168, 232, 0.4);
}

.user-icon {
  font-size: 1.2rem;
}

.user-name {
  color: #E0E1DD;
  font-size: 0.95rem;
  font-weight: 600;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Logout Button */
.btn-logout {
  background: linear-gradient(135deg, #00A8E8 0%, #5C677D 100%);
  color: #E0E1DD;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 168, 232, 0.3);
}

.btn-logout:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 168, 232, 0.5);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1.5rem;
  background: #E0E1DD;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-link {
  color: #0D1B2A;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 600;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: block;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  background-color: rgba(0, 168, 232, 0.15);
  color: #00A8E8;
  transform: translateX(5px);
}

/* Mobile User Section */
.mobile-user-section {
  border-top: 2px solid #5C677D;
  padding-top: 1rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.mobile-user-badge {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background-color: rgba(0, 168, 232, 0.15);
  border: 2px solid #00A8E8;
  border-radius: 10px;
  font-weight: 600;
  color: #00A8E8;
  text-decoration: none;
  transition: all 0.3s ease;
}

.mobile-user-badge:hover {
  background-color: rgba(0, 168, 232, 0.25);
  transform: translateX(5px);
}

.mobile-logout-btn {
  background: linear-gradient(135deg, #00A8E8 0%, #5C677D 100%);
  color: #E0E1DD;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 168, 232, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-menu {
    display: flex;
  }

  .container {
    padding: 0 1rem;
  }

  .logo-img {
    width: 40px;
  }

  .logo-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.3rem;
  }

  .mobile-menu {
    padding: 1rem;
  }

  .mobile-link {
    font-size: 1rem;
    padding: 0.7rem 0.8rem;
  }
}
</style>