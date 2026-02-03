import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/auth';
import { put, del } from '@vercel/blob';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return new NextResponse('No file provided', { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return new NextResponse('File must be an image', { status: 400 });
        }

        // Upload to Vercel Blob
        const blob = await put(file.name, file, {
            access: 'public',
        });

        return NextResponse.json({ url: blob.url });
    } catch (error) {
        console.error('Error uploading file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const { url } = await request.json();
        
        if (!url) {
            return new NextResponse('No URL provided', { status: 400 });
        }

        // Delete from Vercel Blob
        await del(url);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 