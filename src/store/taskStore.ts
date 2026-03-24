import { create } from "zustand"
import type { Task, TaskStatus } from "../types/task"
import { generateTasks } from "../data/generateTasks"

interface TaskState {
  tasks: Task[]
  moveTask: (id: string, status: TaskStatus) => void
}

function loadTasks(): Task[] {

  const stored = localStorage.getItem("tasks")

  if (stored) {
    return JSON.parse(stored)
  }

  const newTasks = generateTasks(500)

  localStorage.setItem("tasks", JSON.stringify(newTasks))

  return newTasks
}

export const useTaskStore = create<TaskState>((set) => ({

  tasks: loadTasks(),

  moveTask: (id, status) =>
    set((state) => {

      const updatedTasks = state.tasks.map((task) => {

        // ensure both ids are strings
        if (String(task.id) === String(id)) {
          return {
            ...task,
            status
          }
        }

        return task
      })

      localStorage.setItem("tasks", JSON.stringify(updatedTasks))

      return {
        tasks: updatedTasks
      }

    }),

}))