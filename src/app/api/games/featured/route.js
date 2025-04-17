import { connectToDatabase } from "@/lib/db";
import Game from "@/models/Game";

export default async function handler(req, res) {
  await connectToDatabase();
  const featuredGames = await Game.find({ isFeatured: true });
  res.status(200).json(featuredGames);
}
