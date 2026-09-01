import { ITask } from '../models';

export const TASKS_MOCK: ITask[] = [
  {
    id: 1,
    title: 'Review pull requests',
    description:
      'Review the pending pull requests and leave feedback where necessary.',
    createdAt: '2026-08-28T08:30:00Z',
    completed: false,
    completedAt: null,
    editAt: null,
  },
  {
    id: 2,
    title: 'Update project documentation',
    description:
      'Update the README with the latest setup and development instructions.',
    createdAt: '2026-08-27T14:15:00Z',
    completed: true,
    completedAt: '2026-08-28T09:20:00Z',
    editAt: '2026-08-28T09:20:00Z',
  },
  {
    id: 3,
    title: 'Clean up unused components',
    description:
      'Identify and remove components that are no longer used by the application.',
    createdAt: '2026-08-28T07:45:00Z',
    completed: false,
    completedAt: null,
    editAt: null,
  },
  {
    id: 4,
    title: 'Prepare weekly report',
    description:
      'Summarize completed work, current progress, and blockers for the weekly report.',
    createdAt: '2026-08-26T16:40:00Z',
    completed: true,
    completedAt: '2026-08-27T10:05:00Z',
    editAt: '2026-08-27T10:05:00Z',
  },
  {
    id: 5,
    title: 'Fix login validation',
    description:
      'Investigate and fix incorrect validation messages on the login form.',
    createdAt: '2026-08-28T09:10:00Z',
    completed: false,
    completedAt: null,
    editAt: '2026-08-27T10:05:00Z',
  },
  {
    id: 6,
    title: 'Refactor authentication service',
    description:
      'Simplify the authentication service and extract reusable request logic.',
    createdAt: '2026-08-25T11:25:00Z',
    completed: true,
    completedAt: '2026-08-26T15:30:00Z',
    editAt: '2026-08-27T10:05:00Z',
  },
  {
    id: 7,
    title: 'Add loading indicators',
    description:
      'Add loading states to asynchronous operations and display appropriate spinners.',
    createdAt: '2026-08-28T10:00:00Z',
    completed: false,
    completedAt: null,
    editAt: '2026-08-27T10:05:00Z',
  },
  {
    id: 8,
    title: 'Test error handling',
    description:
      'Verify that server errors are correctly displayed to the user.',
    createdAt: '2026-08-27T09:50:00Z',
    completed: true,
    completedAt: '2026-08-27T13:45:00Z',
    editAt: '2026-08-27T10:05:00Z',
  },
  {
    id: 9,
    title: 'Improve mobile layout',
    description:
      'Check the application on smaller screens and fix responsive layout issues.',
    createdAt: '2026-08-28T06:55:00Z',
    completed: false,
    completedAt: null,
    editAt: '2026-08-27T10:05:00Z',
  },
  {
    id: 10,
    title: 'Plan next sprint',
    description:
      'Review outstanding tasks and prepare priorities for the upcoming sprint.',
    createdAt: '2026-08-24T12:20:00Z',
    completed: true,
    completedAt: '2026-08-25T09:15:00Z',
    editAt: '2026-08-27T10:05:00Z',
  },
];
