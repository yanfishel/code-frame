import 'server-only'

import { prisma } from './prisma';


export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
}

