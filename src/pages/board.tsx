import React, { useState, useEffect } from 'react';
import Nav from '../components/nav/Nav';
import styles from '../styles/TaskManager.module.css';
import Link from 'next/link';
import ReactModal from 'react-modal';
import { getTasks, addTask, updateTask, deleteTask } from '../services/TaskService';
//import { getTasks, addTask, updateTask, deleteTask, exportTask } from '../services/offline/TaskOfflineService';
import { getUser } from '../services/LoginService';
import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Task from '../models/task';

export default function Board() {

    const [tasks, setTasks]: [Task[], any] = useState([]);
    const [selectedTask, setSelectedTask]: [Task, any] = useState(null);
    const [isNewTask, setIsNewTask] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [displayFinishTasks, setDisplayFinishTasks] = useState(false);

    let fetchData = () => {
        getTasks().then((tasksData: AxiosResponse) => {
            let tasks: Task[] = tasksData?.data;

            tasks?.sort((a, b) => {
                if (new Date(a.deadline) < new Date(b.deadline)) {
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

    let handleOpenModal = async (task, isNew = false) => {
        const user = await getUser();
        const workspace = JSON.parse(localStorage.getItem("workspace"));
        console.log(workspace)
        if (isNew) {
            setIsNewTask(true);
            setSelectedTask(new Task(uuidv4(), user.id, workspace.id, '', '', new Date(), 'Normal', new Date(), new Date()));
        }
        else {
            setIsNewTask(false);
            setSelectedTask(task);
        }
        setShowModal(true);
    }

    let handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(null);
        fetchData();
    }

    let handleDisplayFinishTasks = () => {
        setDisplayFinishTasks(!displayFinishTasks);
    }

    const tresUrgent = [];
    const urgent = [];
    const normal = [];
    const terminee = [];

    let taskDisplay = (task: Task) => {
        const d = new Date(task.deadline);
        return (
            <div className={styles.Task} onClick={e => handleOpenModal(task)}>
                <p className={styles.TaskName}>{task.title}</p>
                <p className={styles.TaskDate}>{d.toLocaleDateString()}</p>
            </div>
        )
    }

    tasks.forEach((task: Task) => {
        if (task.status === "Très urgent") {
            tresUrgent.push(taskDisplay(task))
        }
        else if (task.status === "Urgent") {
            urgent.push(taskDisplay(task))
        }
        else if (task.status === "Normal") {
            normal.push(taskDisplay(task))
        }
        else {
            terminee.push(taskDisplay(task))
        }
    })

    return (
        <div className="App">
            <Nav></Nav>
            <div className={styles.TaskManager}>
                <h1 className="title">Task Board</h1>

                <div className={styles.Area1}>
                    <div className={styles.TaskArea}>
                        <h2 className="subtitle">Highest</h2>
                        {tresUrgent}
                    </div>

                    <div className={styles.TaskArea}>
                        <h2 className="subtitle">High</h2>
                        {urgent}
                    </div>

                    <div className={styles.TaskArea}>
                        <h2 className="subtitle">Medium</h2>
                        {normal}
                    </div>
                </div>

                <button className='Button' onClick={() => handleOpenModal(null, true)}>Create a task</button>

                <div className={styles.Area2}>
                    <h2 className="subtitle">Finished</h2>
                    <button className="Button" onClick={handleDisplayFinishTasks}> {displayFinishTasks ? "Unshow" : "Show"} </button>
                    {
                        displayFinishTasks
                            ? <div className={styles.TaskArea}> {terminee} </div>
                            : null
                    }
                </div>

                <ReactModal isOpen={showModal} className={styles.Modal}>
                    <TaskModal selectedTask={selectedTask} closeModal={handleCloseModal} isNewTask={isNewTask} />
                </ReactModal>
            </div>
        </div>
    )
}

function TaskModal({ selectedTask, closeModal, isNewTask = false }) {

    const [task, setTask]: [Task, any] = useState(selectedTask);
    console.log(task)

    let handleNameChanged = (event) => {
        setTask({
            ...task,
            title: event.target.value
        })
    };

    let handleDescriptionChanged = (event) => {
        setTask({
            ...task,
            description: event.target.value
        })
    };

    let handleDeadlineChanged = (event) => {
        setTask({
            ...task,
            deadline: event.target.value
        })
    };

    let formatDate = (datestring) => {
        let date = new Date(datestring)
        return date.getFullYear() + "-" + (date.getUTCMonth() >= 10 ? date.getUTCMonth() + 1 : "0" + (date.getUTCMonth() + 1)) + "-" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate())
    }

    let handleStatusChanged = (event) => {
        setTask({
            ...task,
            status: event.target.value
        })
    };

    let handleCreateTask = () => {
        if (task?.title !== undefined && task?.title.trim() !== "") {
            addTask(task).then(closeModal);
        }
    }

    let handleUpdateTask = () => {
        if (task?.title !== undefined && task?.title.trim() !== "") {
            updateTask(task).then(closeModal);
        }
    }

    let handleDeleteTask = () => {
        deleteTask(task?.id).then(closeModal);
    }

    return (
        <div className={styles.TaskModal}>
            {
                !isNewTask
                    ? <h1 className='title'>Task Editing</h1>
                    : <h1 className='title'>Task Creation</h1>
            }
            <div className={styles.TaskFormModal}>
                <h3>Title</h3>
                <input type='text' className='Input' value={task?.title} onChange={handleNameChanged} />
                <h3>Deadline</h3>
                <input type='date' className='Input' value={formatDate(task?.deadline)} onChange={handleDeadlineChanged} />
                <h3>Status</h3>
                <select className='Input' name="status" value={task?.status} onChange={handleStatusChanged}>
                    <option value="Normal">Medium</option>
                    <option value="Urgent">High</option>
                    <option value="Très urgent">Highest</option>
                    <option value="Terminée">Finished</option>
                </select>
            </div>
            {
                !isNewTask ?
                    (
                        <div className={styles.TaskModalDescription}>
                            <div className={styles.TaskModalDate}>
                                <p>Creation : {(new Date(task?.creationDate)).toLocaleString()}</p>
                                <p>Modification : {(new Date(task?.updateDate)).toLocaleString()}</p>
                            </div>
                            <div className={styles.TaskModalButtons}>
                                <Link href={"/task/" + task?.id} className='Button'>Open</Link>
                                <button className='Button' onClick={handleUpdateTask}>Save</button>
                                <button className='Button' onClick={handleDeleteTask}>Delete</button>
                            </div>
                        </div>
                    )
                    : (
                        <div className={styles.TaskModalButtons}>
                            <button className='Button' onClick={handleCreateTask}>Create</button>
                        </div>
                    )
            }
            <button className='Button' onClick={closeModal}>Close</button>
        </div >
    )
}