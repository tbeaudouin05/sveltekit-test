// Simple in-memory lesson booking store. Replace with a real DB in production.
export type Lesson = {
  id: string;
  studentName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
  createdAt: number;
};

let lessons: Lesson[] = [];

export function listLessons(): Lesson[] {
  return [...lessons].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

export function addLesson(input: { studentName: string; date: string; time: string }): Lesson {
  const name = input.studentName.trim();
  const date = input.date.trim();
  const time = input.time.trim();
  if (!name) throw new Error('Student name is required');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Date must be YYYY-MM-DD');
  if (!/^\d{2}:\d{2}$/.test(time)) throw new Error('Time must be HH:mm');

  const lesson: Lesson = {
    id: crypto.randomUUID(),
    studentName: name,
    date,
    time,
    createdAt: Date.now()
  };
  lessons = [...lessons, lesson];
  return lesson;
}

export function cancelLesson(id: string): void {
  lessons = lessons.filter((l) => l.id !== id);
}
