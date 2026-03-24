import { useEffect, useState } from "react"

const users = ["A","B","C","D"]

function PresenceBar(){

  const [activeUsers,setActiveUsers] = useState<string[]>([])

  useEffect(()=>{

    const interval = setInterval(()=>{

      const count = Math.floor(Math.random()*3)+1

      const shuffled = [...users].sort(()=>0.5-Math.random())

      setActiveUsers(shuffled.slice(0,count))

    },3000)

    return ()=>clearInterval(interval)

  },[])

  return(

    <div
      style={{
        display:"flex",
        alignItems:"center",
        gap:"10px",
        marginBottom:"20px"
      }}
    >

      <div style={{display:"flex"}}>

        {activeUsers.map((u,index)=>(
          <div
            key={index}
            style={{
              width:"28px",
              height:"28px",
              borderRadius:"50%",
              background:"#007bff",
              color:"white",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              fontSize:"12px",
              marginLeft:index===0?0:-8,
              border:"2px solid white"
            }}
          >
            {u}
          </div>
        ))}

      </div>
      <span>
        {activeUsers.length} people viewing this board
      </span>
    </div>
  )
}
export default PresenceBar