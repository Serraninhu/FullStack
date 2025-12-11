import express from 'express';
import Manutencao from '../models/Manutencao.js';
import Maquina from '../models/Maquina.js';
const router = express.Router();
/**
 * @swagger
 * /api/manutencoes:
 *   get:
 *     tags: [Manutenções]
 *     summary: Buscar todas as manutenções do usuário
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de manutenções
 *       401:
 *         description: Usuário não autenticado
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const maquinasDoUsuario = await Maquina.find({ usuario: userId }).select('_id');
    const maquinaIds = maquinasDoUsuario.map(m => m._id);
    const manutencoes = await Manutencao.find({ maquina: { $in: maquinaIds } })
      .populate('maquina', 'name type status')
      .sort({ dataAgendada: -1 });
    
    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenções' });
  }
});
/**
 * @swagger
 * /api/manutencoes/{id}:
 *   get:
 *     tags: [Manutenções]
 *     summary: Buscar manutenção por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da manutenção
 *       404:
 *         description: Manutenção não encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const manutencao = await Manutencao.findById(req.params.id)
      .populate('maquina', 'name type status');
    
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }
    
    res.json(manutencao);
  } catch (error) {
    console.error('Erro ao buscar manutenção:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenção' });
  }
});

/**
 * @swagger
 * /api/manutencoes:
 *   post:
 *     tags: [Manutenções]
 *     summary: Criar nova manutenção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - maquina
 *               - dataAgendada
 *               - tecnico
 *               - descricao
 *               - userId
 *             properties:
 *               maquina:
 *                 type: string
 *               dataAgendada:
 *                 type: string
 *                 format: date-time
 *               tecnico:
 *                 type: string
 *               descricao:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Manutenção criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  try {
    const { maquina, dataAgendada, tecnico, descricao, userId } = req.body;
    if (!maquina || !dataAgendada || !tecnico || !descricao) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios' 
      });
    }

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const maquinaExiste = await Maquina.findOne({ _id: maquina, usuario: userId });
    if (!maquinaExiste) {
      return res.status(404).json({ error: 'Máquina não encontrada ou não pertence ao usuário' });
    }
    if (maquinaExiste.status !== 'Parada') {
      return res.status(400).json({ 
        error: 'Apenas máquinas com status "Parada" podem ter manutenção agendada' 
      });
    }
    const dataManutencao = new Date(dataAgendada);
    const agora = new Date();
    if (dataManutencao < agora) {
      return res.status(400).json({ 
        error: 'A data da manutenção deve ser futura' 
      });
    }
    const novaManutencao = new Manutencao({
      maquina,
      dataAgendada,
      tecnico,
      descricao,
      status: 'Agendada',
      usuarioCriador: userId
    });

    await novaManutencao.save();
    maquinaExiste.status = 'Em manutenção';
    await maquinaExiste.save();
    const manutencaoPopulada = await Manutencao.findById(novaManutencao._id)
      .populate('maquina', 'name type status');

    res.status(201).json(manutencaoPopulada);
  } catch (error) {
    console.error('Erro ao criar manutenção:', error);
    res.status(500).json({ error: 'Erro ao criar manutenção' });
  }
});

/**
 * @swagger
 * /api/manutencoes/{id}:
 *   put:
 *     tags: [Manutenções]
 *     summary: Atualizar manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Manutenção atualizada
 *       404:
 *         description: Manutenção não encontrada
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, dataAgendada, tecnico, descricao } = req.body;

    const manutencao = await Manutencao.findById(id).populate('maquina');
    
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }
    if (dataAgendada) manutencao.dataAgendada = dataAgendada;
    if (tecnico) manutencao.tecnico = tecnico;
    if (descricao) manutencao.descricao = descricao;
    if (status) {
      manutencao.status = status;
      if (status === 'Concluída') {
        const maquina = await Maquina.findById(manutencao.maquina._id);
        if (maquina) {
          maquina.status = 'Funcionando';
          await maquina.save();
        }
      }
      if (status === 'Cancelada') {
        const maquina = await Maquina.findById(manutencao.maquina._id);
        if (maquina) {
          maquina.status = 'Parada';
          await maquina.save();
        }
      }
    }

    await manutencao.save();
    const manutencaoAtualizada = await Manutencao.findById(id)
      .populate('maquina', 'name type status');

    res.json(manutencaoAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar manutenção:', error);
    res.status(500).json({ error: 'Erro ao atualizar manutenção' });
  }
});

/**
 * @swagger
 * /api/manutencoes/{id}:
 *   delete:
 *     tags: [Manutenções]
 *     summary: Deletar manutenção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Manutenção deletada
 *       404:
 *         description: Manutenção não encontrada
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const manutencao = await Manutencao.findById(id).populate('maquina');
    
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }
    if (manutencao.status === 'Agendada' || manutencao.status === 'Em andamento') {
      const maquina = await Maquina.findById(manutencao.maquina._id);
      if (maquina && maquina.status === 'Em manutenção') {
        maquina.status = 'Parada';
        await maquina.save();
      }
    }

    await Manutencao.findByIdAndDelete(id);

    res.json({ message: 'Manutenção deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar manutenção:', error);
    res.status(500).json({ error: 'Erro ao deletar manutenção' });
  }
});

/**
 * @swagger
 * /api/manutencoes/maquina/{maquinaId}:
 *   get:
 *     tags: [Manutenções]
 *     summary: Buscar manutenções por máquina
 *     parameters:
 *       - in: path
 *         name: maquinaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de manutenções da máquina
 */
router.get('/maquina/:maquinaId', async (req, res) => {
  try {
    const manutencoes = await Manutencao.find({ maquina: req.params.maquinaId })
      .populate('maquina', 'name type status')
      .sort({ dataAgendada: -1 });
    
    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenções' });
  }
});

/**
 * @swagger
 * /api/manutencoes/status/{status}:
 *   get:
 *     tags: [Manutenções]
 *     summary: Buscar manutenções por status
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de manutenções com o status especificado
 */
router.get('/status/:status', async (req, res) => {
  try {
    const manutencoes = await Manutencao.find({ status: req.params.status })
      .populate('maquina', 'name type status')
      .sort({ dataAgendada: -1 });
    
    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenções' });
  }
});

export default router;