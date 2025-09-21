import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // Example public query; will return [] if table doesn't exist or is empty.
  const { data: colors } = await supabase.from('colors').select('name').limit(5).order('name');
  return { colors: colors ?? [] };
};
