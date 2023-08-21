import { NextResponse } from 'next/server';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { message, language } = body;

    if (!message) {
      return new NextResponse('Message are required', { status: 400 });
    }
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
        Correct the grammatical and writing errors you find in the following text:'${message}' and please explain the errors.
        Also translate the text provided into ${language}.
        Please use this format for your response:
        Error: Explain the error,
        Correction: Error correction,
        Translation: Text translated
        `,
      temperature: 0.3,
      max_tokens: 1000,
    });

    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    console.log('[TRANSLATE POST ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
