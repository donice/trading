import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (req: Request) => {
  try {
    // Get the session using your auth configuration
    const session = await getServerSession(authOptions);

    console.log(session);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_email = session.user.email;


    const client = simpleMongoClient();
    await client.connect();

    const db = client.db(process.env.APP_DB ?? "trading");
    const users = db.collection("users");

    const user = await users.findOne(
      { email: user_email },
      { projection: { balance: 1 } }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ensure balance structure exists with default values
    const balance = {
      total: user.balance?.total || 0,
      btc: user.balance?.btc || 0,
      eth: user.balance?.eth || 0,
      usdt: user.balance?.usdt || 0,
    };

    return NextResponse.json({ data: balance, message: "Fetched successfully" }, { status: 200 });
  } catch (err) {
    console.error("Get balance error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
