import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

interface DepositData {
  crypto: string;
  cryptoAddress: string;
  usdAmount: string;
  cryptoAmount: string;
  proofFile: string;
}

interface TransactionRecord {
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

export const POST = async (req: Request) => {
  let client;
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) { // Also check for email
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const { crypto, cryptoAddress, usdAmount, cryptoAmount, proofFile }: DepositData = await req.json();

    if (!crypto || !cryptoAddress || !usdAmount || !cryptoAmount || !proofFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Database operations
    client = simpleMongoClient();
    await client.connect();

    const db = client.db(process.env.APP_DB ?? "trading");
    const transactions = db.collection<TransactionRecord>("transactions");
    const users = db.collection("users");

    // Get user ID and email
    const user = await users.findOne(
      { email: session.user.email },
      { projection: { _id: 1, email: 1 } } // Include email in projection
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create transaction record
    const newTransaction: TransactionRecord = {
      userId: user._id,
      userEmail: user.email, // Add user email to the transaction
      cryptoType: crypto,
      cryptoAmount: parseFloat(cryptoAmount),
      usdAmount: parseFloat(usdAmount),
      walletAddress: cryptoAddress,
      proofFile,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert transaction
    const result = await transactions.insertOne(newTransaction);

    return NextResponse.json(
      {
        success: true,
        transactionId: result.insertedId,
        message: "Deposit submitted for review",
        data: {
          crypto,
          cryptoAmount: newTransaction.cryptoAmount,
          usdAmount: newTransaction.usdAmount,
          status: 'pending'
        }
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("Deposit submission error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process deposit",
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};