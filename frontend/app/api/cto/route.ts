import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { github_token, repo_name } = await req.json();

    if (!github_token || !repo_name) {
      return NextResponse.json(
        { error: "GitHub Token and Repository Name are required." },
        { status: 400 }
      );
    }

    const response = await fetch("http://127.0.0.1:8000/api/cto/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-github-token": github_token
      },
      body: JSON.stringify({ repo_name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Error from Python backend." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("CTO Proxy Error:", error);
    return NextResponse.json(
      { error: "Could not reach the CTO Python backend. Is it running?" },
      { status: 500 }
    );
  }
}
