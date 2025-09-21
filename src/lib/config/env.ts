// Centralized environment access per project rules.
// Loads from SvelteKit's $env/static/public which reads from .env files at build/dev time.
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const Env = {
  SUPABASE_URL: requireEnv('PUBLIC_SUPABASE_URL', PUBLIC_SUPABASE_URL),
  SUPABASE_ANON_KEY: requireEnv('PUBLIC_SUPABASE_PUBLISHABLE_KEY', PUBLIC_SUPABASE_PUBLISHABLE_KEY)
} as const;
