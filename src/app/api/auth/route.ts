import { NextRequest, NextResponse } from 'next/server';

// Simple password authentication
const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        if (password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true, message: 'Authentication successful' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}
