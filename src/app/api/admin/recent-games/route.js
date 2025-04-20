// /app/api/admin/recent-games/route.js
import { connectToDatabase } from "@/lib/db";
import Game from "@/models/Game";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const games = await Game.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title createdAt image");

  return NextResponse.json(games);
}
