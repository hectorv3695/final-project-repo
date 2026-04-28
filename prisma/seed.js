import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'admin1',
      email: 'admin@example.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // Teams
  const charlotte = await prisma.team.create({
    data: {
      name: 'Charlotte FC',
      city: 'Charlotte',
      coachName: 'Dean Smith',
      createdBy: admin.id,
    },
  });

  const atlanta = await prisma.team.create({
    data: {
      name: 'Atlanta United',
      city: 'Atlanta',
      coachName: 'Gerardo Martino',
      createdBy: admin.id,
    },
  });

  const interMiami = await prisma.team.create({
    data: {
      name: 'Inter Miami',
      city: 'Miami',
      coachName: 'Javier Mascherano',
      createdBy: admin.id,
    },
  });

  const lafc = await prisma.team.create({
    data: {
      name: 'LAFC',
      city: 'Los Angeles',
      coachName: 'Marc Dos Santos',
      createdBy: admin.id,
    },
  });

  // Players
  await prisma.player.createMany({
    data: [
      {
        name: 'Wilfried Zaha',
        position: 'Forward',
        jerseyNumber: 10,
        age: 33,
        teamId: charlotte.id,
        createdBy: admin.id,
      },
      {
        name: 'Miguel Almiron',
        position: 'Midfielder',
        jerseyNumber: 10,
        age: 32,
        teamId: atlanta.id,
        createdBy: admin.id,
      },
      {
        name: 'Lionel Messi',
        position: 'Forward',
        jerseyNumber: 10,
        age: 38,
        teamId: interMiami.id,
        createdBy: admin.id,
      },
      {
        name: 'Heung Min Son',
        position: 'Forward',
        jerseyNumber: 7,
        age: 33,
        teamId: lafc.id,
        createdBy: admin.id,
      },
    ],
  });

  // Matches
  await prisma.match.createMany({
    data: [
      {
        homeTeamId: charlotte.id,
        awayTeamId: atlanta.id,
        matchDate: new Date('2026-04-22'),
        location: 'Bank of America Stadium',
        homeScore: 2,
        awayScore: 1,
        createdBy: admin.id,
      },
      {
        homeTeamId: interMiami.id,
        awayTeamId: lafc.id,
        matchDate: new Date('2026-04-23'),
        location: 'DRV PNK Stadium',
        homeScore: 3,
        awayScore: 2,
        createdBy: admin.id,
      },
    ],
  });

  console.log('Seed data created.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });