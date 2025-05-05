import { useState } from "react"
import { ModalCreateTaskButton } from "./ModalCreateTaskButton"
import { TaskDisplayer } from "./TasksDisplayer"

export const Homepage = () => {
  const [visibility, setVisibility] = useState(false)
  const [plusColor, setPlusColor] = useState("#94ACDB")

  return (
    <div className="flex">
      <div className="bg-[#172234] h-auto min-h-screen w-screen py-[2em] px-[15em] space-y-[2em]">
        <h1 className="text-[2em] text-center text-white font-semibold">Methodize Flow</h1>
        <p className="text-left text-[1.3em] text-white font-semibold font-inter">Your tasks</p>

        <div className="grid grid-cols-4 gap-4 grid-rows-auto">
          <div
            className="bg-[#48638E] rounded-[12px] min-h-[20em] flex items-center justify-center cursor-pointer hover:bg-[#2E415F]"
            onClick={() => setVisibility(true)}
            onMouseEnter={()=>{setPlusColor("#657699")}}
            onMouseLeave={()=>{setPlusColor("#94ACDB")}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px"  fill={plusColor}>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </div>

          <TaskDisplayer />
        </div>
      </div>

      <ModalCreateTaskButton visibility={visibility} setVisibility={setVisibility} />
    </div>
  )
}
