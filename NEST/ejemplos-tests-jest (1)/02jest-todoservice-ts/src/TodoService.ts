// src/TodoService.ts
export type Todo = {
  id: number;
  text: string;
  done: boolean;
  createdAt: number;
};

/**
 * Servicio mínimo para manejar una lista de tareas (solo lógica).
 * - Persiste en localStorage con la clave 'todos' por defecto.
 */
export default class TodoService {
  private todos: Todo[] = [];
  private storageKey = 'todos';

  constructor() {
    this.load();
  }

  getAll(): Todo[] {
    return [...this.todos];
  }

  add(text: string): Todo {
    const now = Date.now();
    const todo: Todo = {
      id: now + Math.floor(Math.random() * 1000),
      text: text.trim(),
      done: false,
      createdAt: now
    };
    this.todos.push(todo);
    this.save();
    return todo;
  }

  toggle(id: number): Todo | undefined {
    const t = this.todos.find((x) => x.id === id);
    if (!t) return undefined;
    t.done = !t.done;
    this.save();
    return t;
  }

  remove(id: number): boolean {
    const idx = this.todos.findIndex((x) => x.id === id);
    if (idx === -1) return false;
    this.todos.splice(idx, 1);
    this.save();
    return true;
  }

  clearCompleted(): number {
    const before = this.todos.length;
    this.todos = this.todos.filter((t) => !t.done);
    const removed = before - this.todos.length;
    if (removed > 0) this.save();
    return removed;
  }

  private save(): void {
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    } catch {
      // en un entorno restringido localStorage puede fallar; lo ignoramos aquí
    }
  }

  private load(): void {
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return;
      this.todos = JSON.parse(raw) as Todo[];
    } catch {
      this.todos = [];
    }
  }

  // helper para tests/uso: cambiar clave de almacenamiento
  setStorageKey(k: string) {
    this.storageKey = k;
    this.load();
  }
}
