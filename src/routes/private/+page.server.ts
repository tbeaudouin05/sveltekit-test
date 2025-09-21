import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user } }) => {
  return { user };
};

export const actions: Actions = {
  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();
    throw redirect(303, '/');
  }
};
