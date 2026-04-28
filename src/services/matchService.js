import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  getTeamById,
} from '../repositories/matchRepository.js';

export const createMatchService = async (
  { homeTeamId, awayTeamId, matchDate, location, homeScore, awayScore },
  userId
) => {
  if (!homeTeamId || !awayTeamId || !matchDate || !location) {
    const error = new Error('Missing required fields.');
    error.statusCode = 400;
    throw error;
  }

  if (homeTeamId === awayTeamId) {
    const error = new Error('Home and away teams must be different.');
    error.statusCode = 400;
    throw error;
  }

  const homeTeam = await getTeamById(homeTeamId);
  const awayTeam = await getTeamById(awayTeamId);

  if (!homeTeam || !awayTeam) {
    const error = new Error('One or both teams do not exist.');
    error.statusCode = 404;
    throw error;
  }

  return createMatch({
    homeTeamId,
    awayTeamId,
    matchDate: new Date(matchDate),
    location,
    homeScore: homeScore ?? 0,
    awayScore: awayScore ?? 0,
    createdBy: userId,
  });
};

export const getAllMatchesService = async () => {
  return getAllMatches();
};

export const getMatchByIdService = async (id) => {
  const match = await getMatchById(id);
  if (!match) {
    const error = new Error('Match does not exist.');
    error.statusCode = 404;
    throw error;
  }
  return match;
};

export const updateMatchService = async (id, data) => {
  const existing = await getMatchById(id);
  if (!existing) {
    const error = new Error('Match does not exist.');
    error.statusCode = 404;
    throw error;
  }

  return updateMatch(id, data);
};

export const deleteMatchService = async (id) => {
  const existing = await getMatchById(id);
  if (!existing) {
    const error = new Error('Match does not exist.');
    error.statusCode = 404;
    throw error;
  }

  return deleteMatch(id);
};