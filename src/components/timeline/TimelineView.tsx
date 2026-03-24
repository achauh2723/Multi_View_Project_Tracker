import { useTaskStore } from "../../store/taskStore"

function TimelineView(){

  const tasks = useTaskStore((state)=>state.tasks)

  const startOfMonth = new Date()
  startOfMonth.setDate(1)

  /* TODAY MARKER */

  const today = new Date()

  const todayOffset =
    (today.getTime() - startOfMonth.getTime()) /
    (1000 * 60 * 60 * 24)

  function getOffset(date:string){

    const d = new Date(date)

    const diff =
      (d.getTime() - startOfMonth.getTime()) /
      (1000 * 60 * 60 * 24)

    return diff

  }

  return(

    <div style={{marginTop:"60px"}}>

      <h2>Timeline View</h2>

      <div style={{overflowX:"auto"}}>

        <div
          style={{
            minWidth:"1200px",
            position:"relative"
          }}
        >

          {/* TODAY VERTICAL LINE */}

          <div
            style={{
              position:"absolute",
              left:todayOffset * 20,
              top:0,
              bottom:0,
              width:"2px",
              background:"red"
            }}
          />

          {tasks.slice(0,50).map((task)=>{

            const start = task.startDate
              ? getOffset(task.startDate)
              : getOffset(task.dueDate)

            const end = getOffset(task.dueDate)

            const width = (end - start + 1) * 20

            return(

              <div
                key={task.id}
                style={{
                  position:"relative",
                  height:"30px",
                  marginBottom:"10px"
                }}
              >

                {/* TIMELINE BAR */}

                <div
                  style={{
                    position:"absolute",
                    left:start * 20,
                    width:width,
                    height:"20px",
                    background:
                      task.priority==="critical"
                        ?"red"
                        :task.priority==="high"
                        ?"orange"
                        :task.priority==="medium"
                        ?"blue"
                        :"green"
                  }}
                />

                {/* TASK TITLE */}

                <span style={{marginLeft:"5px"}}>
                  {task.title}
                </span>

                {/* DUE DATE LABEL */}

                <span
                  style={{
                    marginLeft:"10px",
                    fontSize:"12px",
                    color:"#555"
                  }}
                >
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}

export default TimelineView