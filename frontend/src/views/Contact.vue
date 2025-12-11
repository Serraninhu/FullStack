<template>
  <div class="contato-page">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        SUPORTE E ATENDIMENTO
      </div>
      <h1 class="hero-title">Entre em Contato</h1>
      <p class="hero-subtitle">Estamos prontos para ouvir você. Dúvidas, sugestões ou suporte técnico.</p>
    </section>

    <!-- Main Content -->
    <div class="content-container">
      <!-- Formulário de Contato -->
      <div class="form-card">
        <h2 class="card-title">Envie sua Mensagem</h2>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <!-- Nome -->
          <div class="form-group">
            <label class="form-label">Nome Completo</label>
            <input 
              v-model="formData.name"
              type="text"
              required
              class="form-input"
              placeholder="Seu nome completo"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input 
              v-model="formData.email"
              type="email"
              required
              class="form-input"
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <!-- Telefone -->
          <div class="form-group">
            <label class="form-label">Telefone</label>
            <input 
              v-model="formData.phone"
              type="tel"
              class="form-input"
              placeholder="(00) 00000-0000"
            />
          </div>

          <!-- Assunto -->
          <div class="form-group">
            <label class="form-label">Assunto</label>
            <select 
              v-model="formData.subject"
              required
              class="form-input"
            >
              <option value="">Selecione...</option>
              <option value="suporte">Suporte Técnico</option>
              <option value="duvida">Dúvida</option>
              <option value="orcamento">Orçamento</option>
              <option value="sugestao">Sugestão</option>
              <option value="reclamacao">Reclamação</option>
              <option value="elogio">Elogio</option>
            </select>
          </div>

          <!-- Mensagem -->
          <div class="form-group">
            <label class="form-label">Mensagem</label>
            <textarea 
              v-model="formData.message"
              rows="5"
              required
              class="form-input form-textarea"
              placeholder="Descreva sua mensagem aqui..."
            ></textarea>
          </div>

          <!-- Botão Submit -->
          <button type="submit" class="submit-button">
            <span>Enviar Mensagem</span>
            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <!-- Mensagem de Sucesso -->
          <p v-if="successMessage" class="success-message">
            ✔ {{ successMessage }}
          </p>
        </form>
      </div>

      <!-- Informações de Contato -->
      <div class="info-section">
        <!-- Card de Informações -->
        <div class="info-card">
          <h2 class="card-title">Informações de Contato</h2>

          <div class="info-list">
            <div v-for="info in contactInfo" :key="info.id" class="info-item">
              <div class="info-icon-wrapper" :class="getIconClass(info.id)">
                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="info.iconPath" />
                </svg>
              </div>
              <div>
                <h4 class="info-title">{{ info.title }}</h4>
                <p class="info-content">{{ info.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card de Redes Sociais -->
        <div class="social-card">
          <h3 class="social-title">Redes Sociais</h3>

          <div class="social-links">
            <a v-for="social in socialLinks" :key="social.id" :href="social.url" target="_blank" class="social-link">
              <svg class="social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="social.iconPath" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Card de Localização -->
        <div class="location-card">
          <div class="location-icon-wrapper">
            <svg class="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="location-title">Visite Nossa Sede</h3>
          <p class="location-text">
            Av. Industrial, 1000 – Distrito Industrial<br />
            Campinas, SP – CEP 13035-000
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const successMessage = ref('')

const handleSubmit = () => {
  successMessage.value = "Mensagem enviada com sucesso! Entraremos em contato em breve."

  setTimeout(() => {
    formData.value = { name: '', email: '', phone: '', subject: '', message: '' }
    successMessage.value = ''
  }, 3000)
}

const getIconClass = (id) => {
  const classes = {
    'phone': 'purple',
    'email': 'blue',
    'address': 'green',
    'hours': 'orange'
  }
  return classes[id] || 'purple'
}

const contactInfo = [
  { 
    id: 'phone', 
    title: 'Telefone', 
    content: '(00) 4002-8922',
    iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
  },
  { 
    id: 'email', 
    title: 'E-mail', 
    content: 'contato@smpm.com.br',
    iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  { 
    id: 'address', 
    title: 'Endereço', 
    content: 'Campinas - SP, Brasil',
    iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
  },
  { 
    id: 'hours', 
    title: 'Horário de Atendimento', 
    content: 'Seg-Sex 8h-18h | Sáb 9h-13h',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
]

const socialLinks = [
  { 
    id: 'linkedin', 
    url: '#',
    iconPath: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'
  },
  { 
    id: 'instagram', 
    url: '#',
    iconPath: 'M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3z M12 15.75A3.75 3.75 0 1115.75 12 3.754 3.754 0 0112 15.75zM17.5 8.5a1 1 0 111-1 1 1 0 01-1 1z'
  },
  { 
    id: 'facebook', 
    url: '#',
    iconPath: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
  },
]
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contato-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 4rem;
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

/* Hero Section */
.hero-section {
  padding: 8rem 2rem 5rem;
  text-align: center;
  position: relative;
  z-index: 1;
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

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(90deg, #fff 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #9ca3af;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Content Container */
.content-container {
  max-width: 1200px;
  margin: -3rem auto 0;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease;
}

/* Form Card */
.form-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.form-card::before {
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

.form-card:hover::before {
  opacity: 1;
}

.form-card:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

/* Form Styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #9ca3af;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: #6b7280;
}

.form-input:focus {
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.button-icon {
  width: 20px;
  height: 20px;
}

.success-message {
  text-align: center;
  color: #6ee7b7;
  font-weight: 600;
  padding: 1rem;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 12px;
  border: 2px solid rgba(16, 185, 129, 0.3);
}

/* Info Section */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card,
.social-card,
.location-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.info-card::before,
.social-card::before,
.location-card::before {
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

.info-card:hover::before,
.social-card:hover::before,
.location-card:hover::before {
  opacity: 1;
}

.info-card:hover,
.social-card:hover,
.location-card:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

/* Info List */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon-wrapper.purple { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); }
.info-icon-wrapper.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.info-icon-wrapper.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.info-icon-wrapper.orange { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }

.info-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.info-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
}

.info-content {
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Social Card */
.social-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.social-links {
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.social-link {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.social-link:hover {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-color: transparent;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.social-icon {
  width: 24px;
  height: 24px;
  color: #9ca3af;
  transition: color 0.3s ease;
}

.social-link:hover .social-icon {
  color: white;
}

/* Location Card */
.location-card {
  text-align: center;
}

.location-icon-wrapper {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
  position: relative;
  z-index: 1;
}

.location-icon {
  width: 32px;
  height: 32px;
  color: white;
}

.location-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.location-text {
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
  .content-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 1.5rem 4rem;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .form-card,
  .info-card,
  .social-card,
  .location-card {
    padding: 2rem;
  }

  .card-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-container {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .form-card,
  .info-card,
  .social-card,
  .location-card {
    padding: 1.5rem;
  }
}
</style>