import type { Actions, PageServerLoad } from './$types';
import { addTodo, clearCompleted, deleteTodo, getTodos, toggleTodo } from '$lib/server/todos';
import { fail, type RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    todos: getTodos()
  };
};

export const actions: Actions = {
  add: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const title = String(form.get('title') ?? '').trim();
    try {
      addTodo(title);
      return { success: true };
    } catch (e) {
      return fail(400, { message: (e as Error).message });
    }
  },
  toggle: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const id = String(form.get('id') ?? '');
    if (!id) return fail(400, { message: 'Missing id' });
    toggleTodo(id);
    return { success: true };
  },
  delete: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const id = String(form.get('id') ?? '');
    if (!id) return fail(400, { message: 'Missing id' });
    deleteTodo(id);
    return { success: true };
  },
  clearCompleted: async () => {
    clearCompleted();
    return { success: true };
  }
};
