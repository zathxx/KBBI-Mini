import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { search } = req.query;

    try {
      let words;
      if (search) {
        // Query database with search term
        words = await prisma.word.findMany({
          where: {
            word: {
              contains: search,
              mode: "insensitive", // To make search case-insensitive
            },
          },
        });
      } else {
        // If no search term, return all words
        words = await prisma.word.findMany();
      }
      console.log("API Response:", words); // Debugging log
      res.status(200).json(words);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const { word, meaning } = req.body;
    try {
      const newWord = await prisma.word.create({
        data: {
          word,
          meaning,
        },
      });
      res.status(201).json(newWord);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
