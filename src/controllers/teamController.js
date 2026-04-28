import {
  createTeamService,
  getAllTeamsService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
} from '../services/teamService.js';

export const createTeam = async (req, res, next) => {
  try {
    const team = await createTeamService(req.body, req.user.id);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await getAllTeamsService();
    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

export const getTeamById = async (req, res, next) => {
  try {
    const team = await getTeamByIdService(Number(req.params.id));
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const team = await updateTeamService(Number(req.params.id), req.body);
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    const team = await deleteTeamService(Number(req.params.id));
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};