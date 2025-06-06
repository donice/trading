// app/api/admin/traders/route.ts
import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

interface Trader {
  name: string;
  role: string;
  followers: number;
  profitShare: number;
  returnRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export const POST = async (req: Request) => {
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

    // Validate request body
    const { name, role, followers, profitShare, returnRate } = await req.json();
    if (!name || !role || !followers || !profitShare || !returnRate) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create new trader
    const newTrader: Trader = {
      name,
      role,
      followers: Number(followers),
      profitShare: Number(profitShare),
      returnRate: Number(returnRate),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("traders").insertOne(newTrader);

    return NextResponse.json({
      success: true,
      data: {
        ...newTrader,
        _id: result.insertedId.toString()
      }
    });

  } catch (err) {
    console.error("Create trader error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create trader" },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};

export const GET = async () => {
  let client;
  try {
    client = simpleMongoClient();
    await client.connect();

    const db = client.db(process.env.APP_DB ?? "trading");
    const traders = await db.collection("traders")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: traders.map(trader => ({
        ...trader,
        _id: trader._id.toString(),
        createdAt: trader.createdAt.toISOString()
      }))
    });

  } catch (err) {
    console.error("Get traders error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch traders" },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};