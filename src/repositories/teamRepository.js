import prisma from './prismaClient.js';

export const createTeam = (data) => {
  return prisma.team.create({
    data,
  });
};

export const getAllTeams = () => {
  return prisma.team.findMany({
    orderBy: { id: 'asc' },
  });
};

export const getTeamById = (id) => {
  return prisma.team.findUnique({
    where: { id },
  });
};

export const getTeamByName = (name) => {
  return prisma.team.findUnique({
    where: { name },
  });
};

export const updateTeam = (id, data) => {
  return prisma.team.update({
    where: { id },
    data,
  });
};

export const deleteTeam = (id) => {
  return prisma.team.delete({
    where: { id },
  });
};