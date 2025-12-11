<template>
  <div class="service-page">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>
    
    <div class="container">
      
      <!-- Header -->
      <div class="header">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          SOLUÇÕES INDUSTRIAIS
        </div>
        <h1 class="title">Nossos Serviços</h1>
        <p class="subtitle">
          Soluções completas de manutenção industrial para seus equipamentos
        </p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="index" 
          class="service-card"
        >
          <div class="card-icon" :class="getIconClass(index)">
            <div v-html="service.icon"></div>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <ul class="features-list">
            <li v-for="(feature, idx) in service.features" :key="idx" class="feature-item">
              <span class="checkmark">✓</span>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="cta-section">
        <div class="cta-content">
          <div class="cta-badge">
            <span class="pulse-dot"></span>
            OFERTA ESPECIAL
          </div>
          <h2 class="cta-title">Pronto para começar?</h2>
          <p class="cta-text">
            Entre em contato e conheça a melhor solução para sua empresa.
            Agende uma demonstração gratuita com nossos especialistas.
          </p>
          <button class="cta-button">
            Falar com Especialista
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          <p class="cta-note">✓ Sem compromisso • ✓ Suporte dedicado • ✓ Consultoria gratuita</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicePage',
  data() {
    return {
      services: [
        {
          title: "Manutenção Preventiva",
          icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>`,
          description: "Previna problemas antes que aconteçam com verificações sistemáticas e programadas dos seus equipamentos.",
          features: [
            "Agendamento automático",
            "Checklists personalizados",
            "Alertas programados",
            "Controle de peças"
          ]
        },
        {
          title: "Manutenção Corretiva",
          icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>`,
          description: "Resolva falhas e paradas não programadas de forma rápida e eficiente com nosso sistema de gestão.",
          features: [
            "Abertura rápida de chamados",
            "Priorização inteligente",
            "Rastreamento completo",
            "Análise de falhas"
          ]
        },
        {
          title: "Manutenção Preditiva",
          icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>`,
          description: "Utilize dados e análises para prever falhas antes que elas aconteçam e otimizar seus equipamentos.",
          features: [
            "Monitoramento contínuo",
            "Análise de tendências",
            "Alertas preditivos",
            "Dashboard de saúde"
          ]
        }
      ]
    }
  },
  methods: {
    getIconClass(index) {
      const classes = ['green', 'orange', 'blue'];
      return classes[index % classes.length];
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

.service-page {
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
.header {
  text-align: center;
  padding: 3rem 0 4rem;
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
  margin-bottom: 2rem;
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

.title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(90deg, #fff 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #9ca3af;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
  animation: fadeInUp 0.8s ease;
}

.service-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.service-card::before {
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

.service-card:hover::before {
  opacity: 1;
}

.service-card:hover {
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

.card-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.card-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }
.card-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.service-description {
  font-size: 1rem;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #9ca3af;
  font-size: 0.95rem;
}

.checkmark {
  color: #10b981;
  font-size: 1.2rem;
  font-weight: bold;
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  margin: 4rem 0;
  animation: fadeInUp 1s ease;
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

.btn-icon {
  width: 20px;
  height: 20px;
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

/* Responsividade */
@media (max-width: 768px) {
  .title {
    font-size: 2.25rem;
  }

  .subtitle {
    font-size: 1.125rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
    font-size: 2.25rem;
  }

  .cta-text {
    font-size: 1.125rem;
  }

  .cta-content {
    padding: 3rem 2rem;
  }
}

@media (max-width: 480px) {
  .service-page {
    padding: 1rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .cta-title {
    font-size: 1.75rem;
  }

  .cta-content {
    padding: 2rem 1.5rem;
  }
}
</style>