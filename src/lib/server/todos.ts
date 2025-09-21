// Simple in-memory todo store for demo purposes. In production, replace with a DB.
// This module runs on the server only (placed under src/lib/server/).

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

let todos: Todo[] = [
  {
    id: crypto.randomUUID(),
    title: 'Try the Hello World page',
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60
  },
  {
    id: crypto.randomUUID(),
    title: 'Build a beautiful Todo list',
    completed: true,
    createdAt: Date.now() - 1000 * 60 * 30
  }
];

export function getTodos(): Todo[] {
  // Return a copy to avoid accidental mutation from callers
  return [...todos].sort((a, b) => a.createdAt - b.createdAt);
}

export function addTodo(title: string): Todo {
  const trimmed = title.trim();
  if (!trimmed) throw new Error('Title cannot be empty');
  const todo: Todo = {
    id: crypto.randomUUID(),
    title: trimmed,
    completed: false,
    createdAt: Date.now()
  };
  todos = [...todos, todo];
  return todo;
}

export function toggleTodo(id: string): Todo | undefined {
  let updated: Todo | undefined;
  todos = todos.map((t) => {
    if (t.id === id) {
      updated = { ...t, completed: !t.completed };
      return updated;
    }
    return t;
  });
  return updated;
}

export function deleteTodo(id: string): void {
  todos = todos.filter((t) => t.id !== id);
}

export function clearCompleted(): void {
  todos = todos.filter((t) => !t.completed);
}
