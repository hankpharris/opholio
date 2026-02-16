import { OpenAI } from 'openai';
import { getSiteSettings } from '@/lib/site-settings';

export async function POST(req: Request) {
  try {
    const settings = await getSiteSettings();
    if (!settings.enableChatbot) {
      return new Response('Chatbot disabled', { status: 403 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response('OPENAI_API_KEY is not configured', { status: 503 });
    }

    const { text } = await req.json();

    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const audio = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
      response_format: "mp3",
    });

    // Create a TransformStream to handle the streaming response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Process the stream
    (async () => {
      try {
        const buffer = Buffer.from(await audio.arrayBuffer());
        await writer.write(buffer);
      } catch (error) {
        console.error('Streaming error:', error);
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('TTS Error:', error);
    return new Response('Error generating speech', { status: 500 });
  }
} 