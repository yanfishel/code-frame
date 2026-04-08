import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { withAuth } from '@/src/lib/with-auth';
import { T_RequestBodyWithAuth } from '@/src/types';


const getSnippets = async (_:NextRequest, body: T_RequestBodyWithAuth<{}>) => {
  try {
    const { user } = body
    const snippets = await prisma.snippet.findMany({ where: { userId: user.userId } })
    return NextResponse.json(snippets)
  } catch (error) {
    console.error('Error fetching snippets:', error)
    return new NextResponse('Internal Error', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const GET = withAuth(getSnippets)