import { connectToDatabase } from "@/lib/db";
import Game from "@/models/Game";

export default async function handler(req, res) {
  await connectToDatabase();
  const popularGames = await Game.find({ isPopular: true });
  res.status(200).json(popularGames);
}
