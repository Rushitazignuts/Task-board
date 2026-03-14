import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskStatsComponent } from './components/task-stats/task-stats.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TaskListComponent,
    TaskStatsComponent,
  ],
  templateUrl: './task-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {
  taskService = inject(TaskService);
  private dialog = inject(MatDialog);

  todoTasks = computed(() =>
    this.taskService.searchFilteredTasks().filter((t) => t.status === 'todo'),
  );
  inprogressTasks = computed(() =>
    this.taskService.searchFilteredTasks().filter((t) => t.status === 'inprogress'),
  );
  completedTasks = computed(() =>
    this.taskService.searchFilteredTasks().filter((t) => t.status === 'completed'),
  );

  openAddDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.addTask(result.title, result.description);
      }
    });
  }

  updateSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.taskService.searchQuery.set(query);
  }
}
