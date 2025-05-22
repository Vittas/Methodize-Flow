import { useContext, useState } from "react";
import { contextTask } from "../TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


interface TaskInterface {
  id: number,
  title: string,
  description: string,
  priority: "Low" | "Medium" | "High",
  completed: boolean
}

interface ModalProps {
  visibility: boolean
  setVisibility: (v: boolean) => void,
  taskJson: TaskInterface
}

export const ModalEditTaskButton = ({ visibility, setVisibility, taskJson}: ModalProps) => {
  if (!visibility) return null;

  const closeModal = () => {
    setVisibility(false)
  }

  const [title, setTitle] = useState<string>(`${taskJson.title}`)
  const [description, setDescription] = useState<string>(`${taskJson.description}`)
  const [priority, setPriority] = useState<'Low' | "Medium" | "High">(`${taskJson.priority}`)
  const [deleteColor, setDeleteColor] = useState<string>("#ffffff")

  const TasksContext = useContext(contextTask)



  return (

    <div
      className="bg-black/40 w-screen h-screen cursor-pointer absolute flex justify-center self-start py-[10em]"
      onClick={closeModal}
    >
      <div
        className="bg-[#48638E] absolute p-[2em] max-w-[80em]  space-y-[1em] rounded-[12px]"
        onClick={(e) => e.stopPropagation()} // impede que o clique dentro do modal feche ele
      >
        <h1 className="text-white font-semibold text-center">EDIT A CARD</h1>

        <div>
          <input className="rounded-[12px] px-[1em] py-[0.5em]" type="text" defaultValue={taskJson.title} placeholder="Type a title..." onChange={(e) => { setTitle(e.target.value); console.log(title)}} />
        </div>

        <input className="rounded-[12px] pb-[2em] px-[1em] pt-[0.5em]" type="text" defaultValue={taskJson.description} placeholder="Type a description..." onChange={(e) => { setDescription(e.target.value) }} />

        <div className="flex flex-row space-x-[2em] justify-center">
          <div className="flex flex-col justify-center space-y-1">
            <input className="" type="radio" id="Low" name="drone" checked={priority === "Low"? true : false} value="Low" onChange={(e) => { setPriority(e.target.value as 'Low') }} />
            <label className="text-center text-white" htmlFor="">Low</label>
          </div>

          <div className="flex flex-col  justify-center space-y-1">
            <input type="radio" id="Medium" name="drone" value="Medium" checked={priority === "Medium"? true : false} onChange={(e) => { setPriority(e.target.value as 'Medium') }} />
            <label className="text-center text-white" htmlFor="">Medium</label>
          </div>

          <div className="flex flex-col justify-center space-y-1">
            <input type="radio" id="High" name="drone" value="High"  checked={priority === "High"? true : false} onChange={(e) => { setPriority(e.target.value as 'High') }} />
            <label className="text-center text-white" htmlFor="">High</label>
          </div>
        </div>


        <div className="flex justify-center space-x-2">

          <button
            className="bg-[#94ACDB] text-white font-semibold px-[1em] py-[0.5em] rounded-[12px]"
            onClick={() => { TasksContext.updateTask(taskJson.id, title, description, priority); closeModal() }}>
            Create
          </button>

          <button><FontAwesomeIcon icon={faTrashCan} onMouseEnter={() => setDeleteColor("#E22727")} onMouseLeave={() => setDeleteColor("#ffffff")} color={deleteColor}
            onClick={() => {TasksContext.deleteTask(taskJson.id); closeModal()}}/></button>
        </div>

      </div>
    </div>
  )
}
