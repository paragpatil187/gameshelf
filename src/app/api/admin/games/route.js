import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/db";

// GET /api/admin/games - Get all games
export async function GET(request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Get all games
    const games = await db.collection("games").find({}).toArray();

    return NextResponse.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/admin/games - Add a new game
export async function POST(request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const gameData = await request.json();

    // Validate required fields
    if (!gameData.title || !gameData.price || !gameData.imageUrl) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Add created date
    const newGame = {
      ...gameData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert game
    const result = await db.collection("games").insertOne(newGame);

    // Return the new game with its ID
    return NextResponse.json(
      {
        id: result.insertedId,
        ...newGame,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding game:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
