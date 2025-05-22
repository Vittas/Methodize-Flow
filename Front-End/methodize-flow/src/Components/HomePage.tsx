import { useContext, useState } from "react"
import { ModalCreateTaskButton } from "./ModalCreateTaskButton"
import { TaskDisplayer } from "./TasksDisplayer"
import { contextTask } from "../TaskContext"
import { ModalEditTaskButton } from "./ModalEditTaskButton"

export const Homepage = () => {
  interface TaskInterface {
    id: number,
    title: string,
    description: string,
    priority: "Low" | "Medium" | "High",
    completed: boolean
  }

  const [createVisibility, setCreateVisibility] = useState(false)
  const [editVisibility, setEditVisibility] = useState(false)

  const GlobalTaskContext = useContext(contextTask)
  const [taskJson, setTaskJson] = useState({})


  return (
    <div className="flex">
      <div className="bg-[#172234] h-auto min-h-screen w-screen py-[2em] px-[15em] space-y-[2em]">
        <h1 className="text-[2em] text-center text-white font-semibold">Methodize Flow</h1>
        <p className="text-left text-[1.3em] text-white font-semibold font-inter">Your tasks</p>

        <div className="grid grid-cols-4 gap-4 grid-rows-auto">
          <div
            className="bg-[#48638E] rounded-[12px] min-h-[20em] flex items-center justify-center cursor-pointer hover:bg-[#2E415F]"
            onClick={() => setCreateVisibility(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#94ACDB">
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </div>

          {GlobalTaskContext.taskList.map((task: any) => (
            <div key={task.id} className={`rounded-[12px] pb-[2em] min-h-[20em] ${task.priority === "Low" ? "bg-[#ADBCA5]" :
              task.priority === "Medium" ? "bg-[#BCAEA5]" :
                "bg-[#BCA5A5]"
              }`}
              onClick={() => {
                setTaskJson({
                  id: task.id, title: task.title
                  , description: task.description, priority: task.priority
                }); setEditVisibility(true)
              }}>
              {/* onClick={()=>{ GlobalTaskContext.deleteTask(task.id) && console.log(task.id) }}> */}

              <div className={`rounded-t-[12px] p-[1em] ${task.priority === "Low" ? "bg-[#38AA32]" :
                task.priority === "Medium" ? "bg-[#E28B27]" :
                  "bg-[#E22727]"
                }`}>
                <h1 className="text-center text-white font-bold break-all">{task.title}</h1>
              </div>
              <div className="p-[1em] text-white break-all">
                {task.description}
              </div>

            </div>
          ))}
          {/* <TaskDisplayer /> */}
        </div>
      </div>
      
      <ModalEditTaskButton visibility={editVisibility} setVisibility={setEditVisibility} taskJson={taskJson as TaskInterface}/>
      <ModalCreateTaskButton visibility={createVisibility} setVisibility={setCreateVisibility} />
    </div>
  )
}
