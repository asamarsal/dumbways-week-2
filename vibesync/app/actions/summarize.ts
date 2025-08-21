"use server";

type SummarizeParams = {
  text: string;
};

export async function summarizeFromGemini({ text }: SummarizeParams) {
  const safeText = (text || "").trim();

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `ringkaslah dari teks panjang ini menjadi poin-poin penting:\n\n${safeText}`,
          },
        ],
      },
    ],
  };

  // Log payload yang akan dikirim
  console.log("Payload to Gemini API:", JSON.stringify(payload, null, 2));

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

  const rawJson = await res.clone().json();
  // Log response mentah dari API
  console.log("Raw response from Gemini API:", JSON.stringify(rawJson, null, 2));

  if (!res.ok) {
    throw new Error(JSON.stringify(rawJson));
  }

  return rawJson;
}