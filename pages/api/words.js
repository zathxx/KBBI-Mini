import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const words = await prisma.word.findMany();
    res.status(200).json(words);
  } else if (req.method === "POST") {
    const { word, meaning } = req.body;
    const newWord = await prisma.word.create({
      data: {
        word,
        meaning,
      },
    });
    res.status(201).json(newWord);
  }
}
