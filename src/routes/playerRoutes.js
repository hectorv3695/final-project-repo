import express from 'express';
import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from '../controllers/playerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();

router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);

router.post('/', authMiddleware, requireRole('ADMIN'), createPlayer);
router.put('/:id', authMiddleware, requireRole('ADMIN'), updatePlayer);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deletePlayer);

export default router;