import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

interface TransactionRecord {
  _id: ObjectId;
  userId: ObjectId;
  userEmail: string;
  cryptoType: string;
  cryptoAmount: number;
  usdAmount: number;
  walletAddress: string;
  proofFile: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export const GET = async (req: Request) => {
  let client;
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Database operations
    client = simpleMongoClient();
    await client.connect();

    const db = client.db(process.env.APP_DB ?? "trading");
    const transactions = db.collection<TransactionRecord>("transactions");

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const crypto = searchParams.get('crypto');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query filter
    const filter: any = { userEmail: session.user.email };
    if (status) filter.status = status;
    if (crypto) filter.cryptoType = crypto;

    // Get transactions with pagination
    const userTransactions = await transactions
      .find(filter)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination info
    const totalCount = await transactions.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: userTransactions.map(transaction => ({
        ...transaction,
        _id: transaction._id.toString(), // Convert ObjectId to string
        createdAt: transaction.createdAt.toISOString(),
        updatedAt: transaction.updatedAt.toISOString()
      })),
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (err) {
    console.error("Get transactions error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch transactions",
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};