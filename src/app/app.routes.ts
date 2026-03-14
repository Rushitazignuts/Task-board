import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'board',
    loadComponent: () =>
      import('./features/task-board/task-board.component').then(
        (m) => m.TaskBoardComponent
      ),
  },
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];
