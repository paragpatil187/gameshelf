// src/app/api/games/route.js
import { connectToDatabase } from "@/lib/db";
import Game from "@/models/Game";
import { NextResponse } from "next/server";

// GET method: fetch games
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("search");

    let games;
    if (query) {
      const regex = new RegExp(query, "i");
      games = await Game.find({
        $or: [
          { title: { $regex: regex } },
          { genres: { $regex: regex } },
        ],
      });
    } else {
      games = await Game.find({});
    }

    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

// POST method: create new game
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const newGame = new Game(body);
    await newGame.save();

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}
