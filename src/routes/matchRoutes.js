import express from 'express';
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} from '../controllers/matchController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();

router.get('/', getAllMatches);
router.get('/:id', getMatchById);

router.post('/', authMiddleware, requireRole('ADMIN'), createMatch);
router.put('/:id', authMiddleware, requireRole('ADMIN'), updateMatch);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteMatch);

export default router;