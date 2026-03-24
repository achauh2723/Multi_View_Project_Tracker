import { useRef, useState, useMemo } from "react"
import { useTaskStore } from "../../store/taskStore"

const ROW_HEIGHT = 44
const BUFFER = 6
const VIEWPORT_HEIGHT = 500

function ListView(){

  const tasks = useTaskStore((state)=>state.tasks)
  const moveTask = useTaskStore((state)=>state.moveTask)

  const containerRef = useRef<HTMLDivElement>(null)

  const [scrollTop,setScrollTop] = useState(0)

  const [sortField,setSortField] = useState<string>("")
  const [sortDir,setSortDir] = useState<"asc"|"desc">("asc")

  function toggleSort(field:string){

    if(sortField === field){
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    }else{
      setSortField(field)
      setSortDir("asc")
    }

  }

  const sortedTasks = useMemo(()=>{

    const sorted = [...tasks]

    if(!sortField) return sorted

    sorted.sort((a:any,b:any)=>{

      let valA = a[sortField]
      let valB = b[sortField]

      if(sortField === "dueDate"){
        valA = new Date(valA).getTime()
        valB = new Date(valB).getTime()
      }

      if(valA < valB) return sortDir === "asc" ? -1 : 1
      if(valA > valB) return sortDir === "asc" ? 1 : -1
      return 0

    })

    return sorted

  },[tasks,sortField,sortDir])

  const totalHeight = sortedTasks.length * ROW_HEIGHT

  const startIndex =
    Math.max(
      0,
      Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
    )

  const endIndex =
    Math.min(
      sortedTasks.length,
      Math.ceil(
        (scrollTop + VIEWPORT_HEIGHT) / ROW_HEIGHT
      ) + BUFFER
    )

  const visibleTasks =
    sortedTasks.slice(startIndex,endIndex)

  function handleScroll(){

    if(!containerRef.current) return

    setScrollTop(containerRef.current.scrollTop)

  }

  return(

    <div style={{marginTop:"40px"}}>

      <h2>Task List</h2>

      {/* Header Row */}
      <div
        style={{
          display:"flex",
          fontWeight:"bold",
          borderBottom:"2px solid #ccc",
          padding:"8px 12px"
        }}
      >

        <div
          style={{width:"140px",cursor:"pointer"}}
          onClick={()=>toggleSort("title")}
        >
          Title
        </div>

        <div style={{width:"120px"}}>Assignee</div>

        <div
          style={{width:"100px",cursor:"pointer"}}
          onClick={()=>toggleSort("priority")}
        >
          Priority
        </div>

        <div style={{width:"120px"}}>Status</div>

        <div
          style={{cursor:"pointer"}}
          onClick={()=>toggleSort("dueDate")}
        >
          Due Date
        </div>

      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height:VIEWPORT_HEIGHT,
          overflowY:"auto",
          border:"1px solid #ddd"
        }}
      >

        <div style={{height:totalHeight,position:"relative"}}>

          {visibleTasks.map((task,index)=>{

            const actualIndex = startIndex + index

            return(

              <div
                key={task.id}
                style={{
                  position:"absolute",
                  top:actualIndex * ROW_HEIGHT,
                  left:0,
                  right:0,
                  height:ROW_HEIGHT,
                  display:"flex",
                  alignItems:"center",
                  padding:"0 12px",
                  borderBottom:"1px solid #eee",
                  background:"#fff"
                }}
              >

                <div style={{width:"140px"}}>
                  {task.title}
                </div>

                <div style={{width:"120px"}}>
                  {task.assignee}
                </div>

                <div style={{width:"100px"}}>
                  {task.priority}
                </div>

                {/* Inline Status Change */}
                <div style={{width:"120px"}}>

                  <select
                    value={task.status}
                    onChange={(e)=>
                      moveTask(
                        task.id,
                        e.target.value as "todo" | "inprogress" | "review" | "done"
                      )
                    }
                  >

                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>

                  </select>

                </div>

                <div>
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}

export default ListView