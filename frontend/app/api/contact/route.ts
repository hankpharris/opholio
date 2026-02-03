import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/site-settings';

// Lazy initialization to avoid build-time errors when env var is not available
let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function POST(request: Request) {
  try {
    const settings = await getSiteSettings();
    if (!settings.enableContactForm) {
      return NextResponse.json({ error: 'Contact form disabled' }, { status: 403 });
    }

    const { name, email, message } = await request.json();

    const data = await getResend().emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
} 