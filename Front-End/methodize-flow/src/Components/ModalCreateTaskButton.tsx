import { useContext, useState } from "react";
import { contextTask } from "../TaskContext";

interface ModalProps {
  visibility: boolean
  setVisibility: (v: boolean) => void
}

interface TaskInterface {
  title: string,
  description: string,
  priority: "Low" | "Medium" | "High",
  completed: boolean
}

export const ModalCreateTaskButton = ({ visibility, setVisibility }: ModalProps) => {
  if (!visibility) return null;

  const closeModal = () => {
    setVisibility(false)
  }

  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [priority, setPriority] = useState<'Low' | "Medium" | "High">("Low")
  const [check, setCheck] = useState<boolean>(false)

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
        <h1 className="text-white font-semibold text-center">CREATE A CARD</h1>

        <div>
          <input className="rounded-[12px] px-[1em] py-[0.5em]" type="text" placeholder="Type a title..." onChange={(e) => { setTitle(e.target.value) }} />
        </div>

        <input className="rounded-[12px] pb-[2em] px-[1em] pt-[0.5em]" type="text" placeholder="Type a description..." onChange={(e) => { setDescription(e.target.value) }} />

        <div className="flex flex-row space-x-[2em] justify-center">
          <div className="flex flex-col justify-center space-y-1">
            <input className="" type="radio" id="Low" name="drone" value="Low" onChange={(e) => { setPriority(e.target.value as 'Low') }} />
            <label className="text-center text-white" htmlFor="">Low</label>
          </div>

          <div className="flex flex-col  justify-center space-y-1">
            <input type="radio" id="Medium" name="drone" value="Medium" onChange={(e) => { setPriority(e.target.value as 'Medium') }} />
            <label className="text-center text-white" htmlFor="">Medium</label>
          </div>

          <div className="flex flex-col justify-center space-y-1">
            <input type="radio" id="High" name="drone" value="High" onChange={(e) => { setPriority(e.target.value as 'High') }} />
            <label className="text-center text-white" htmlFor="">High</label>
          </div>
        </div>


        <div className="flex justify-center">

          <button
            className="bg-[#94ACDB] text-white font-semibold px-[1em] py-[0.5em] rounded-[12px]"
            onClick={() => { TasksContext.createTask(title, description, priority) && closeModal }}>
            Create
          </button>
        </div>

      </div>
    </div>
  )
}
