import axios, { AxiosResponse } from "axios"
import { promises } from "original-fs"
import { Children, createContext, JSX, useEffect, useState } from "react"
import { data } from "react-router-dom/dist"

interface TaskInterface {
    id: number,
    title: string,
    description: string,
    priority: "Low" | "Medium" | "High",
    completed: boolean
}


interface TaskContextInterface {
    taskList: TaskInterface[]
    createTask: (title: string, description: string, priority: "Low" | "Medium" | "High") => any,
    fetchTasks: () => Promise<void>
    deleteTask: (id: number) => Promise<void>
    getTaskById: (id: number) => Promise<any>
    updateTask: (id: number, title: string, description: string, priority: "Low" | "Medium" | "High") => Promise<void>,

}

export const contextTask = createContext({} as TaskContextInterface)


export const TaskContext = ({ children }: any) => {

    const [taskList, setTaskList] = useState<TaskInterface[]>([])


    const fetchTasks = async () => {
        try {
            const response = await axios.get<TaskInterface[]>("http://localhost:8080/CardsData")

            // console.log(response.data)
            setTaskList(response.data)
        } catch (err) {
            console.error("There's something wrong into get function.", err)
        }
    }

    const getTaskById = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/CardsData/get?id=${id}`)
            // console.log(response.data)
            return (response.data)
        } catch (err) {
            console.error("There's an error")
        }
    }

    const createTask = async (title: string, description: string, priority: "Low" | "Medium" | "High") => {
        try {
            const newTask = {
                title,
                description,
                priority,
                completed: false,
            }

            const response = await axios.post("http://localhost:8080/CardsData/add", newTask, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setTaskList(prev => [...prev, response.data]) // atualiza com o que veio da API
        } catch (err) {
            console.error("Erro ao criar tarefa", err)
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/CardsData/dell?id=${id}`)
            setTaskList(prev => prev.filter(task => task.id !== id))
        }
        catch (err) {
            console.error("Erro ao criar tarefa", err)
        }
    }

    const updateTask = async (id: number, title: string, description: string, priority: string) => {
        const newTask = {
            title,
            description,
            priority,
            completed: false,
        }
        try {
            const response = await axios.put(`http://localhost:8080/CardsData/update?id=${id}`, newTask)
            setTaskList(prev => prev.map(task =>
                task.id === id ? response.data.card : task
            ))
        } catch (err) {
            console.error()
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])


    return (
        <contextTask.Provider value={{ taskList, createTask, fetchTasks, deleteTask, getTaskById, updateTask }}>
            {children}
        </contextTask.Provider>
    )
}