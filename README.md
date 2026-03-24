# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
Multi-View Project Tracker UI

This project is a frontend task management interface built using React and TypeScript.
The application allows users to manage tasks through three different views while keeping a shared dataset.

The project focuses on frontend architecture, performance optimization, and custom UI behavior without using any external UI, drag-and-drop, or virtualization libraries.

The application supports:

Kanban board
Virtualized list view
Timeline / Gantt view
Live collaboration indicators
Live Demo

Add your deployed link here.

Example:

https://your-project.vercel.app
Tech Stack

Framework

React
TypeScript
Vite

State Management

Zustand

Styling

Custom CSS components (no UI libraries used)

Other Techniques

Native HTML5 Drag and Drop
Custom Virtual Scrolling
URL Query State Management
Technical Requirements Compliance
Requirement	Implementation
React with TypeScript	Implemented using Vite + React + TypeScript
No UI component libraries	All UI elements built using custom components
No drag-and-drop libraries	Implemented using native HTML5 drag events
No virtual scrolling libraries	Custom virtual scrolling implemented
State management	Zustand
Responsive layout	Works on desktop (1280px+) and tablet (768px)
Seed data	500 tasks generated with random values
Performance	Lighthouse score ≥ 85
Application Views
1. Kanban Board

The Kanban board organizes tasks into four columns:

To Do
In Progress
In Review
Done

Features:

Drag and drop cards between columns
Drop zone highlighting
Visual drag feedback (opacity + shadow)
Placeholder space while dragging
Task status updates immediately after drop

Each task card shows:

Title
Assignee avatar
Priority badge
Due date
Overdue indicator
2. List View

The List View displays all tasks in a table format.

Features:

Sorting by Title
Sorting by Priority
Sorting by Due Date
Inline status editing using dropdown
Virtual scrolling for large datasets

Only the visible rows are rendered, which keeps performance smooth even with 500 tasks.

3. Timeline View

The timeline view visualizes tasks across the current month.

Features:

Tasks displayed as horizontal bars
Bars colored based on priority
Tasks without start date appear on due date
Vertical line marking today's date
Horizontal scrolling for overflow
State Management Decision

The application uses Zustand for global state management.

Zustand was chosen because it provides a simple and lightweight API compared to more complex solutions like Redux. It allows centralized management of task data while avoiding unnecessary boilerplate code.

Since the application contains multiple views (Kanban, List, and Timeline) that all rely on the same dataset, a global store ensures that updates in one view are immediately reflected across the others.

For example, when a task is dragged to a new column in the Kanban board, the status update is stored in Zustand and automatically reflected in the List and Timeline views.

This approach keeps the architecture simple while maintaining consistent application state.

Virtual Scrolling Implementation

The List View implements a custom virtual scrolling system to handle large datasets efficiently.

Instead of rendering all tasks at once, the application calculates which rows are currently visible in the viewport based on the scroll position.

The system uses three main variables:

ROW_HEIGHT
BUFFER
VIEWPORT_HEIGHT

From the scroll position, the application computes the start index and end index of the visible tasks. Only those tasks are rendered in the DOM.

Each row is positioned using absolute positioning inside a container whose height represents the total dataset height. This preserves the correct scrollbar behavior while drastically reducing the number of rendered elements.

This method improves performance and prevents DOM overload when handling large lists.

Drag-and-Drop Implementation

The Kanban board uses the native HTML5 Drag and Drop API.

Each task card is marked as draggable, and drag events such as:

dragstart
dragover
drop
dragend

are used to manage the interaction.

When a card is dragged:

Visual feedback is provided through opacity and shadow changes
Valid drop zones are highlighted
A placeholder space is preserved to prevent layout shifts

After the drop event, the task status is updated through the Zustand store so all views remain synchronized.

Seed Data

The project includes a data generator that creates 500 tasks with randomized values.

Each task includes:

title
assignee (from a pool of 6 users)
priority
status
start date
due date

The generator also includes:

overdue tasks
tasks without start dates

This ensures edge cases are properly handled.

Lighthouse Performance

The application was tested using Chrome Lighthouse.

Performance score:

85+

Add your screenshot here:

/screenshots/lighthouse-score.png
Setup Instructions

Clone the repository:

git clone <repo-url>

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:5173
Explanation (150–250 Words)

The most challenging part of the project was implementing a custom drag-and-drop system without relying on external libraries. Native HTML5 drag events provide basic functionality but require additional logic to maintain a smooth user experience.

One key challenge was preventing layout shifts while dragging a task card. Removing the card from the layout during the drag operation can cause surrounding elements to collapse or jump. To address this, a placeholder space is preserved while the card is being dragged. This ensures that the layout remains stable and the user can clearly see where the card originated.

Another challenge was synchronizing state updates across multiple views. Since the Kanban board, List view, and Timeline view all rely on the same task dataset, updates had to be reflected immediately across all views. Using Zustand allowed the application to maintain a centralized store and update task states efficiently.

If I had more time to improve the project, I would refactor the drag-and-drop logic into reusable hooks and enhance the animation system to provide smoother visual transitions when tasks move between columns.

Author

Aryan Chauhan
MCA Student
Frontend Developer

