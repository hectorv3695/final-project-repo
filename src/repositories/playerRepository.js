import prisma from './prismaClient.js';

export const createPlayer = (data) => {
  return prisma.player.create({
    data,
  });
};

export const getAllPlayers = () => {
  return prisma.player.findMany({
    orderBy: { id: 'asc' },
  });
};

export const getPlayerById = (id) => {
  return prisma.player.findUnique({
    where: { id },
  });
};

export const updatePlayer = (id, data) => {
  return prisma.player.update({
    where: { id },
    data,
  });
};

export const deletePlayer = (id) => {
  return prisma.player.delete({
    where: { id },
  });
};

export const getTeamById = (id) => {
  return prisma.team.findUnique({
    where: { id },
  });
};

export const getPlayerByTeamAndJerseyNumber = (teamId, jerseyNumber) => {
  return prisma.player.findFirst({
    where: {
      teamId,
      jerseyNumber,
    },
  });
};