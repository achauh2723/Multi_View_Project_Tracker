import { useState } from "react"
import KanbanBoard from "./components/kanban/KanbanBoard"
import ListView from "./components/list/ListView"
import TimelineView from "./components/timeline/TimelineView"
import { useTaskStore } from "./store/taskStore"
import PresenceBar from "./components/common/PresenceBar"

function App() {

  const tasks = useTaskStore((state) => state.tasks)

  const [view,setView] = useState("kanban")

  /* LOADING STATE */

  if(!tasks.length){
    return (
      <div style={{padding:"40px"}}>
        <p>Loading tasks...</p>
      </div>
    )
  }

  return (

    <div style={{padding:"40px"}}>

      <h1
      style={{
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "4px"
      }}>Project Tracker</h1>
      <p
      style={{
        fontSize: "18px",
        fontWeight: "500",
        marginBottom: "6px"
      }}>Total Tasks: {tasks.length}</p>
      <PresenceBar />

      <div style={{
        marginBottom:"20px",
        display:"flex",
        gap:"15px"
      }}>

        <button
          onClick={()=>setView("kanban")}
          style={{
            fontWeight:view==="kanban"?"bold":"normal",
            cursor:"pointer",
            fontSize:"17px"
          }}
        >
          Kanban
        </button>

        <button
          onClick={()=>setView("list")}
          style={{
            fontWeight:view==="list"?"bold":"normal",
            cursor:"pointer",
            fontSize:"17px"
          }}
        >
          List
        </button>

        <button
          onClick={()=>setView("timeline")}
          style={{
            fontWeight:view==="timeline"?"bold":"normal",
            cursor:"pointer",
            fontSize:"17px"
          }}
        >
          Timeline
        </button>

      </div>

      {/* VIEWS */}

      {view === "kanban" && <KanbanBoard />}
      {view === "list" && <ListView />}
      {view === "timeline" && <TimelineView />}

    </div>

  )
}

export default App