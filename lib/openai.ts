import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is missing');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate actionable business insights based on analytics data and a user prompt.
 */
export async function generateBusinessInsights(analyticsData: any, prompt: string) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are an expert business consultant specialized in SaaS metrics. Analyze the provided data and give strategic advice.',
      },
      {
        role: 'user',
        content: `Data: ${JSON.stringify(analyticsData)}\n\nPrompt: ${prompt}`,
      },
    ],
    temperature: 0.7,
    stream: true,
  });

  return response;
}

/**
 * Generate a comprehensive business report of a specific type.
 */
export async function generateReport(type: string, analyticsData: any) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an automated report generator. Create a professional ${type} report for a business owner.`,
      },
      {
        role: 'user',
        content: `Business Data for the period: ${JSON.stringify(analyticsData)}`,
      },
    ],
    temperature: 0.5,
  });

  return {
    content: response.choices[0].message.content,
    usage: response.usage,
  };
}
