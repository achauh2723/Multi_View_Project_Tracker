import { useTaskStore } from "../../store/taskStore"
import TaskCard from "./TaskCard"
import KanbanColumn from "./KanbanColumn"

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "inprogress" },
  { title: "Review", status: "review" },
  { title: "Done", status: "done" }
]

function KanbanBoard(){

  const tasks = useTaskStore((state)=>state.tasks)
  const moveTask = useTaskStore((state)=>state.moveTask)

  return(

    <div
      style={{
        display:"flex",
        gap:"20px",
        marginTop:"30px",
        width: "100%",
        alignItems: "flex-start"
      }}
    >

      {columns.map((column)=>{

        const columnTasks =
          tasks.filter(
            (task)=>task.status===column.status
          )

        return(

          <KanbanColumn
            key={column.status}
            column={column}
            count={columnTasks.length}
            moveTask={moveTask}
          >

            {columnTasks.slice(0,20).map((task)=>(
              <TaskCard
                key={task.id}
                task={task}
              />
            ))}

          </KanbanColumn>

        )

      })}

    </div>

  )

}

export default KanbanBoard