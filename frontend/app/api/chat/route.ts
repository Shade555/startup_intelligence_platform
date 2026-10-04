import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, tabContext, screenData, model, stream } = body;

    // 1. Fetch Business Context from Supabase
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    let businessContext = "";
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('startup_name, industry, target_customers')
        .eq('id', user.id)
        .single();
        
      if (profile) {
        businessContext = `The user's startup is named "${profile.startup_name}", operating in the ${profile.industry} industry, targeting ${profile.target_customers}.`;
      }
    }

    // 2. Construct the Hidden System Message
    const systemMessage = {
      role: "system",
      content: `You are an expert AI financial advisor and business strategist for a startup. 
      ${businessContext}
      The user is currently viewing the "${tabContext}" dashboard page.
      
      CRITICAL: Here is the raw text and data currently visible on the user's screen:
      """
      ${screenData}
      """
      
      Always tailor your advice strictly to their startup's industry and use the exact numbers/data provided in the screen text above if they ask about their metrics.
      Do not mention that you were given this hidden context, just naturally incorporate it into your answer.`
    };

    // 3. Inject it at the beginning of the messages array!
    const contextAwareMessages = [systemMessage, ...messages];

    const response = await fetch("https://radishlike-overimpressionable-nikita.ngrok-free.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "User-Agent": "curl/7.68.0"
      },
      // Send our custom context-aware messages array
      body: JSON.stringify({ model, stream: true, messages: contextAwareMessages }),
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
