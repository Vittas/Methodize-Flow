import { Children, createContext, JSX, useEffect, useState } from "react"

interface TaskInterface{
    id: number,
    title: string,
    description: string,
    priority: "Low" | "Medium" | "High",
    completed: boolean
}


interface TaskContextInterface{
    taskList: any
    createTask: (title: string, description: string, priority: "Low" | "Medium" | "High") => any,
}   

export const contextTask = createContext({} as TaskContextInterface)


export const TaskContext = ({children} : any) => {

    useEffect(() => {
        // const GetTaskList = await API DO ICARO

        // for(let i in GetTaskList.length){
            
            // if(getTaskList[i].priority === "Low"){
            // const task = <div className='bg-[#ADBCA5] rounded-[12px] pb-[2em] min-h-[20em]'>
            //      <div className='bg-[#38AA32] rounded-t-[12px] p-[1em]'>
            //          <h1 className="text-center">GetTaskList[i].title</h1>
            //      </div>
            //      <div className="p-[1em] rounded-b-[12px]">
            //          GetTaskList[i].description
            //      </div>
            // </div>
            // setTaskList(task)
            // }
            // elseif(getTaskList[i].priority === "Medium"){

                // const task = <div className='bg-[#BCAEA5]  rounded-[12px] pb-[2em] min-h-[20em]'>
                //     <div className='bg-[#E28B27] rounded-t-[12px] p-[1em]'>
                //         <h1 className="text-center">GetTaskList[i].title</h1>
                //     </div>
                //     <div>
                //         GetTaskList[i].description
                //     </div>
                // </div>
                // setTaskList(task)

            // }
            // else{
                    // const task = <div className='bg-[#BCA5A5] rounded-[12px] pb-[2em] min-h-[20em]'>
                    //      <div className='bg-[#E22727] rounded-t-[12px] p-[1em]'>
                    //          <h1 className="text-center">GetTaskList[i].title</h1>
                    //      </div>
                    //      <div>
                    //          GetTaskList[i].description
                    //      </div>
                    // </div>
                    // setTaskList(task)

            // }

        // }

        // setTaskList(GetTaskList)
    })

    const [taskList, setTaskList] = useState([])

    const createTask = (title: string, description: string, priority: "Low" | "Medium" | "High") => {
        taskList.push({ title, description, priority } as TaskInterface)
    }
    
    return(
        <contextTask.Provider value={{ taskList, createTask }}>
            {children}
        </contextTask.Provider>
    )
}