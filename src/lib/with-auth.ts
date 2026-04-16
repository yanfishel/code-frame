import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';


type Handler = (req: NextRequest, context?: any) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {

    const user = await auth();

    if (!user || !user.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    context.user = user;

    // If authenticated, call the original handler
    return handler(req, context);
  };
}
