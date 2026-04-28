import {
  createMatchService,
  getAllMatchesService,
  getMatchByIdService,
  updateMatchService,
  deleteMatchService,
} from '../services/matchService.js';

export const createMatch = async (req, res, next) => {
  try {
    const match = await createMatchService(req.body, req.user.id);
    res.status(201).json(match);
  } catch (error) {
    next(error);
  }
};

export const getAllMatches = async (req, res, next) => {
  try {
    const matches = await getAllMatchesService();
    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }
};

export const getMatchById = async (req, res, next) => {
  try {
    const match = await getMatchByIdService(Number(req.params.id));
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const match = await updateMatchService(Number(req.params.id), req.body);
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};

export const deleteMatch = async (req, res, next) => {
  try {
    const match = await deleteMatchService(Number(req.params.id));
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};