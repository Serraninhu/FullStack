<template>
  <div class="home">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>
    
    <div class="container">
      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          TECNOLOGIA INDUSTRIAL 4.0
        </div>
        <h1 class="hero-title">
          <span class="title-main">SMPM</span>
          <span class="title-gradient">Revolucione sua Manutenção</span>
        </h1>
        <p class="hero-subtitle">
          Controle total sobre seus ativos industriais com inteligência artificial,
          análise preditiva e automação completa de processos.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="irParaLogin">
            <span>Iniciar Agora</span>
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          <button class="btn-secondary" @click="irParaSobre">
            <svg class="btn-icon-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Ver Demo
          </button>
        </div>
        
        <!-- Stats -->
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-value">99.9%</div>
            <div class="stat-label">Uptime</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">-45%</div>
            <div class="stat-label">Custos</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">+80%</div>
            <div class="stat-label">Eficiência</div>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="features-section">
        <div class="section-header">
          <span class="section-tag">RECURSOS PRINCIPAIS</span>
          <h2 class="section-title">Tudo que você precisa em uma plataforma</h2>
        </div>

        <div class="features-grid">
          <div class="feature-card card-large">
            <div class="card-icon purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="card-title">Automação Inteligente</h3>
            <p class="card-description">
              Sistema autônomo que agenda, executa e documenta manutenções sem intervenção manual.
            </p>
            <div class="card-tag">IA Integrada</div>
          </div>

          <div class="feature-card">
            <div class="card-icon blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="card-title">Analytics Avançado</h3>
            <p class="card-description">
              Visualize KPIs críticos e tome decisões baseadas em dados em tempo real.
            </p>
          </div>

          <div class="feature-card">
            <div class="card-icon orange">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="card-title">Manutenção Preditiva</h3>
            <p class="card-description">
              Algoritmos preveem falhas antes que aconteçam, economizando milhões.
            </p>
          </div>

          <div class="feature-card">
            <div class="card-icon green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="card-title">Conformidade Total</h3>
            <p class="card-description">
              Atenda normas e regulamentações com documentação automática e rastreável.
            </p>
          </div>

          <div class="feature-card">
            <div class="card-icon red">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </div>
            <h3 class="card-title">Alertas em Tempo Real</h3>
            <p class="card-description">
              Notificações instantâneas via múltiplos canais para ação imediata.
            </p>
          </div>

          <div class="feature-card card-large">
            <div class="card-icon cyan">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="card-title">Gestão Colaborativa</h3>
            <p class="card-description">
              Coordene equipes distribuídas com workflows inteligentes e comunicação integrada.
            </p>
            <div class="card-tag">Multi-usuário</div>
          </div>
        </div>
      </div>

      <!-- CTA Final -->
      <div class="cta-section">
        <div class="cta-content">
          <div class="cta-badge">
            <span class="pulse-dot"></span>
            OFERTA LIMITADA
          </div>
          <h2 class="cta-title">Pronto para o próximo nível?</h2>
          <p class="cta-text">
            Junte-se a centenas de empresas que já transformaram sua operação.
            Comece hoje com 30 dias gratuitos, sem cartão de crédito.
          </p>
          <button class="cta-button" @click="irParaLogin">
            Experimentar Gratuitamente
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          <p class="cta-note">✓ Sem compromisso • ✓ Cancelamento fácil • ✓ Suporte 24/7</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    irParaLogin() {
      this.$router.push('/login')
    },
    irParaSobre() {
      this.$router.push('/servicos')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
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
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

/* Hero Section */
.hero {
  padding: 8rem 0 6rem;
  text-align: center;
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
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease;
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

.hero-title {
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease;
}

.title-main {
  display: block;
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.title-gradient {
  display: block;
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(90deg, #fff 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #9ca3af;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.7;
  animation: fadeInUp 1s ease;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  animation: fadeInUp 1.2s ease;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-icon-left {
  width: 20px;
  height: 20px;
}

/* Hero Stats */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  animation: fadeInUp 1.4s ease;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

/* Features Section */
.features-section {
  padding: 6rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card-large {
  grid-column: span 2;
}

.feature-card::before {
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

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
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

.card-icon.purple { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); }
.card-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.card-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }
.card-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.card-icon.red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.card-icon.cyan { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }

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

.card-tag {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.375rem 0.875rem;
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  margin: 4rem 0;
}

.cta-content {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 30px;
  padding: 5rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-content::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
  animation: rotate 15s linear infinite;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: #fca5a5;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.cta-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #fff 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.cta-text {
  font-size: 1.25rem;
  color: #9ca3af;
  max-width: 650px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
  position: relative;
  z-index: 1;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  padding: 1.25rem 3rem;
  font-size: 1.125rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);
  position: relative;
  z-index: 1;
  margin-bottom: 1.5rem;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 25px 50px rgba(99, 102, 241, 0.5);
}

.cta-note {
  font-size: 0.875rem;
  color: #6b7280;
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
  .card-large {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .title-main {
    font-size: 3.5rem;
  }

  .title-gradient {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 2rem;
  }

  .stat-divider {
    width: 60%;
    height: 1px;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
    font-size: 2.25rem;
  }

  .cta-text {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 0 3rem;
  }

  .title-main {
    font-size: 2.5rem;
  }

  .title-gradient {
    font-size: 1.5rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .cta-content {
    padding: 3rem 1.5rem;
  }

  .cta-title {
    font-size: 1.75rem;
  }
}
</style>