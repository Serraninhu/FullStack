<template>
  <div class="login-page">
    <!-- Background Effects -->
    <div class="bg-grid"></div>
    <div class="bg-gradient"></div>
    
    <div class="login-container">
      <div class="login-card">
        <!-- Header -->
        <div class="login-header">
          <div class="logo-badge">
            <span class="badge-dot"></span>
            ACESSO SEGURO
          </div>
          <h1 class="login-title">Entrar no SMPM</h1>
          <p class="login-subtitle">Gerencie seus equipamentos industriais</p>
        </div>

        <!-- Alerts -->
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

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">
              <svg class="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
              </svg>
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="seu@email.com"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="senha" class="form-label">
              <svg class="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              v-model="formData.password"
              placeholder="••••••••"
              required
              minlength="6"
              class="form-input"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-submit"
          >
            <span v-if="loading" class="loading-spinner"></span>
            <span v-else>
              Acessar Plataforma
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text">ou continue com</span>
          <span class="divider-line"></span>
        </div>

        <!-- Google Sign In -->
        <div class="social-login">
          <div id="googleLoginButton"></div>
        </div>

        <!-- Footer Links -->
        <div class="login-footer">
          <p class="footer-text">
            Primeiro acesso?
            <router-link to="/cadastrar" class="footer-link">
              Criar conta gratuita
            </router-link>
          </p>
        </div>
      </div>

      <!-- Bottom Info -->
      <div class="bottom-info">
        <p>✓ Dados criptografados • ✓ Acesso seguro • ✓ Suporte 24/7</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '../stores/usuario';

const router = useRouter();
const usuariosStore = useUsuariosStore();

const formData = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

onMounted(() => {
  loadGoogleScript();
});

function loadGoogleScript() {
  if (window.google?.accounts?.id) {
    initializeGoogleSignIn();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    initializeGoogleSignIn();
  };
  document.head.appendChild(script);
}

function initializeGoogleSignIn() {
  try {
    window.google.accounts.id.initialize({
      client_id: "567626825567-7rposng4oes7gkqqhs8h8jm4a0hhmg0h.apps.googleusercontent.com",
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: true
    });

    const buttonDiv = document.getElementById("googleLoginButton");
    if (buttonDiv) {
      window.google.accounts.id.renderButton(
        buttonDiv,
        { 
          theme: "filled_black", 
          size: "large", 
          width: "100%",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left"
        }
      );
    }
  } catch (error) {
    console.error('Erro ao inicializar Google Sign-In:', error);
    errorMessage.value = 'Erro ao carregar login do Google. Tente atualizar a página.';
  }
}

async function handleSubmit() {
  errorMessage.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    const response = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.value.email,
        password: formData.value.password
      })
    });

    const result = await response.json();

    if (result.success) {
      successMessage.value = 'Login realizado com sucesso! Redirecionando...';
      
      usuariosStore.currentUser = result.usuario;
      localStorage.setItem('currentUser', JSON.stringify(result.usuario));
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      errorMessage.value = result.error || 'Email ou senha incorretos';
    }
  } catch (error) {
    errorMessage.value = 'Erro ao realizar login. Verifique sua conexão.';
    console.error('Erro no login:', error);
  } finally {
    loading.value = false;
  }
}

async function handleGoogleResponse(response) {
  console.log("🔐 Token JWT do Google recebido");
  
  try {
    errorMessage.value = '';
    successMessage.value = '';
    loading.value = true;
    
    const decodedToken = parseJwt(response.credential);
    
    if (!decodedToken || !decodedToken.email) {
      throw new Error('Token do Google inválido');
    }
    
    console.log("✅ Dados do usuário Google:", {
      nome: decodedToken.name,
      email: decodedToken.email,
      foto: decodedToken.picture ? 'Sim' : 'Não'
    });
    
    const backendResponse = await fetch('http://localhost:3000/api/usuarios/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential: response.credential,
        email: decodedToken.email,
        nome: decodedToken.name,
        picture: decodedToken.picture
      })
    });

    if (!backendResponse.ok) {
      throw new Error(`Erro no servidor: ${backendResponse.status}`);
    }

    const result = await backendResponse.json();
    console.log("📦 Resposta do backend:", result);

    if (result.success) {
      successMessage.value = 'Login com Google realizado com sucesso! Redirecionando...';
      
      usuariosStore.currentUser = result.usuario;
      localStorage.setItem('currentUser', JSON.stringify(result.usuario));
      
      console.log("✅ Usuário salvo no localStorage");
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      errorMessage.value = result.error || 'Erro ao fazer login com Google';
      console.error("❌ Erro na resposta:", result.error);
    }
  } catch (error) {
    console.error('❌ Erro ao logar com Google:', error);
    errorMessage.value = error.message || 'Erro ao fazer login com Google. Tente novamente.';
  } finally {
    loading.value = false;
  }
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}
</script>

<style scoped>
/* Base */
.login-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
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

/* Container */
.login-container {
  max-width: 480px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* Card */
.login-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease;
}

/* Header */
.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-badge {
  display: inline-flex;
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

.login-title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
}

.login-subtitle {
  color: #9ca3af;
  font-size: 1rem;
  font-weight: 400;
}

/* Alerts */
.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  animation: slideInDown 0.3s ease;
}

@keyframes slideInDown {
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
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e5e7eb;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.3px;
}

.label-icon {
  width: 16px;
  height: 16px;
  color: #6366f1;
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
.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
  position: relative;
  overflow: hidden;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.btn-submit:hover:not(:disabled) .btn-icon {
  transform: translateX(4px);
}

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider-text {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

/* Social Login */
.social-login {
  margin-bottom: 2rem;
}

#googleLoginButton {
  width: 100%;
}

/* Footer */
.login-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-text {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
}

.footer-link {
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-left: 0.25rem;
}

.footer-link:hover {
  color: #8b5cf6;
  text-decoration: underline;
}

/* Bottom Info */
.bottom-info {
  margin-top: 2rem;
  text-align: center;
}

.bottom-info p {
  color: #6b7280;
  font-size: 0.8rem;
  margin: 0;
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
  .login-card {
    padding: 2.5rem 2rem;
  }

  .login-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-title {
    font-size: 1.75rem;
  }

  .logo-badge {
    font-size: 0.65rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>