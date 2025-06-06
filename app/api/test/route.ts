// app/api/test-email/route.ts
import { NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';

export async function GET() {
  try {
    await sendPasswordResetEmail('doniceubaru1@gmail.com', 'test-token');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Complete error stack:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    );
  }
}