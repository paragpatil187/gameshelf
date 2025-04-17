import { connectToDatabase } from "@/lib/db";
import Game from "@/models/Game";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const games = await Game.find({});
    return res.status(200).json(games);
  }

  if (req.method === "POST") {
    try {
      const newGame = new Game(req.body);
      await newGame.save();
      return res.status(201).json(newGame);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
