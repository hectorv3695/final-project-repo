import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  getTeamById,
  getPlayerByTeamAndJerseyNumber,
} from '../repositories/playerRepository.js';

export const createPlayerService = async (
  { name, position, jerseyNumber, age, teamId },
  userId
) => {
  if (!name || !position || jerseyNumber === undefined || age === undefined || !teamId) {
    const error = new Error(
      'Name, position, jerseyNumber, age, and teamId are required.'
    );
    error.statusCode = 400;
    throw error;
  }

  const team = await getTeamById(teamId);
  if (!team) {
    const error = new Error('Team does not exist.');
    error.statusCode = 404;
    throw error;
  }

  const existingPlayer = await getPlayerByTeamAndJerseyNumber(teamId, jerseyNumber);
  if (existingPlayer) {
    const error = new Error('Jersey number already exists on this team.');
    error.statusCode = 409;
    throw error;
  }

  return createPlayer({
    name,
    position,
    jerseyNumber,
    age,
    teamId,
    createdBy: userId,
  });
};

export const getAllPlayersService = async () => {
  return getAllPlayers();
};

export const getPlayerByIdService = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error('ID is invalid.');
    error.statusCode = 400;
    throw error;
  }

  const player = await getPlayerById(id);
  if (!player) {
    const error = new Error('Player does not exist.');
    error.statusCode = 404;
    throw error;
  }

  return player;
};

export const updatePlayerService = async (
  id,
  { name, position, jerseyNumber, age, teamId }
) => {
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error('ID is invalid.');
    error.statusCode = 400;
    throw error;
  }

  if (!name || !position || jerseyNumber === undefined || age === undefined || !teamId) {
    const error = new Error(
      'Name, position, jerseyNumber, age, and teamId are required.'
    );
    error.statusCode = 400;
    throw error;
  }

  const existingPlayer = await getPlayerById(id);
  if (!existingPlayer) {
    const error = new Error('Player does not exist.');
    error.statusCode = 404;
    throw error;
  }

  const team = await getTeamById(teamId);
  if (!team) {
    const error = new Error('Team does not exist.');
    error.statusCode = 404;
    throw error;
  }

  const duplicateJersey = await getPlayerByTeamAndJerseyNumber(teamId, jerseyNumber);
  if (duplicateJersey && duplicateJersey.id !== id) {
    const error = new Error('Jersey number already exists on this team.');
    error.statusCode = 409;
    throw error;
  }

  return updatePlayer(id, {
    name,
    position,
    jerseyNumber,
    age,
    teamId,
  });
};

export const deletePlayerService = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error('ID is invalid.');
    error.statusCode = 400;
    throw error;
  }

  const existingPlayer = await getPlayerById(id);
  if (!existingPlayer) {
    const error = new Error('Player does not exist.');
    error.statusCode = 404;
    throw error;
  }

  return deletePlayer(id);
};