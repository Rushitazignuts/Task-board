import { Injectable, signal, computed, effect } from '@angular/core';
import { Task, TaskStatus, TaskStats } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly STORAGE_KEY = 'smart-task-board-tasks';

  // State
  private tasksSignal = signal<Task[]>(this.loadTasks());
  searchQuery = signal<string>('');

  // Computed
  tasks = computed(() => this.tasksSignal());

  searchFilteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    let tasks = this.tasksSignal();

    if (query) {
      tasks = tasks.filter((t) => t.title.toLowerCase().includes(query));
    }

    return tasks;
  });

  stats = computed<TaskStats>(() => {
    const tasks = this.tasksSignal();
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      inprogress: tasks.filter((t) => t.status === 'inprogress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    };
  });

  constructor() {
    // Sync to LocalStorage whenever tasks change
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasksSignal()));
    });
  }

  // Actions
  addTask(title: string, description?: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo',
      completed: false,
      createdAt: new Date(),
    };
    this.tasksSignal.update((tasks) => [newTask, ...tasks]);
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) {
    this.tasksSignal.update((tasks) => tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }

  deleteTask(id: string) {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  toggleTask(id: string) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, status: !t.completed ? 'completed' : 'todo' }
          : t,
      ),
    );
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, status, completed: status === 'completed' } : t)),
    );
  }

  reorderTasks(tasks: Task[]) {
    this.tasksSignal.set(tasks);
  }

  private loadTasks(): Task[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((t: any) => ({
          ...t,
          status: t.status || (t.completed ? 'completed' : 'todo'),
          createdAt: new Date(t.createdAt),
        }));
      } catch (e) {
        console.error('Error parsing stored tasks', e);
        return [];
      }
    }
    return [];
  }
}
