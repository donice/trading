// app/api/admin/transactions/route.ts
import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

interface Transaction {
  _id: ObjectId;
  userId: ObjectId;
  userEmail: string;
  userName: string;
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
    // Admin authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    client = simpleMongoClient();
    await client.connect();

    const db = client.db(process.env.APP_DB ?? "trading");
    const users = db.collection("users");

    // Verify admin role
    const adminUser = await users.findOne({
      email: session.user.email,
      role: 'admin'
    });
    if (!adminUser) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // Get all transactions with user details
    const transactions = await db.collection("transactions")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userEmail",
            foreignField: "email",
            as: "user"
          }
        },
        { $unwind: "$user" },
        {
          $project: {
            _id: 1,
            userId: 1,
            userEmail: 1,
            userName: "$user.name",
            cryptoType: 1,
            cryptoAmount: 1,
            usdAmount: 1,
            walletAddress: 1,
            proofFile: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1
          }
        },
        { $sort: { createdAt: -1 } }
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      data: transactions
    });

  } catch (err) {
    console.error("Admin transactions error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transactions" },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};