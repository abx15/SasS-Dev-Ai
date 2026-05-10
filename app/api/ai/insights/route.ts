import { auth } from '@clerk/nextjs/server';
import { generateBusinessInsights } from '@/lib/openai';
import { aiRateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const identifier = getRateLimitIdentifier(req, userId);
    const { success } = await aiRateLimit.limit(identifier);
    if (!success) return new NextResponse('AI rate limit exceeded', { status: 429 });

    const { analyticsData, prompt } = await req.json();

    const stream = await generateBusinessInsights(analyticsData, prompt);

    // Convert OpenAI stream to standard ReadableStream
    const responseStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(new TextEncoder().encode(content));
        }
        controller.close();
      },
    });

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('[AI_INSIGHTS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
