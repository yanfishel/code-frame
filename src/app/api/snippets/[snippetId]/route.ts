import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/src/lib/prisma';
import { withAuth } from '@/src/lib/with-auth';


async function getSnippet(_: NextRequest, { params }: { params: Promise<{ snippetId: string }> }) {
  const id = (await params).snippetId;

  try {

    const user = await auth();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const snippet = await prisma.snippet.findFirst({where:{id,userId:id}});

    return new Response(JSON.stringify(snippet), {
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

async function updateSnippet(
  request: Request,
  { params }: { params: Promise<{ snippetId: string }> }
) {
  const snippetId = (await params).snippetId;
  const body = await request.json();

  if(snippetId !== body.id) {
    return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400 })
  }

  try {
    const user = await auth();
    if (!user || !user.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const content = JSON.stringify(body);

    const snippet = await prisma.snippet.upsert({
      where: { id: body.id },
      update: {
        name: body.name,
        content,
        updatedAt: new Date(),
      },
      create: {
        id: body.id,
        userId: user.userId,
        name: body.name,
        content,
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(snippet), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await prisma.$disconnect();
    //process.exit(1);
    return new Response(null, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export const GET = withAuth(getSnippet);
export const POST = withAuth(updateSnippet);
