// app/api/games/[gameId]/comments/route.js
import { connectToDatabase } from "@/lib/db";
import Comment from "@/lib/models/Comment";

export async function GET(req, { params }) {
  await connectToDatabase();

  const { gameId } = params;
  const comments = await Comment.find({ gameId }).sort({ createdAt: 1 });

  return Response.json(comments);
}

export async function POST(req, { params }) {
  await connectToDatabase();

  const { gameId } = params;
  const body = await req.json();

  if (!body.user || !body.text) {
    return new Response(JSON.stringify({ error: "Missing user or text" }), {
      status: 400,
    });
  }

  const comment = new Comment({
    gameId,
    user: body.user,
    text: body.text,
  });

  await comment.save();

  return Response.json(comment);
}
