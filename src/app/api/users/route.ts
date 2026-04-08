import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { withAuth } from '@/src/lib/with-auth';


const getUsers = async (_: Request, __: any) => {

  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error);
    await prisma.$disconnect();
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

}


export const GET = withAuth(getUsers);