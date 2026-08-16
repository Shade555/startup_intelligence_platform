import { createBrowserClient } from "@supabase/ssr";

const missingClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({
      data: null,
      error: new Error("Supabase environment variables are missing."),
    }),
    signUp: async () => ({
      data: null,
      error: new Error("Supabase environment variables are missing."),
    }),
    signInWithOAuth: async () => ({
      data: null,
      error: new Error("Supabase environment variables are missing."),
    }),
    signOut: async () => ({ error: null }),
  },
};

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return missingClient as ReturnType<typeof createBrowserClient>;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
