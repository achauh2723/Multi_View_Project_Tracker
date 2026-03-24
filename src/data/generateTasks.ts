import type { Task } from "../types/task.ts"

const users = ["Aryan","Riya","Sam","John","Aman","Sara"]
const priorities = ["critical","high","medium","low"]
const statuses = ["todo","inprogress","review","done"]

export function generateTasks(count:number):Task[] {

  const tasks:Task[] = []

  for(let i=1;i<=count;i++){

    const due = new Date()
    due.setDate(due.getDate() + Math.floor(Math.random()*20)-10)

    tasks.push({
     id: String(i),
     title: "Task " + i,
     assignee: users[Math.floor(Math.random()*users.length)],
     status: statuses[Math.floor(Math.random()*statuses.length)] as any,
     priority: priorities[Math.floor(Math.random()*priorities.length)] as any,
     startDate: new Date().toISOString(),
     dueDate: due.toISOString()
    })
  }

  return tasks
}