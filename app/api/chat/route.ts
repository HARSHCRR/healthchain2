import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Log to verify environment variable is loaded
console.log("API Key exists:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: "58051f360c30441bb2dedfbbc85799ae" // Directly using the key for testing
});

export async function POST(req: Request) {
  try {
    const { messages, patientData } = await req.json();

    // Test API connection with a simple message
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Using 3.5-turbo for testing
      messages: [
        { 
          role: "system", 
          content: "You are a helpful medical assistant. Please respond with 'API test successful' followed by a brief greeting."
        },
        {
          role: "user",
          content: "Test message"
        }
      ],
      temperature: 0.7,
      max_tokens: 50,
    });

    console.log("OpenAI Response:", response.choices[0].message);

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get AI response', 
        details: error?.message || 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 