import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json(
      { text: "Error calling AI" },
      { status: 500 }
    );
  }
}