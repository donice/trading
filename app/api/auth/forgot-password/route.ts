import { NextResponse } from 'next/server';
import { simpleMongoClient } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const client = simpleMongoClient();
    await client.connect();
    const db = client.db(process.env.APP_DB ?? 'trading');
    const users = db.collection('users');

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists with this email, a reset link will be sent' },
        { status: 200 }
      );
    }

    // Create reset token (expires in 1 hour)
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await users.updateOne(
      { _id: user._id },
      { $set: { resetToken, resetTokenExpiry } }
    );

    // Send email (implement your email service)
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: 'Password reset link sent to your email' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Forgot password error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}