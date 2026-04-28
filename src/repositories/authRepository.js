import prisma from './prismaClient.js';

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};