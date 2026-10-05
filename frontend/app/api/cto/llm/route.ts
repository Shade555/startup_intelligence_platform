import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { githubMetrics } = await req.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let businessContext = "";
    if (user) {
      const { data: profile } = await supabase.from("profiles").select("startup_name, industry, target_customers").eq("id", user.id).single();
      if (profile) {
        businessContext = `The startup is named "${profile.startup_name}", operating in the ${profile.industry} industry, targeting ${profile.target_customers}.`;
      }
    }

    const systemMessage = {
      role: "system",
      content: `You are an elite, highly experienced Startup CTO Agent. ${businessContext}`
    };

    const userMessage = {
      role: "user",
      content: `Analyze the following live GitHub repository metrics and generate 3 priority insights (High, Medium, Low).

RAW METRICS:
${JSON.stringify(githubMetrics, null, 2)}

INSTRUCTIONS:
1. Generate exactly 3 cards using this EXACT markdown format:

<HIGH>
**Title**
[Your concise 2-sentence analysis and recommended action here]
</HIGH>

<MEDIUM>
**Title**
[Your concise 2-sentence analysis here]
</MEDIUM>

<LOW>
**Title**
[Your concise 2-sentence observation here]
</LOW>

Keep it professional, specific to the data provided, and extremely concise. DO NOT include any other text, pleasantries, or explanations. Just the tags.`
    };

    const response = await fetch("https://radishlike-overimpressionable-nikita.ngrok-free.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "User-Agent": "curl/7.68.0"
      },
      body: JSON.stringify({ 
        model: "llama3", 
        stream: true, 
        messages: [systemMessage, userMessage] 
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: `LLM Error ${response.status}` }, { status: response.status });
    }

    // Pass stream directly back
    return new Response(response.body, { headers: { 'Content-Type': 'application/x-ndjson' } });

  } catch (error) {
    console.error("CTO LLM Route Error:", error);
    return NextResponse.json({ error: "Could not reach the AI Server." }, { status: 500 });
  }
}


