import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { withAuth } from '@/src/lib/with-auth';
import { T_RequestBodyWithAuth } from '@/src/types';


type T_HandlerBody = T_RequestBodyWithAuth<{ snippetId: string }>;

async function getSnippet(_: NextRequest, { user, params }:T_HandlerBody) {
  const snippetId = (await params)?.snippetId;

  try {
    const snippet = await prisma.snippet.findFirst({ where: { id: snippetId, userId: user.userId } });

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


async function updateSnippet( request: Request, { user, params }:T_HandlerBody ) {
  const snippetId = (await params)?.snippetId;
  const body = await request.json();

  if(snippetId !== body.id || body.userId !== user.userId) {
    return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400 })
  }

  try {
    const content = JSON.stringify(body);

    const snippet = await prisma.snippet.upsert({
      where: { id: body.id, userId: user.userId },
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
    return new Response(null, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function deleteSnippet(_: NextRequest, { user, params }: T_HandlerBody) {
  const userId = user.userId;

  try {
    const snippetId = (await params)?.snippetId;
    if (!snippetId ) {
      return new NextResponse(JSON.stringify({ error: 'Bad Request' }), { status: 400 });
    }
    const deleted = await prisma.snippet.delete({ where: { id: snippetId, userId } });
    if(deleted){
      return new NextResponse(null, { status: 204 });
    }
    return new NextResponse(JSON.stringify({ error: 'Bad Request' }), { status: 400 });
  } catch (error) {
    await prisma.$disconnect();
    return new NextResponse(null, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export const GET = withAuth(getSnippet);
export const POST = withAuth(updateSnippet);
export const DELETE = withAuth(deleteSnippet);
