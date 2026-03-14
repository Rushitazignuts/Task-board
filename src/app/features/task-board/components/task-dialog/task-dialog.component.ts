import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent {
  private dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  data = inject<{ task?: Task }>(MAT_DIALOG_DATA);

  taskData = {
    title: this.data.task?.title ?? '',
    description: this.data.task?.description ?? '',
  };

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskData.title.trim()) {
      this.dialogRef.close(this.taskData);
    }
  }
}
