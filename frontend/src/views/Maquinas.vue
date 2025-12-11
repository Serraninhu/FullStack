<template>
  <section class="maquinas-page">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>
    
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-top">
          <div class="title-section">
            <div class="header-badge">
              <span class="badge-dot"></span>
              GESTÃO DE ATIVOS
            </div>
            <h2 class="page-title">Equipamentos Industriais</h2>
            <p class="page-subtitle">Gerencie e monitore seus ativos em tempo real</p>
          </div>
          
          <div class="header-actions">
            <div class="stats-pill">
              <svg class="stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              <div class="stats-content">
                <span class="stats-value">{{ storeM.totalMaquinas }}</span>
                <span class="stats-label">Máquinas</span>
              </div>
            </div>
            
            <button @click="irParaCalendario" class="btn-calendar">
              <span>Calendário</span>
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="storeM.loading && storeM.maquinas.length === 0" class="loading-state">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <p class="loading-text">Carregando equipamentos...</p>
      </div>

      <!-- Erro -->
      <div v-else-if="storeM.error" class="error-state">
        <div class="error-card">
          <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div class="error-content">
            <h3 class="error-title">Erro ao carregar</h3>
            <p class="error-message">{{ storeM.error }}</p>
          </div>
        </div>
      </div>

      <!-- Conteúdo -->
      <template v-else>
        <!-- Formulário -->
        <div class="content-section">
          <div class="section-header">
            <div class="section-icon purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div class="section-info">
              <h3 class="section-title">{{ editingM ? 'Editar Equipamento' : 'Novo Equipamento' }}</h3>
              <p class="section-description">
                {{ editingM ? 'Atualize as informações do equipamento' : 'Adicione um novo equipamento ao sistema' }}
              </p>
            </div>
          </div>
          
          <div class="form-container">
            <MaquinaForm
              v-if="!editingM"
              :submitting="storeM.loading"
              @submit="storeM.addMaquina"
            />
            
            <MaquinaForm
              v-else
              :initial="editingM"
              :submitting="storeM.loading"
              @submit="(payload) => { storeM.updateMaquina(editingM._id, payload); editingM=null; }"
              @cancel="cancelEditM"
              edit
            />
          </div>
        </div>

        <!-- Lista -->
        <div class="content-section">
          <div class="section-header">
            <div class="section-icon blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
            </div>
            <div class="section-info">
              <h3 class="section-title">Equipamentos Cadastrados</h3>
              <p class="section-description">
                Visualize e gerencie todos os equipamentos
              </p>
            </div>
          </div>
          
          <div class="list-container">
            <MaquinaList
              :maquina="storeM.maquinas"
              @edit="editM"
              @remove="storeM.removeMaquina"
            />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMaquinaStore } from "../stores/maquina";
import MaquinaForm from "../components/MaquinaForm.vue";
import MaquinaList from "../components/MaquinaList.vue";

const router = useRouter();
const storeM = useMaquinaStore();
const editingM = ref(null);

onMounted(() => {
  storeM.fetchMaquina();
});

function editM(maquina) {
  editingM.value = { ...maquina };
}

function cancelEditM() {
  editingM.value = null;
}

function irParaCalendario() {
  router.push('/calendario');
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Base */
.maquinas-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
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

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.title-section {
  flex: 1;
  min-width: 300px;
}

.header-badge {
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
  font-weight: 900;
  background: linear-gradient(90deg, #fff 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
}

.page-subtitle {
  color: #9ca3af;
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.7;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.stats-pill {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stats-pill:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
}

.stats-icon {
  width: 32px;
  height: 32px;
  color: #6366f1;
}

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stats-value {
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.stats-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.btn-calendar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.btn-calendar:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 5rem 2rem;
  animation: fadeInUp 0.6s ease;
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring:nth-child(2) {
  border-top-color: #8b5cf6;
  animation-delay: -0.5s;
}

.spinner-ring:nth-child(3) {
  border-top-color: #ec4899;
  animation-delay: -1s;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #9ca3af;
  font-size: 1.125rem;
  font-weight: 500;
}

/* Error State */
.error-state {
  padding: 2rem 0;
  animation: fadeInUp 0.6s ease;
}

.error-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-left: 4px solid #ef4444;
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.error-icon {
  width: 40px;
  height: 40px;
  color: #ef4444;
  flex-shrink: 0;
}

.error-content {
  flex: 1;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fca5a5;
  margin: 0 0 0.5rem 0;
}

.error-message {
  color: #fca5a5;
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
}

/* Content Sections */
.content-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.8s ease;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.content-section::before {
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

.content-section:hover::before {
  opacity: 1;
}

.content-section:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
}

.section-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-icon svg {
  width: 28px;
  height: 28px;
  color: #fff;
}

.section-icon.purple {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.section-icon.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
}

.section-description {
  color: #9ca3af;
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
}

.form-container,
.list-container {
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
  .header-top {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .maquinas-page {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 2.25rem;
  }

  .page-subtitle {
    font-size: 1.125rem;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
  }

  .stats-pill,
  .btn-calendar {
    width: 100%;
    justify-content: center;
  }

  .content-section {
    padding: 2rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
}

@media (max-width: 480px) {
  .maquinas-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .header-badge {
    font-size: 0.65rem;
    padding: 0.4rem 1rem;
  }

  .content-section {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .section-description {
    font-size: 0.875rem;
  }
}
</style>