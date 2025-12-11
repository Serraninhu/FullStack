const bcrypt = require('bcrypt');
const saltRounds = 10;

class Auth {
  constructor(db) {
    this.db = db;
  }

  
  async register(userData) {
    try {
      const { name, email, password, role } = userData;

     
      if (!name || !email || !password) {
        return {
          success: false,
          error: 'Todos os campos são obrigatórios'
        };
      }

      const [existente] = await this.db.query(
        'SELECT id FROM usuarios WHERE email = ?',
        [email]
      );

      if (existente.length > 0) {
        return {
          success: false,
          error: 'Email já cadastrado'
        };
      }
      const senhaHash = await bcrypt.hash(password, saltRounds);

      const [result] = await this.db.query(
        'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, senhaHash, role || 'Usuario']
      );

      return {
        success: true,
        message: 'Usuário criado com sucesso',
        userId: result.insertId
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        error: 'Erro ao criar usuário'
      };
    }
  }
  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Validações
      if (!email || !password) {
        return {
          success: false,
          error: 'Email e senha são obrigatórios'
        };
      }

      const [usuarios] = await this.db.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );

      if (usuarios.length === 0) {
        return {
          success: false,
          error: 'Credenciais inválidas'
        };
      }

      const usuario = usuarios[0];
      const senhaValida = await bcrypt.compare(password, usuario.password);

      if (!senhaValida) {
        return {
          success: false,
          error: 'Credenciais inválidas'
        };
      }
      return {
        success: true,
        usuario: {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          role: usuario.role
        }
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        error: 'Erro ao realizar login'
      };
    }
  }
}

module.exports = Auth;