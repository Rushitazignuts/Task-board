import { Component, input, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Task } from '../../../../models/task.model';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './task-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  task = input.required<Task>();
  toggle = output<string>();
  delete = output<string>();
  update = output<{ id: string; title: string; description?: string }>();

  private dialog = inject(MatDialog);

  openEditDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { task: this.task() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.update.emit({ id: this.task().id, ...result });
      }
    });
  }

  openDeleteConfirm() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Task',
        message: 'Are you sure you want to delete this task?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(this.task().id);
      }
    });
  }
}
