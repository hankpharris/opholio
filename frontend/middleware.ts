import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_ALLOWED_HEADERS = 'X-Requested-With, Content-Type, Accept, Authorization';
const DEFAULT_ALLOWED_METHODS = 'GET, POST, PUT, DELETE, OPTIONS';

function parseOrigins(value: string | undefined): string[] {
    if (!value) {
        return [];
    }
    return value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
}

function getAllowedOrigins(): string[] {
    const explicit = parseOrigins(process.env.CORS_ALLOWED_ORIGINS);
    if (explicit.length > 0) {
        return explicit;
    }

    const inferred = [
        process.env.NEXT_PUBLIC_BASE_URL,
        process.env.NEXTAUTH_URL,
        process.env.NEXTAUTH_URL_INTERNAL,
        process.env.NEXT_PUBLIC_PERSONAL_DOMAIN
            ? `https://${process.env.NEXT_PUBLIC_PERSONAL_DOMAIN}`
            : undefined,
    ];

    return inferred.filter((origin): origin is string => Boolean(origin));
}

function withCorsHeaders(response: NextResponse, origin: string, allowedOrigins: string[]) {
    if (allowedOrigins.length === 0 || !allowedOrigins.includes(origin)) {
        return response;
    }

    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Vary', 'Origin');
    response.headers.set('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    response.headers.set('Access-Control-Allow-Headers', DEFAULT_ALLOWED_HEADERS);
    return response;
}

export function middleware(request: NextRequest) {
    // Skip middleware for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const origin = request.headers.get('origin') || '';
        const allowedOrigins = getAllowedOrigins();

        if (request.method === 'OPTIONS') {
            const response = new NextResponse(null, { status: 204 });
            return withCorsHeaders(response, origin, allowedOrigins);
        }

        const response = NextResponse.next();
        return withCorsHeaders(response, origin, allowedOrigins);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Note: API routes are included to allow CORS header processing
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}; 
