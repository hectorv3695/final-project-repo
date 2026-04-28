import {
  createTeam,
  getAllTeams,
  getTeamById,
  getTeamByName,
  updateTeam,
  deleteTeam,
} from '../repositories/teamRepository.js';

export const createTeamService = async ({ name, city, coachName }, userId) => {
  if (!name || !city || !coachName) {
    const error = new Error('Name, city, and coachName are required.');
    error.statusCode = 400;
    throw error;
  }

  const existingTeam = await getTeamByName(name);
  if (existingTeam) {
    const error = new Error('Team name already exists.');
    error.statusCode = 409;
    throw error;
  }

  return createTeam({
    name,
    city,
    coachName,
    createdBy: userId,
  });
};

export const getAllTeamsService = async () => {
  return getAllTeams();
};

export const getTeamByIdService = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error('ID is invalid.');
    error.statusCode = 400;
    throw error;
  }

  const team = await getTeamById(id);
  if (!team) {
    const error = new Error('Team does not exist.');
    error.statusCode = 404;
    throw error;
  }

  return team;
};

export const updateTeamService = async (id, { name, city, coachName }) => {
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error('ID is invalid.');
    error.statusCode = 400;
    throw error;
  }

  if (!name || !city || !coachName) {
    const error = new Error('Name, city, and coachName are required.');
    error.statusCode = 400;
    throw error;
  }

  const existingTeam = await getTeamById(id);
  if (!existingTeam) {
    const error = new Error('Team does not exist.');
    error.statusCode = 404;
    throw error;
  }

  const duplicateName = await getTeamByName(name);
  if (duplicateName && duplicateName.id !== id) {
    const error = new Error('Team name already exists.');
    error.statusCode = 409;
    throw error;
  }

  return updateTeam(id, { name, city, coachName });
};

export const deleteTeamService = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error('ID is invalid.');
    error.statusCode = 400;
    throw error;
  }

  const existingTeam = await getTeamById(id);
  if (!existingTeam) {
    const error = new Error('Team does not exist.');
    error.statusCode = 404;
    throw error;
  }

  return deleteTeam(id);
};