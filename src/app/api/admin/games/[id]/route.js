import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import Game from "@/models/Game";
import { connectToDatabase } from "@/lib/db";

// GET /api/admin/games/[id]
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid game ID" }, { status: 400 });
    }

    const game = await Game.findById(id);
    if (!game) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("GET game error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT /api/admin/games/[id]
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid game ID" }, { status: 400 });
    }

    const {
      title,
      genres,
      price,
      imageUrl,
      previewVideo,
      description,
      rating,
      isFeatured,
      isPopular,
      screenshots
    } = await request.json();

    // Basic validation
    if (!title || price == null) {
      return NextResponse.json({ message: "Missing required fields: title or price" }, { status: 400 });
    }

    const updatedGame = await Game.findByIdAndUpdate(
      id,
      {
        title,
        genres,
        price,
        imageUrl,
        previewVideo,
        description,
        rating,
        isFeatured,
        isPopular,
        screenshots
      },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error("PUT game error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE /api/admin/games/[id]
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid game ID" }, { status: 400 });
    }

    const deletedGame = await Game.findByIdAndDelete(id);

    if (!deletedGame) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error("DELETE game error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
