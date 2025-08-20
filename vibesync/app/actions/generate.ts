"use server";

export async function generateFromGemini(text: string) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GOOGLE_API_KEY!
      },
      body: JSON.stringify({
        contents: [
            { 
                parts: 
                [
                    {
                        text
                    }
                ] 
            }
        ],
      }),
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
