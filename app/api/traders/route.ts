// app/api/traders/route.ts
import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";

interface Trader {
  _id: string;
  name: string;
  role: string;
  followers: number;
  profitShare: number;
  returnRate: number;
  image_link: string; // Added image link
  createdAt: Date;
}

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
        createdAt: trader.createdAt.toISOString(),
        image_link: trader.image_link // Ensure image link is included
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