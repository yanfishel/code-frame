import { NextRequest, NextResponse } from 'next/server';
import { SNIPPETS_PAGE_LIMIT } from '@/src/constants';
import { prisma } from '@/src/lib/prisma';
import { withAuth } from '@/src/lib/with-auth';
import { T_RequestBodyWithAuth } from '@/src/types';


const getSnippets = async (req: NextRequest, body: T_RequestBodyWithAuth<{}>) => {
  try {
    const { user } = body;

    const params = req.nextUrl.searchParams;
    const cursor = params.get('cursor');
    const page = +(params.get('page') ?? 1);
    const limit = +(params.get('limit') ?? SNIPPETS_PAGE_LIMIT);
    const backward = !!params.get('backward');

    const skip = cursor ? 1 : (page - 1) * limit;

    const snippets = await prisma.snippet.findMany({
      take: (backward ? -1 : 1) * (limit+1),
      skip,
      ...(cursor ? { cursor: { id: cursor } } : {}),
      where: { userId: user.userId },
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    });

    const data = backward ? snippets.slice(-limit) : snippets.slice(0, limit);

    const response = {
      data,
      pagination: {
        cursor: data.length ? data[data.length - 1].id : null,
        page,
        limit,
        total: await prisma.snippet.count({ where: { userId: user.userId } }),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withAuth(getSnippets)