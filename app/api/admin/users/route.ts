import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  emailVerified?: Date;
  createdAt: Date;
  wallets?: {
    btc?: string;
    eth?: string;
    usdt?: string;
  };
  isVerified: boolean;
}

export const GET = async (req: Request) => {
  let client;
  try {
    // Authentication check - only allow admins
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
    const usersCollection = db.collection<User>("users");

    // Verify requesting user is admin
    const requestingUser = await usersCollection.findOne({
      email: session.user.email,
      role: 'admin'
    });

    if (!requestingUser) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const isVerified = searchParams.get('isVerified');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build filter with proper typing
    const filter: Record<string, unknown> = {};
    if (role === 'user' || role === 'admin') {
      filter.role = role;
    }
    if (isVerified === 'true' || isVerified === 'false') {
      filter.isVerified = isVerified === 'true';
    }

    // Get users with pagination
    const users = await usersCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const totalCount = await usersCollection.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: users.map(user => ({
        ...user,
        _id: user._id?.toString(), // Convert ObjectId to string
        emailVerified: user.emailVerified?.toISOString(),
        createdAt: user.createdAt.toISOString()
      })),
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (err) {
    console.error("Get users error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};