"use server";

type GenerateParams = {
  choosemood: string;    
  message: string;       
  songCategory?: string; 
};

export async function generateFromGemini({
  choosemood,
  message,
  songCategory,
}: GenerateParams) {
  const moodSafe = (choosemood || "netral").trim();
  const msgSafe = (message || "Testing, who are u?").trim();
  const categorySafe = (songCategory || "bebas").trim();

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Kondisi saya: ${moodSafe}. Isi pesan ${msgSafe}, rekomendasikan 1 lagu ${categorySafe} dari YouTube yang cocok untuk saya (format: Judul - Artis - link URL YouTube singkat).`,
          },
        ],
      },
    ],
  };

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GOOGLE_API_KEY!,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );
  console.log("Request Payload:", JSON.stringify(payload, null, 2));

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return res.json();
}
