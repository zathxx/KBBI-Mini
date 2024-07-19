import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const words = [
    { word: "abadi", meaning: "tidak ada akhir" },
    { word: "aklamasi", meaning: "persetujuan umum tanpa pemungutan suara" },
    { word: "arbitrase", meaning: "penyelesaian sengketa di luar pengadilan" },
    { word: "dampak", meaning: "pengaruh kuat yang mendatangkan akibat" },
    { word: "deduksi", meaning: "penarikan kesimpulan dari umum ke khusus" },
    { word: "eklektik", meaning: "memilih yang terbaik dari berbagai sumber" },
    { word: "empati", meaning: "kemampuan memahami perasaan orang lain" },
    { word: "frasa", meaning: "kelompok kata yang menyatu" },
    { word: "hipotesis", meaning: "dugaan sementara yang perlu dibuktikan" },
    { word: "inklusif", meaning: "mencakup segala hal" },
  ];

  for (const word of words) {
    await prisma.word.create({
      data: word,
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
