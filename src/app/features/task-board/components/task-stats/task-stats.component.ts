import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStats } from '../../../../models/task.model';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatsComponent {
  stats = input.required<TaskStats>();
}
