import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { Env } from '$lib/config/env';

const supabase: Handle = async ({ event, resolve }) => {
  // Attach a request-scoped Supabase client using cookies
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event.locals as any).supabase = createServerClient(Env.SUPABASE_URL, Env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  // Provide a safe session getter that validates JWT via getUser()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event.locals as any).safeGetSession = async () => {
    const {
      data: { session }
    } = await (event.locals as any).supabase.auth.getSession();
    if (!session) return { session: null, user: null };
    const {
      data: { user },
      error
    } = await (event.locals as any).supabase.auth.getUser();
    if (error) return { session: null, user: null };
    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await (event.locals as any).safeGetSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event.locals as any).session = session;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event.locals as any).user = user;

  if (!session && event.url.pathname.startsWith('/private')) {
    throw redirect(303, '/auth');
  }
  if (session && event.url.pathname === '/auth') {
    throw redirect(303, '/private');
  }
  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
