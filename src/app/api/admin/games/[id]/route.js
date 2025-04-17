import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Game from "@/models/Game";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";

// GET /api/admin/games/[id] - Get a specific game
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = params;

    const game = await Game.findById(id);

    if (!game) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error fetching game:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/games/[id] - Update a game
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = params;
    const gameData = await request.json();

    if (!gameData.title || !gameData.image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { ...gameData, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedGame) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/games/[id] - Delete a game
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = params;

    const deletedGame = await Game.findByIdAndDelete(id);

    if (!deletedGame) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Game deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
