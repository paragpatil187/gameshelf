import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/db";

// GET /api/admin/games/[id] - Get a specific game
export async function GET(request, { params }) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Connect to database
    const { db } = await connectToDatabase();

    // Get game
    const game = await db
      .collection("games")
      .findOne({ _id: new ObjectId(id) });

    if (!game) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error fetching game:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/admin/games/[id] - Update a game
export async function PUT(request, { params }) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

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

    // Add updated date
    const updatedGame = {
      ...gameData,
      updatedAt: new Date(),
    };

    // Update game
    const result = await db
      .collection("games")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedGame });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    // Return the updated game
    return NextResponse.json({
      id,
      ...updatedGame,
    });
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/games/[id] - Delete a game
export async function DELETE(request, { params }) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Connect to database
    const { db } = await connectToDatabase();

    // Delete game
    const result = await db
      .collection("games")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Game deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
