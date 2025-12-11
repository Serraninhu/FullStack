import express from "express";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { connectDB } from "./config/mongo.js";
import { setupSwagger } from "./config/swagger.js";
import maquinaRouter from "./routes/maquinas.routes.js";
import usuarioRouter from "./routes/usuarios.routes.js";
import manutencaoRouter from "./routes/manutencao.routes.js";

// Carrega variáveis de ambiente ANTES de tudo
config();

// Para usar __dirname com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());           
app.use(express.json());  
app.use(morgan("dev"));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Função async para iniciar o servidor
const startServer = async () => {
  try {
    // Conecta ao MongoDB
    await connectDB();
    
    // Configura Swagger
    setupSwagger(app);
    
    // ========== ROTAS ==========
    
    // Rota raiz -> carrega index.html
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });
    
    // Rota para autenticar com Google
    app.post("/auth/google", async (req, res) => {
      try {
        const { token } = req.body;
        
        if (!token) {
          return res.status(400).json({ error: "Token não enviado" });
        }
        
        // Valida token chamando Google
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Retorna dados do usuário
        res.json({
          name: response.data.name,
          email: response.data.email,
          picture: response.data.picture,
        });
        
      } catch (err) {
        console.error("Erro na autenticação Google:", err.message);
        res.status(401).json({ error: "Token inválido ou expirado" });
      }
    });
    
    // Rotas da API
    app.use("/api/maquinas", maquinaRouter);
    app.use("/api/usuarios", usuarioRouter);
    app.use("/api/manutencoes", manutencaoRouter);
    
    // Rota 404 para rotas não encontradas
    app.use((req, res) => {
      res.status(404).json({ error: "Rota não encontrada" });
    });
    
    // Inicia o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 API rodando em http://localhost:${PORT}`);
      console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
      console.log(`🔐 Autenticação Google disponível em /auth/google`);
    });
    
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

startServer();