<template>
  <div class="dashboard-page">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>

    <div class="container">
      <!-- Header -->
      <div class="header-section">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          {{ totalMaquinas }} MÁQUINAS ATIVAS
        </div>
        <h1 class="page-title">Dashboard de Máquinas</h1>
      </div>

      <!-- Layout Principal: Cards à Esquerda, Resumo à Direita -->
      <div class="main-layout">
        <!-- Coluna Esquerda: Cards de Status -->
        <div class="summary-cards">
          <!-- Total de Máquinas -->
          <div class="summary-card card-total">
            <div class="card-icon purple">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div class="card-content">
              <p class="card-label">Total de Máquinas</p>
              <p class="card-value">{{ totalMaquinas }}</p>
            </div>
          </div>

          <!-- Funcionando -->
          <div class="summary-card status-funcionando">
            <div class="card-icon green">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="card-content">
              <p class="card-label">Funcionando</p>
              <p class="card-value value-success">{{ statusCount.funcionando }}</p>
              <p class="card-percentage">{{ getPercentage('funcionando') }}% do total</p>
            </div>
          </div>

          <!-- Paradas -->
          <div class="summary-card status-parada">
            <div class="card-icon red">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="card-content">
              <p class="card-label">Paradas</p>
              <p class="card-value value-error">{{ statusCount.parada }}</p>
              <p class="card-percentage">{{ getPercentage('parada') }}% do total</p>
            </div>
          </div>

          <!-- Em Manutenção -->
          <div class="summary-card status-manutencao">
            <div class="card-icon orange">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="card-content">
              <p class="card-label">Em Manutenção</p>
              <p class="card-value value-warning">{{ statusCount.manutencao }}</p>
              <p class="card-percentage">{{ getPercentage('manutencao') }}% do total</p>
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Resumo Detalhado -->
        <div class="summary-detailed">
          <div class="detail-card">
            <h2 class="detail-title">Resumo Detalhado</h2>
            
            <div class="detail-list">
              <!-- Funcionando -->
              <div class="detail-item detail-success">
                <span class="detail-label">Funcionando</span>
                <div class="detail-value-container">
                  <span class="detail-value">{{ statusCount.funcionando }}</span>
                  <span class="detail-percent">({{ getPercentage('funcionando') }}%)</span>
                </div>
              </div>

              <!-- Paradas -->
              <div class="detail-item detail-error">
                <span class="detail-label">Paradas</span>
                <div class="detail-value-container">
                  <span class="detail-value">{{ statusCount.parada }}</span>
                  <span class="detail-percent">({{ getPercentage('parada') }}%)</span>
                </div>
              </div>

              <!-- Em Manutenção -->
              <div class="detail-item detail-warning">
                <span class="detail-label">Em Manutenção</span>
                <div class="detail-value-container">
                  <span class="detail-value">{{ statusCount.manutencao }}</span>
                  <span class="detail-percent">({{ getPercentage('manutencao') }}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid">
        <!-- Gráfico de Pizza -->
        <div class="chart-card">
          <h2 class="chart-title">Distribuição por Status</h2>
          <div class="chart-container">
            <canvas ref="pieChart"></canvas>
          </div>
        </div>

        <!-- Gráfico Doughnut -->
        <div class="chart-card">
          <h2 class="chart-title">Status das Máquinas</h2>
          <div class="chart-container">
            <canvas ref="doughnutChart"></canvas>
          </div>
        </div>

        <!-- Gráfico de Barras (largura total) -->
        <div class="chart-card chart-wide">
          <h2 class="chart-title">Comparativo de Status</h2>
          <div class="chart-container">
            <canvas ref="barChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useMaquinaStore } from '../stores/maquina';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const maquinaStore = useMaquinaStore();
const pieChart = ref(null);
const barChart = ref(null);
const doughnutChart = ref(null);

let pieChartInstance = null;
let barChartInstance = null;
let doughnutChartInstance = null;

const totalMaquinas = computed(() => maquinaStore.totalMaquinas);

const statusCount = computed(() => {
  const count = {
    funcionando: 0,
    parada: 0,
    manutencao: 0
  };

  maquinaStore.maquinas.forEach(maq => {
    const status = maq.status.toLowerCase();
    if (status === 'funcionando') count.funcionando++;
    else if (status === 'parada') count.parada++;
    else if (status === 'em manutenção') count.manutencao++;
  });

  return count;
});

const getPercentage = (status) => {
  if (totalMaquinas.value === 0) return 0;
  return ((statusCount.value[status] / totalMaquinas.value) * 100).toFixed(1);
};

const chartColors = {
  funcionando: 'rgb(34, 197, 94)',
  parada: 'rgb(239, 68, 68)',
  manutencao: 'rgb(234, 179, 8)'
};

const createPieChart = () => {
  if (pieChartInstance) pieChartInstance.destroy();

  const ctx = pieChart.value.getContext('2d');
  pieChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Funcionando', 'Paradas', 'Em Manutenção'],
      datasets: [{
        data: [
          statusCount.value.funcionando,
          statusCount.value.parada,
          statusCount.value.manutencao
        ],
        backgroundColor: [
          chartColors.funcionando,
          chartColors.parada,
          chartColors.manutencao
        ],
        borderWidth: 2,
        borderColor: '#0a0a0f'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: { size: 12 },
            color: '#9ca3af'
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = ((value / totalMaquinas.value) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
};

const createBarChart = () => {
  if (barChartInstance) barChartInstance.destroy();

  const ctx = barChart.value.getContext('2d');
  barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Funcionando', 'Paradas', 'Em Manutenção'],
      datasets: [{
        label: 'Quantidade de Máquinas',
        data: [
          statusCount.value.funcionando,
          statusCount.value.parada,
          statusCount.value.manutencao
        ],
        backgroundColor: [
          chartColors.funcionando,
          chartColors.parada,
          chartColors.manutencao
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed.y || 0;
              const percentage = ((value / totalMaquinas.value) * 100).toFixed(1);
              return `${value} máquinas (${percentage}%)`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: '#9ca3af' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        x: {
          ticks: { color: '#9ca3af' },
          grid: { display: false }
        }
      }
    }
  });
};

const createDoughnutChart = () => {
  if (doughnutChartInstance) doughnutChartInstance.destroy();

  const ctx = doughnutChart.value.getContext('2d');
  doughnutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Funcionando', 'Paradas', 'Em Manutenção'],
      datasets: [{
        data: [
          statusCount.value.funcionando,
          statusCount.value.parada,
          statusCount.value.manutencao
        ],
        backgroundColor: [
          chartColors.funcionando,
          chartColors.parada,
          chartColors.manutencao
        ],
        borderWidth: 2,
        borderColor: '#0a0a0f'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: { size: 12 },
            color: '#9ca3af'
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = ((value / totalMaquinas.value) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
};

const updateCharts = () => {
  if (pieChart.value) createPieChart();
  if (barChart.value) createBarChart();
  if (doughnutChart.value) createDoughnutChart();
};

onMounted(async () => {
  await maquinaStore.fetchMaquina();
  setTimeout(() => {
    updateCharts();
  }, 100);
});

watch(() => maquinaStore.maquinas, () => {
  setTimeout(() => {
    updateCharts();
  }, 100);
}, { deep: true });
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-page {
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
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Header */
.header-section {
  text-align: center;
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
  font-weight: 900;
  background: linear-gradient(90deg, #fff 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Main Layout */
.main-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease;
}

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
}

.summary-card::before {
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

.summary-card:hover::before {
  opacity: 1;
}

.summary-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.card-icon {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.card-icon.purple { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); }
.card-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.card-icon.red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.card-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }

.icon {
  width: 28px;
  height: 28px;
  color: white;
}

.card-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.card-label {
  color: #9ca3af;
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  line-height: 1;
}

.value-success {
  color: #10b981;
}

.value-error {
  color: #ef4444;
}

.value-warning {
  color: #f59e0b;
}

.card-percentage {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

/* Detailed Summary */
.summary-detailed {
  display: flex;
}

.detail-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.detail-card::before {
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

.detail-card:hover::before {
  opacity: 1;
}

.detail-card:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.detail-item {
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.detail-success {
  border-color: rgba(16, 185, 129, 0.3);
}

.detail-error {
  border-color: rgba(239, 68, 68, 0.3);
}

.detail-warning {
  border-color: rgba(245, 158, 11, 0.3);
}

.detail-item:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.05);
}

.detail-success:hover {
  border-color: #10b981;
}

.detail-error:hover {
  border-color: #ef4444;
}

.detail-warning:hover {
  border-color: #f59e0b;
}

.detail-label {
  font-weight: 700;
  color: #fff;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value-container {
  text-align: right;
}

.detail-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #10b981;
  line-height: 1;
}

.detail-error .detail-value {
  color: #ef4444;
}

.detail-warning .detail-value {
  color: #f59e0b;
}

.detail-percent {
  font-size: 1rem;
  color: #9ca3af;
  margin-left: 0.5rem;
  font-weight: 600;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  animation: fadeInUp 1s ease;
}

.chart-wide {
  grid-column: span 2;
}

.chart-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.chart-card::before {
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

.chart-card:hover::before {
  opacity: 1;
}

.chart-card:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.chart-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.chart-container {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 1.5rem;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
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

/* Responsividade */
@media (max-width: 1200px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-wide {
    grid-column: span 1;
  }
  
  .chart-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .card-value,
  .detail-value {
    font-size: 2rem;
  }
}
</style>