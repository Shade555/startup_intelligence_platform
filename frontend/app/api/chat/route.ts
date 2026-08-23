import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("https://radishlike-overimpressionable-nikita.ngrok-free.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "User-Agent": "curl/7.68.0"
      },
      // Force stream to true
      body: JSON.stringify({ ...body, stream: true }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from server: ${response.status}. Make sure Colab is running.` },
        { status: response.status }
      );
    }

    // Pass the raw stream directly to the frontend!
    return new Response(response.body, {
      headers: {
        'Content-Type': 'application/x-ndjson'
      }
    });

  } catch (error) {
    console.error("Next.js Proxy Error:", error);
    return NextResponse.json(
      { error: `Next.js Error: Could not reach the AI Server.` },
      { status: 500 }
    );
  }
}
