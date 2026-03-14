import { Component, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task, TaskStatus } from '../../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  taskService = inject(TaskService);

  tasks = input.required<Task[]>();
  listId = input.required<string>();
  title = input<string>();
  connectedTo = input<string[]>([]);

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Reordering in the same list
      const tasks = [...this.taskService.tasks()];
      const item = event.container.data[event.previousIndex];
      const actualPreviousIndex = tasks.findIndex((t) => t.id === item.id);

      moveItemInArray(tasks, actualPreviousIndex, event.currentIndex);
      this.taskService.reorderTasks(tasks);
    } else {
      // Moving between lists
      const task = event.item.data as Task;
      const statusMap: { [key: string]: TaskStatus } = {
        'todo-list': 'todo',
        'inprogress-list': 'inprogress',
        'completed-list': 'completed',
      };

      const targetStatus = statusMap[event.container.id];
      if (targetStatus) {
        this.taskService.updateTaskStatus(task.id, targetStatus);
      }
    }
  }

  updateTask(event: { id: string; title: string; description?: string }) {
    this.taskService.updateTask(event.id, { title: event.title, description: event.description });
  }
}
