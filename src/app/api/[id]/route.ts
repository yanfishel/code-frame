import { prisma } from '@/src/lib/prisma';


export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params)?.id;
    const snippet = await prisma.snippet.findFirst({
      where: { id },
    });

    return new Response(JSON.stringify(snippet), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(null, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}