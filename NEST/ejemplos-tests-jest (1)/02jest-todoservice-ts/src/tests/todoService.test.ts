// src/__tests__/todoService.test.ts
import TodoService, { Todo } from '../TodoService';

describe('TodoService (unit)', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();        // limpiamos entre tests
    service = new TodoService();
    service.setStorageKey('todos'); // seguridad
  });

  test('add() crea una tarea y la persiste en localStorage', () => {
    const todo = service.add('Aprender Jest con TypeScript');
    expect(todo.id).toBeDefined();
    expect(todo.text).toBe('Aprender Jest con TypeScript');
    expect(todo.done).toBe(false);

    const all = service.getAll();
    expect(all).toHaveLength(1);

    // comprobamos que se haya guardado correctamente
    const raw = localStorage.getItem('todos');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw as string);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].text).toBe('Aprender Jest con TypeScript');
  });

  test('toggle() invierte la propiedad done y persiste', () => {
    const t = service.add('Tarea toggle');
    expect(t.done).toBe(false);

    const toggled = service.toggle(t.id);
    expect(toggled).toBeDefined();
    expect(toggled?.done).toBe(true);

    const parsed = JSON.parse(localStorage.getItem('todos') as string);
    expect(parsed[0].done).toBe(true);
  });

  test('remove() elimina y devuelve true', () => {
    const t = service.add('Tarea a eliminar');
    expect(service.getAll()).toHaveLength(1);

    const removed = service.remove(t.id);
    expect(removed).toBe(true);
    expect(service.getAll()).toHaveLength(0);
  });

  test('clearCompleted() elimina solo las completadas', () => {
    const a = service.add('t1');
    const b = service.add('t2');
    service.toggle(b.id); // marcar b como completada

    const removedCount = service.clearCompleted();
    expect(removedCount).toBe(1);
    expect(service.getAll().length).toBe(1);
    expect(service.getAll()[0].id).toBe(a.id);
  });

  test('constructor/load() lee desde localStorage', () => {
    const fake: Todo[] = [{ id: 999, text: 'desde storage', done: false, createdAt: 1 }];
    localStorage.setItem('todos', JSON.stringify(fake));
    const s2 = new TodoService();
    expect(s2.getAll()).toEqual(fake);
  });

  test('save() llama a localStorage.setItem (spy)', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    service.add('invoke save');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  // Añadir test adicionaes para las Uncovered branches//  - toggle() con id no existente
//  - remove() con id no existente
//  - clearCompleted() cuando no hay completadas
//  - constructor/load() con localStorage corrupto
//  - setStorageKey() con clave vacía o inválida

  test('toggle() con id no existente devuelve undefined', () => {
    const result = service.toggle(12345);
    expect(result).toBeUndefined();
  });
  test('remove() con id no existente devuelve false', () => {
    const result = service.remove(12345);
    expect(result).toBe(false);   
  });
  test('clearCompleted() cuando no hay completadas devuelve 0', () => {
    service.add('tarea 1');
    service.add('tarea 2');
    const result = service.clearCompleted();
    expect(result).toBe(0);
    expect(service.getAll().length).toBe(2);
  });

});
// src/TodoService.ts



