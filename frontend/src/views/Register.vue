<template>
  <div class="cadastro-page">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>
    
    <div class="cadastro-container">
      <div class="cadastro-card">
        <div class="cadastro-header">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            BEM-VINDO AO SMPM
          </div>
          <h1 class="cadastro-title">
            <span class="title-main">Criar Conta</span>
          </h1>
          <p class="subtitle">Preencha os dados abaixo para começar</p>
        </div>

        <!-- Mensagens -->
        <div v-if="errorMessage" class="alert alert-error">
          <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="alert alert-success">
          <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ successMessage }}
        </div>
        
        <form @submit.prevent="handleSubmit" class="cadastro-form">
          <div class="form-group">
            <label for="nome" class="form-label">Nome completo</label>
            <div class="input-wrapper">
              <input
                v-model="formData.name"
                type="text"
                id="nome"
                placeholder="Seu nome"
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <div class="input-wrapper">
              <input
                v-model="formData.email"
                type="email"
                id="email"
                placeholder="seu@email.com"
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="senha" class="form-label">Senha</label>
            <div class="input-wrapper">
              <input
                v-model="formData.password"
                type="password"
                id="senha"
                placeholder="••••••••"
                required
                minlength="6"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="confirmar-senha" class="form-label">Confirmar senha</label>
            <div class="input-wrapper">
              <input
                v-model="confirmPassword"
                type="password"
                id="confirmar-senha"
                placeholder="••••••••"
                required
                minlength="6"
                class="form-input"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="submit-button"
          >
            <span class="button-content">
              {{ loading ? 'CADASTRANDO...' : 'CADASTRAR' }}
              <svg v-if="!loading" class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </button>
        </form>

        <div class="login-link">
          <p>
            Já tem uma conta? 
            <router-link to="/login" class="link">
              Faça login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '../stores/usuario';

const router = useRouter();
const usuariosStore = useUsuariosStore();

const formData = ref({
  name: '',
  email: '',
  password: '',
  role: 'Usuario'
});

const confirmPassword = ref('');
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

async function handleSubmit() {
  errorMessage.value = '';
  successMessage.value = '';

  // Validação de senhas
  if (formData.value.password !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem';
    return;
  }

  loading.value = true;

  try {
    // Usa a store para criar usuário (seu backend já criptografa)
    const result = await usuariosStore.createUsuario(formData.value);

    if (result.success) {
      successMessage.value = 'Conta criada com sucesso! Redirecionando...';
      
      // Limpa o formulário
      formData.value = {
        name: '',
        email: '',
        password: '',
        role: 'Usuario'
      };
      confirmPassword.value = '';
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      errorMessage.value = result.error || 'Erro ao criar conta';
    }
  } catch (error) {
    errorMessage.value = 'Erro ao criar conta. Verifique sua conexão.';
    console.error('Erro no cadastro:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Background e Container Principal */
.cadastro-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
  position: relative;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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

.cadastro-container {
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 1;
}

/* Card */
.cadastro-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.6s ease;
  position: relative;
  overflow: hidden;
}

.cadastro-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%);
  pointer-events: none;
}

/* Header */
.cadastro-header {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.7rem;
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

.cadastro-title {
  margin-bottom: 0.75rem;
}

.title-main {
  display: block;
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  line-height: 1;
}

.subtitle {
  color: #9ca3af;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

/* Alerts */
.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #86efac;
}

/* Form */
.cadastro-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.form-group {
  position: relative;
}

.form-label {
  display: block;
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.625rem;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #6b7280;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input:hover:not(:focus) {
  border-color: rgba(255, 255, 255, 0.2);
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 1.125rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
  margin-top: 0.5rem;
  letter-spacing: 0.5px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.submit-button:hover:not(:disabled) .btn-icon {
  transform: translateX(4px);
}

/* Login Link */
.login-link {
  text-align: center;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
}

.login-link p {
  color: #9ca3af;
  font-size: 0.9rem;
  margin: 0;
}

.link {
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-left: 0.25rem;
}

.link:hover {
  color: #8b5cf6;
  text-decoration: underline;
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
@media (max-width: 768px) {
  .cadastro-page {
    padding: 1.5rem;
  }

  .cadastro-card {
    padding: 2.5rem;
  }

  .title-main {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .cadastro-page {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  .cadastro-card {
    padding: 2rem 1.5rem;
  }

  .title-main {
    font-size: 2rem;
  }

  .hero-badge {
    font-size: 0.65rem;
    padding: 0.4rem 1rem;
  }

  .form-input {
    padding: 0.875rem 1rem;
  }
}
</style>