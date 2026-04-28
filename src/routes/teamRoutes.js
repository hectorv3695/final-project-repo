import express from 'express';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} from '../controllers/teamController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();

router.get('/', getAllTeams);
router.get('/:id', getTeamById);

router.post('/', authMiddleware, requireRole('ADMIN'), createTeam);
router.put('/:id', authMiddleware, requireRole('ADMIN'), updateTeam);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteTeam);

export default router;