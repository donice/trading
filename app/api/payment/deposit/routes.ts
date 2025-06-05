import { NextResponse } from 'next/server';
import { simpleMongoClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const { userId, asset, amount, txHash, paymentMethod } = await req.json();

    // Validate required fields
    if (!userId || !asset || !amount) {
      return NextResponse.json(
        { error: 'userId, asset, and amount are required' },
        { status: 400 }
      );
    }

    // Validate amount is positive
    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be positive' },
        { status: 400 }
      );
    }

    const client = simpleMongoClient();
    await client.connect();

    const db = client.db(process.env.APP_DB ?? 'trading');
    const users = db.collection('users');
    const transactions = db.collection('transactions');

    // Start a session for transaction
    const session = client.startSession();

    try {
      let result;
      await session.withTransaction(async () => {
        // 1. Create transaction record
        const txData = {
          userId: new ObjectId(userId),
          type: 'deposit',
          asset,
          amount,
          status: 'pending',
          txHash,
          paymentMethod,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const txResult = await transactions.insertOne(txData, { session });

        // 2. Update user balance
        const updateField = `balance.${asset.toLowerCase()}`;
        const updateOperation = {
          $inc: { [updateField]: amount },
          $set: { updatedAt: new Date() }
        };

        // For fiat deposits, also update total balance
        if (asset === 'USD' || asset === 'USDT') {
          updateOperation.$inc['balance.total'] = amount;
        }

        await users.updateOne(
          { _id: new ObjectId(userId) },
          updateOperation,
          { session }
        );

        result = {
          transactionId: txResult.insertedId,
          message: 'Deposit initiated successfully'
        };
      });

      return NextResponse.json(result, { status: 201 });
    } finally {
      await session.endSession();
    }
  } catch (err) {
    console.error('Deposit error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}