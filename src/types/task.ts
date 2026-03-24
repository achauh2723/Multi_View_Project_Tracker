export type TaskStatus =
  | "todo"
  | "inprogress"
  | "review"
  | "done"

export type Priority =
  | "critical"
  | "high"
  | "medium"
  | "low"

export interface Task {
  id: string
  title: string
  assignee: string
  status: TaskStatus
  priority: Priority
  startDate?: string
  dueDate: string
}