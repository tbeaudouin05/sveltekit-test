import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      throw redirect(303, '/auth/error');
    }
    throw redirect(303, '/');
  },
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      throw redirect(303, '/auth/error');
    }
    throw redirect(303, '/private');
  }
};
