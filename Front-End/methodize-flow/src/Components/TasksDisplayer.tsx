import { useContext, useState } from "react"
import { contextTask } from "../TaskContext"
import { ModalCreateTaskButton } from "./ModalCreateTaskButton"

export const TaskDisplayer = () => {

    const GlobalTaskContext = useContext(contextTask)

    return (
        <>

                <div className='bg-[#BCA5A5] rounded-[12px] pb-[2em] min-h-[20em]'>
                    <div className='bg-[#E22727] text-white font-semibold text-[18px] rounded-t-[12px] p-[1em]'>
                        <h1 className="text-center">Title</h1>
                    </div>
                    <div className="p-[1em] rounded-b-[12px]">
                        Description...
                    </div>
                </div>

                <div className='bg-[#BCAEA5]  rounded-[12px] pb-[2em] min-h-[20em]'>
                    <div className='bg-[#E28B27] text-white font-semibold text-[18px] rounded-t-[12px] p-[1em]'>
                        <h1 className="text-center">title</h1>
                    </div>
                    <div className="p-[1em] rounded-b-[12px]">
                        description...aaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                </div>

                <div className='bg-[#ADBCA5] rounded-[12px] pb-[2em] min-h-[20em]'>
                    <div className='bg-[#38AA32] text-white font-semibold text-[18px] rounded-t-[12px] p-[1em]'>
                        <h1 className="text-center">title</h1>
                    </div>
                    <div className="p-[1em] rounded-b-[12px]">
                        description
                    </div>
                </div>

                <div className='bg-[#ADBCA5] rounded-[12px] pb-[2em] min-h-[20em]'>
                    <div className='bg-[#38AA32] text-white font-semibold text-[18px] rounded-t-[12px] p-[1em]'>
                        <h1 className="text-center">title</h1>
                    </div>
                    <div className="p-[1em] rounded-b-[12px]">
                        description
                    </div>
                </div>

        </>
    )
}