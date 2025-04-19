// app/api/games/[gameId]/ratings/route.js
import { connectToDatabase } from "@/lib/db";
import Rating from "@/models/Rating";

export async function GET(req, { params }) {
  await connectToDatabase();

  const { gameId } = params;
  const ratings = await Rating.find({ gameId });

  const average =
    ratings.reduce((sum, r) => sum + r.score, 0) / (ratings.length || 1);

  return Response.json({
    average: parseFloat(average.toFixed(1)),
    total: ratings.length,
    ratings,
  });
}

export async function POST(req, { params }) {
  await connectToDatabase();

  const { gameId } = params;
  const body = await req.json();

  if (!body.user || !body.score) {
    return new Response(JSON.stringify({ error: "Missing user or score" }), {
      status: 400,
    });
  }

  const rating = new Rating({
    gameId,
    user: body.user,
    score: body.score,
  });

  await rating.save();

  return Response.json(rating);
}
