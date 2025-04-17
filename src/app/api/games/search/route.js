import { connectToDatabase } from "@/lib/db";
import Game from "@/models/Game";

export default async function handler(req, res) {
  await connectToDatabase();
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: "Missing query" });

  const games = await Game.find({
    title: { $regex: query, $options: "i" },
  });

  res.status(200).json(games);
}