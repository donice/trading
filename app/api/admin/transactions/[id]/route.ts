// app/api/admin/transactions/[id]/route.ts
import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  let client;
  try {
    // Admin authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    if (!['completed', 'failed'].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
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

    // Update transaction status
    const result = await db.collection("transactions").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Transaction ${status} successfully`
    });

  } catch (err) {
    console.error("Update transaction error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update transaction" },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};


export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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

    // Get single transaction with user details
    const transaction = await db.collection("transactions")
      .aggregate([
        { $match: { _id: new ObjectId(params.id) } },
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
        }
      ])
      .next();

    if (!transaction) {
      return NextResponse.json(
        { success: false, error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: transaction
    });

  } catch (err) {
    console.error("Admin single transaction error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transaction" },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};