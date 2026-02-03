import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/site-settings';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const settings = await getSiteSettings();
    if (!settings.enableContactForm) {
      return NextResponse.json({ error: 'Contact form disabled' }, { status: 403 });
    }

    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
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