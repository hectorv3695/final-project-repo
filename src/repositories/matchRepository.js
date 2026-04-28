import prisma from './prismaClient.js';

export const createMatch = (data) => {
  return prisma.match.create({
    data,
  });
};

export const getAllMatches = () => {
  return prisma.match.findMany({
    orderBy: { id: 'asc' },
  });
};

export const getMatchById = (id) => {
  return prisma.match.findUnique({
    where: { id },
  });
};

export const updateMatch = (id, data) => {
  return prisma.match.update({
    where: { id },
    data,
  });
};

export const deleteMatch = (id) => {
  return prisma.match.delete({
    where: { id },
  });
};

export const getTeamById = (id) => {
  return prisma.team.findUnique({
    where: { id },
  });
};