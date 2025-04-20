// /app/api/admin/stats/route.js or route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Game from "@/models/Game";

export async function GET() {
  await connectToDatabase();

  const [totalUsers, totalGames] = await Promise.all([
    User.countDocuments(),
    Game.countDocuments(),
    
  ]);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const newUsersToday = await User.countDocuments({
    createdAt: { $gte: startOfToday },
  });

  return NextResponse.json({
    totalUsers,
    totalGames,
    newUsersToday,
  });
}

