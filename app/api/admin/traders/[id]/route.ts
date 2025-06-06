// app/api/admin/traders/[id]/route.ts
import { NextResponse } from "next/server";
import { simpleMongoClient } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const DELETE = async (
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

    // Delete trader
    const result = await db.collection("traders").deleteOne({
      _id: new ObjectId(params.id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Trader not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Trader deleted successfully"
    });

  } catch (err) {
    console.error("Delete trader error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete trader" },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
};