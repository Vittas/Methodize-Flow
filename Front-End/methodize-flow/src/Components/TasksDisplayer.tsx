import { useContext, useState } from "react"
import { contextTask } from "../TaskContext"
import { ModalCreateTaskButton } from "./ModalCreateTaskButton"

export const TaskDisplayer = () => {

    const GlobalTaskContext = useContext(contextTask)

    const [taskJson, setTaskJson] = useState({})

    return (
        <>

            {GlobalTaskContext.taskList.map((task: any) => (    
                <div key={task.id} className={`rounded-[12px] pb-[2em] min-h-[20em] ${task.priority === "Low" ? "bg-[#ADBCA5]" :
                        task.priority === "Medium" ? "bg-[#BCAEA5]" :
                            "bg-[#BCA5A5]"
                    }`}
                        onClick={ ()=>{setTaskJson({id: task.id, title: task.title
                        , description: task.description, priority: task.priority})} }>
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

        </>
    )
}