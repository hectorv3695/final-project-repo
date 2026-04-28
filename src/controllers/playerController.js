import {
  createPlayerService,
  getAllPlayersService,
  getPlayerByIdService,
  updatePlayerService,
  deletePlayerService,
} from '../services/playerService.js';

export const createPlayer = async (req, res, next) => {
  try {
    const player = await createPlayerService(req.body, req.user.id);
    res.status(201).json(player);
  } catch (error) {
    next(error);
  }
};

export const getAllPlayers = async (req, res, next) => {
  try {
    const players = await getAllPlayersService();
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

export const getPlayerById = async (req, res, next) => {
  try {
    const player = await getPlayerByIdService(Number(req.params.id));
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
};

export const updatePlayer = async (req, res, next) => {
  try {
    const player = await updatePlayerService(Number(req.params.id), req.body);
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
};

export const deletePlayer = async (req, res, next) => {
  try {
    const player = await deletePlayerService(Number(req.params.id));
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
};