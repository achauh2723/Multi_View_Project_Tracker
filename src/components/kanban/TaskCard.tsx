import { useRef } from "react"

function TaskCard({ task }: any) {

  const cardRef = useRef<HTMLDivElement | null>(null)

  const due = new Date(task.dueDate)
  const today = new Date()

  const diff = Math.floor(
    (today.getTime() - due.getTime()) /
    (1000 * 60 * 60 * 24)
  )

  function handleDragStart(e:any){

    if(!cardRef.current) return

    cardRef.current.classList.add("dragging")

    e.dataTransfer.setData("taskId", String(task.id))
    e.dataTransfer.setData("fromStatus", task.status)
    e.dataTransfer.effectAllowed = "move"
  }

  function handleDragEnd(){

    if(!cardRef.current) return

    cardRef.current.classList.remove("dragging")
  }

  const users = ["A","B","C","D"]

  const viewers =
    users.slice(
      0,
      Math.floor(Math.random()*3)+1
    )

  return(

    <div
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="task-card"
      style={{
        background:"#ffffff",
        padding:"12px",
        marginBottom:"12px",
        borderRadius:"8px",
        border:"1px solid #e5e7eb",
        boxShadow:"0 1px 3px rgba(0,0,0,0.08)",
        cursor:"grab"
      }}
    >

      {/* Task Title */}
      <strong
        style={{
          fontSize:"14px",
          display:"block",
          marginBottom:"4px"
        }}
      >
        {task.title}
      </strong>

      {/* Divider */}
      <div
        style={{
          height:"1px",
          background:"#f1f5f9",
          margin:"6px 0"
        }}
      />

      {/* Assignee */}
      <p
        style={{
          fontSize:"13px",
          margin:"0 0 6px 0",
          color:"#374151"
        }}
      >
        {task.assignee}
      </p>

      {/* Priority Badge */}
      <span
        style={{
          padding:"4px 10px",
          borderRadius:"12px",
          color:"white",
          fontSize:"11px",
          fontWeight:"500",
          display:"inline-block",
          background:
            task.priority==="critical"
              ?"red"
              :task.priority==="high"
              ?"orange"
              :task.priority==="medium"
              ?"blue"
              :"green"
        }}
      >
        {task.priority}
      </span>

      {/* Due Date */}
      <div
        style={{
          marginTop:"6px",
          fontSize:"12px"
        }}
      >

        {diff===0 && <span>Due Today</span>}

        {diff>0 &&
          <span style={{color:"red"}}>
            {diff} days overdue
          </span>
        }

        {diff<0 &&
          <span>{due.toLocaleDateString()}</span>
        }

      </div>

      {/* Collaboration Avatars */}
      <div
        style={{
          display:"flex",
          gap:"4px",
          marginTop:"8px"
        }}
      >

        {viewers.slice(0,2).map((u:any,i:number)=>(

          <div
            key={i}
            style={{
              width:"20px",
              height:"20px",
              borderRadius:"50%",
              background:"#1976d2",
              color:"white",
              fontSize:"12px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border:"2px solid white",
              marginLeft:i===0?"0":"-6px"
            }}
          >
            {u}
          </div>

        ))}

        {viewers.length>2 &&
          <div
            style={{
              fontSize:"12px",
              marginLeft:"4px",
              color:"#555"
            }}
          >
            +{viewers.length-2}
          </div>
        }

      </div>

    </div>
  )
}

export default TaskCard