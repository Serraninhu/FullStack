<template>
  <div
    class="modal-overlay"
    @click.self="$emit('close')"
  >
    <div class="modal-card">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-badge">
          <span class="badge-dot"></span>
          INFORMAÇÕES DA MANUTENÇÃO
        </div>
        <button
          @click="$emit('close')"
          class="close-button"
        >
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="modal-content">
        <!-- Status Card -->
        <div class="status-card">
          <div class="status-icon-wrapper" :class="statusIconClass(manutencao.status)">
            <svg v-if="manutencao.status === 'Agendada'" class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else-if="manutencao.status === 'Em andamento'" class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <svg v-else-if="manutencao.status === 'Concluída'" class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div class="status-content">
            <span class="status-label">Status Atual</span>
            <span :class="['status-badge', statusClass(manutencao.status)]">
              {{ manutencao.status }}
            </span>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="info-grid">
          <div class="info-card card-primary">
            <div class="card-icon purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <div class="card-content">
              <span class="card-label">Equipamento</span>
              <h3 class="card-value">{{ manutencao.maquina?.name || 'N/A' }}</h3>
              <span class="card-subtitle">{{ manutencao.maquina?.type || '' }}</span>
            </div>
          </div>

          <div class="info-card card-secondary">
            <div class="card-icon blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="card-content">
              <span class="card-label">Técnico</span>
              <h3 class="card-value">{{ manutencao.tecnico }}</h3>
            </div>
          </div>

          <div class="info-card card-secondary">
            <div class="card-icon green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="card-content">
              <span class="card-label">Data Agendada</span>
              <h3 class="card-value">{{ formatarData(manutencao.dataAgendada) }}</h3>
            </div>
          </div>
        </div>

        <!-- Description Box -->
        <div class="description-box">
          <div class="description-header">
            <svg class="description-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span class="description-label">Descrição</span>
          </div>
          <p class="description-text">{{ manutencao.descricao }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="action-section" v-if="manutencao.status === 'Agendada' || manutencao.status === 'Em andamento'">
          <button
            @click="concluir"
            v-if="manutencao.status === 'Agendada' || manutencao.status === 'Em andamento'"
            class="action-btn btn-success"
          >
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Marcar como Concluída
          </button>

          <button
            @click="cancelar"
            v-if="manutencao.status === 'Agendada'"
            class="action-btn btn-danger"
          >
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Cancelar Manutenção
          </button>
        </div>

        <!-- Footer Info -->
        <div class="footer-info" v-if="manutencao.createdAt">
          <div class="footer-item">
            <svg class="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="footer-text">Criado em {{ formatarData(manutencao.createdAt) }}</span>
          </div>
          <div class="footer-item" v-if="manutencao.updatedAt">
            <svg class="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span class="footer-text">Atualizado em {{ formatarData(manutencao.updatedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useManutencaoStore } from '../stores/manutencao';

const props = defineProps({
  manutencao: { type: Object, required: true }
});

const emit = defineEmits(['close', 'atualizado']);
const manutencaoStore = useManutencaoStore();

function formatarData(data) {
  if (!data) return 'N/A';
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function statusClass(status) {
  const classes = {
    'Agendada': 'status-agendada',
    'Em andamento': 'status-andamento',
    'Concluída': 'status-concluida',
    'Cancelada': 'status-cancelada'
  };
  return classes[status] || 'status-default';
}

function statusIconClass(status) {
  const classes = {
    'Agendada': 'icon-blue',
    'Em andamento': 'icon-orange',
    'Concluída': 'icon-green',
    'Cancelada': 'icon-red'
  };
  return classes[status] || 'icon-gray';
}

async function concluir() {
  if (confirm('Marcar esta manutenção como concluída?')) {
    try {
      await manutencaoStore.updateManutencao(props.manutencao._id, {
        status: 'Concluída'
      });
      emit('atualizado');
      emit('close');
    } catch (e) {
      alert('Erro ao atualizar manutenção');
    }
  }
}

async function cancelar() {
  if (confirm('Tem certeza que deseja cancelar esta manutenção?')) {
    try {
      await manutencaoStore.updateManutencao(props.manutencao._id, {
        status: 'Cancelada'
      });
      emit('atualizado');
      emit('close');
    } catch (e) {
      alert('Erro ao cancelar manutenção');
    }
  }
}
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal Card */
.modal-card {
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  animation: slideUp 0.3s ease;
  backdrop-filter: blur(20px);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(99, 102, 241, 0.05);
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #a5b4fc;
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

.close-button {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.close-icon {
  width: 20px;
  height: 20px;
}

/* Content */
.modal-content {
  padding: 2rem;
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.5);
}

/* Status Card */
.status-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.status-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.status-icon {
  width: 32px;
  height: 32px;
  color: #fff;
}

.icon-blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.icon-orange { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }
.icon-green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.icon-red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.icon-gray { background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); }

.status-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-label {
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 500;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  width: fit-content;
}

.status-agendada {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.status-andamento {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-concluida {
  background: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-cancelada {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* Info Grid */
.info-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  gap: 1.25rem;
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 24px;
  height: 24px;
  color: #fff;
}

.card-icon.purple { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); }
.card-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.card-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-label {
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Description Box */
.description-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.description-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.description-icon {
  width: 20px;
  height: 20px;
  color: #6366f1;
}

.description-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e5e7eb;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.description-text {
  color: #9ca3af;
  line-height: 1.7;
  margin: 0;
}

/* Action Section */
.action-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #fff;
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

/* Footer Info */
.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.footer-text {
  font-size: 0.8rem;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-card {
    max-width: 100%;
    margin: 0.5rem;
    border-radius: 20px;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .status-card {
    flex-direction: column;
    text-align: center;
  }

  .action-section {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1rem;
  }

  .header-badge {
    font-size: 0.65rem;
    padding: 0.4rem 0.8rem;
  }

  .card-value {
    font-size: 1.125rem;
  }
}
</style>