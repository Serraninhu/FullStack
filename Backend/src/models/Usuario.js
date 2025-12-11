import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UsuarioSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: function() {
        // Senha é obrigatória apenas se não for login do Google
        return !this.loginGoogle;
      }
    },
    role: { 
      type: String, 
      enum: ["Admin", "Usuario"], 
      default: "Usuario" 
    },
    foto: {
      type: String,
      default: null
    },
    loginGoogle: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// MIDDLEWARE: Criptografa senha antes de salvar
UsuarioSchema.pre('save', async function(next) {
  console.log('Hook pre(save) executado!');
  console.log('isModified(password):', this.isModified('password'));
  console.log('loginGoogle:', this.loginGoogle);
  console.log('Senha antes:', this.password);
  
  // Se for login do Google e não tem senha, pula criptografia
  if (this.loginGoogle && !this.password) {
    console.log('⏭️  Login do Google sem senha, pulando criptografia');
    return next();
  }
  
  // Só criptografa se a senha foi modificada ou é nova
  if (!this.isModified('password')) {
    console.log('⏭️  Senha não modificada, pulando criptografia');
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('✅ Senha criptografada:', this.password.substring(0, 20) + '...');
    next();
  } catch (error) {
    console.error('❌ Erro ao criptografar:', error);
    next(error);
  }
});

// MÉTODO: Compara senha com hash
UsuarioSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('Comparando senhas...');
  console.log('loginGoogle:', this.loginGoogle);
  
  // Se for login do Google e não tem senha, retorna false
  if (this.loginGoogle && !this.password) {
    console.log('❌ Tentativa de login com senha em conta Google');
    return false;
  }
  
  try {
    const result = await bcrypt.compare(candidatePassword, this.password);
    console.log('Senha válida:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao comparar senha:', error);
    return false;
  }
};

export default mongoose.model("Usuario", UsuarioSchema);