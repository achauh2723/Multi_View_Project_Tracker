import { useState } from "react"

function KanbanColumn({ column, children, count, moveTask }: any){

  const [isOver,setIsOver] = useState(false)

  function handleDragOver(e:any){
    e.preventDefault()     // REQUIRED for drop to work
    setIsOver(true)
  }

  function handleDragLeave(){
    setIsOver(false)
  }

  function handleDrop(e:any){

    e.preventDefault()

    const taskId = e.dataTransfer.getData("taskId")

    if(taskId){
      moveTask(taskId, column.status)
    }

    setIsOver(false)
  }

  return(

    <div

      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}

      style={{
        flex: 1,
        minWidth: "260px",
        width:"300px",
        background:isOver ? "#e8f0fe" : "#f5f5f5",
        padding:"12px",
        borderRadius:"8px",
        transition:"background 0.2s ease"
      }}
    >

      <h3>
        {column.title} ({count})
      </h3>

      {children}

      {children.length===0 && (
        <div style={{padding:"20px",color:"#999"}}>
          No tasks here
        </div>
      )}

    </div>

  )
}

export default KanbanColumn