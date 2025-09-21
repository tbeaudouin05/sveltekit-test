import type { Actions, PageServerLoad } from './$types';
import { addLesson, cancelLesson, listLessons } from '$lib/server/lessons';
import { fail, type RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    lessons: listLessons()
  };
};

export const actions: Actions = {
  book: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const studentName = String(form.get('studentName') ?? '').trim();
    const date = String(form.get('date') ?? '').trim(); // YYYY-MM-DD
    const time = String(form.get('time') ?? '').trim(); // HH:mm

    try {
      addLesson({ studentName, date, time });
      return { success: true };
    } catch (e) {
      return fail(400, { message: (e as Error).message });
    }
  },
  cancel: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const id = String(form.get('id') ?? '');
    if (!id) return fail(400, { message: 'Missing id' });
    cancelLesson(id);
    return { success: true };
  }
};
