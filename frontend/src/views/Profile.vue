<template>
  <div class="perfil-page">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>
    
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          ÁREA DO USUÁRIO
        </div>
        <h1 class="page-title">Meu Perfil</h1>
        <div class="title-underline"></div>
      </div>

      <!-- Layout em Grid: Perfil à esquerda, Info à direita -->
      <div class="perfil-grid">
        <!-- Card de Avatar e Nome -->
        <div class="avatar-card">
          <div class="avatar-section">
            <div class="avatar">
              <svg class="avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 class="user-name">{{ currentUser.nome }}</h2>
            <p class="welcome-text">Bem-vindo ao SMPM</p>
          </div>

          <!-- Botão Logout -->
          <div class="logout-section">
            <button @click="logout" class="logout-button">
              <span>Sair da Conta</span>
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Card de Informações -->
        <div class="info-card">
          <h3 class="info-title">Informações da Conta</h3>
          
          <div class="user-info">
            <!-- Email -->
            <div class="info-item">
              <div class="info-header">
                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="info-label">Email</span>
              </div>
              <p class="info-value">{{ currentUser.email }}</p>
            </div>

            <!-- ID do Usuário -->
            <div class="info-item">
              <div class="info-header">
                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span class="info-label">ID do Usuário</span>
              </div>
              <p class="info-value">{{ currentUser._id || 'N/A' }}</p>
            </div>

            <!-- Data de Cadastro -->
            <div class="info-item">
              <div class="info-header">
                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="info-label">Membro desde</span>
              </div>
              <p class="info-value">{{ formatarData(currentUser.criadoEm) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção de Navegação -->
      <div class="navigation-section">
        <div class="section-header">
          <span class="section-tag">MENU</span>
          <h3 class="section-title">Acesso Rápido</h3>
        </div>
        
        <div class="quick-links">
          <!-- Card Dashboard -->
          <a href="/dashboard" class="quick-link-card">
            <div class="card-icon orange">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 class="card-title">Dashboard</h4>
            <p class="card-description">Visualize os dados e gráficos das máquinas</p>
          </a>

          <!-- Card Máquinas -->
          <a href="/maquina" class="quick-link-card">
            <div class="card-icon green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h4 class="card-title">Máquinas</h4>
            <p class="card-description">Gerencie e controle todas as máquinas</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentUser = ref({
  nome: 'João Silva',
  email: 'joao.silva@exemplo.com',
  _id: 'USR123456789',
  criadoEm: '2024-01-15T10:30:00Z'
});

const formatarData = (data) => {
  if (!data) return 'Data não disponível';
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const logout = () => {
  localStorage.removeItem('currentUser');
  alert('Logout realizado com sucesso!');
};

onMounted(() => {
  const savedUser = localStorage.getItem('currentUser');
  
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      currentUser.value = {
        nome: user.nome || user.name || 'Usuário',
        email: user.email || 'email@exemplo.com',
        _id: user._id || 'N/A',
        criadoEm: user.criadoEm || new Date().toISOString()
      };
    } catch (e) {
      console.error('Erro ao parsear usuário:', e);
    }
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.perfil-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
  position: relative;
  overflow-x: hidden;
  padding: 2rem;
}

/* Background Effects */
.bg-grid {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
}

.bg-gradient {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
  animation: rotate 20s linear infinite;
  z-index: 0;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Header */
.page-header {
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: #a5b4fc;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
}

.title-underline {
  height: 4px;
  width: 120px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 2px;
}

/* Grid Layout */
.perfil-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease;
}

/* Avatar Card */
.avatar-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  position: relative;
  overflow: hidden;
}

.avatar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.avatar-card:hover::before {
  opacity: 1;
}

.avatar-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.avatar {
  width: 128px;
  height: 128px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.avatar-icon {
  width: 64px;
  height: 64px;
  color: white;
}

.user-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
}

.welcome-text {
  font-size: 1rem;
  color: #9ca3af;
  font-weight: 500;
}

/* Logout Section */
.logout-section {
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: transparent;
  color: #ef4444;
  border: 2px solid #ef4444;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #dc2626;
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Info Card */
.info-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.info-card:hover::before {
  opacity: 1;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.info-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.info-item {
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.5);
  transform: translateX(4px);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.info-icon {
  width: 24px;
  height: 24px;
  color: #6366f1;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin-left: 2.25rem;
  word-break: break-all;
}

/* Navigation Section */
.navigation-section {
  margin-top: 3rem;
  animation: fadeInUp 1s ease;
}

.section-header {
  text-align: left;
  margin-bottom: 2rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.quick-link-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-decoration: none;
  transition: all 0.4s ease;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: block;
}

.quick-link-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.quick-link-card:hover::before {
  opacity: 1;
}

.quick-link-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.card-icon svg {
  width: 28px;
  height: 28px;
}

.card-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }
.card-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
}

.card-description {
  font-size: 1rem;
  color: #9ca3af;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .perfil-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .perfil-page {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }

  .avatar {
    width: 96px;
    height: 96px;
  }

  .avatar-icon {
    width: 48px;
    height: 48px;
  }

  .user-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }

  .avatar-card,
  .info-card {
    padding: 1.5rem;
  }

  .info-value {
    font-size: 1rem;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>