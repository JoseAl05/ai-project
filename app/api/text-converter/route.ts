import { NextResponse } from 'next/server';
import axios from 'axios';

const URL = 'https://api.textgears.com';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, language } = body;

    if (!text) {
      return new NextResponse('Text is required', { status: 400 });
    }

    if (!language) {
      return new NextResponse('Language is required', { status: 400 });
    }

    const response = await axios.get(
      `${URL}/grammar?key=${process.env
        .TEXTGEARS_API_KEY}&text=${text}&language=${language}`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.log('[TEXT CONVERTER POST ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
