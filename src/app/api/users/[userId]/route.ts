import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/src/lib/prisma';
import { withAuth } from '@/src/lib/with-auth';
import { T_RequestBodyWithAuth } from "@/src/types";


async function getUser(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  try {

    const user = await auth();
    if (!user.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const dbUser = await prisma.user.findFirst({where:{userId:id}});


    //console.log(user, dbUser);


    return new Response(JSON.stringify(dbUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);

    return new Response(null, { status: 500 });

  } finally {
    await prisma.$disconnect();
  }
}


async function updateUser(request: Request, { params }:T_RequestBodyWithAuth<{ userId: string }> ) {
  const userId = (await params)?.userId;
  const body = await request.json();

  if(userId !== body.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const user = await prisma.user.upsert({
      where: { userId },
      update: {},
      create: {
        userId: body.userId,
        email: body.email,
        name: body.name,
      }
    })
    if (!user) {
      return new Response(null, { status: 500 });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error Update User data:', error);
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

}


export const GET = withAuth(getUser);
export const POST = withAuth(updateUser);

/*

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  // e.g. Delete user with ID `id` in DB
  return new Response(null, { status: 204 });
}
*/
