# Smart Task Board

A modern, responsive Kanban-style task management application built with **Angular 21**, **Signals**, and **Tailwind CSS 4**.

## Key Features

- **Kanban Workflow**: Visualize tasks across "To-Do", "In Progress", and "Completed" columns.
- **Drag & Drop**: Intuitively move tasks between columns to update their status.
- **Task Management**: Create, edit, and delete tasks with a clean, dialog-based interface.
- **Search**: Instantly filter tasks by title using a search bar.
- **Task Statistics**: View at-a-glance summaries of task distribution (To-Do vs Pending vs Completed).

## Technical Stack

- **Framework**: [Angular 21](https://angular.dev/) (Standalone Components, Signals for state management)
- **UI Components**: [Angular Material](https://material.angular.io/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime**: Node.js v20.19.5

## Project Structure

The project follows a feature-based structure for better maintainability:

```text
src/app/
├── features/
│   └── task-board/          # Main Kanban board feature
│       ├── components/      # Feature-specific components (task-item, task-list, etc.)
│       └── task-board.ts    # Main feature component
├── models/                  # Shared data models
└── services/                # Business logic and state management (TaskService)
```

## Getting Started

### Development Server

To start a local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
