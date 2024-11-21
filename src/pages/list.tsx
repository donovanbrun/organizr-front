import { useEffect, useState } from "react";
import { getTasks } from "../services/TaskService";
import { AxiosResponse } from "axios";
import Task from "../models/task";
import Nav from "../components/nav/Nav";
import { useRouter } from "next/router";

export default function List() {
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    let fetchData = () => {
        getTasks().then((tasksData: AxiosResponse) => {
            let tasks: Task[] = tasksData?.data;

            tasks?.sort((a, b) => {
                if (new Date(a.updateDate) < new Date(b.deadline)) {
                    return -1;
                }
                if (new Date(a.deadline) > new Date(b.deadline)) {
                    return 1;
                }
                return 0;
            });

            setTasks(tasks);
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = (index) => {
        router.push(`/task/${tasks[index].id}`, {
            query: {
                from: encodeURIComponent(router.pathname)
            }
        });
    }

    return (
        <div className="App">
            <Nav></Nav>
            <div>
                <h1 className="title">Tasks</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Deadline</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => {
                            return (
                                <tr key={index} onClick={() => handleClick(index)}>
                                    <td>{task.title}</td>
                                    <td>{task.deadline}</td>
                                    <td>{task.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}