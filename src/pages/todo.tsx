import React, { useState, useEffect } from 'react';
import Nav from '../components/nav/Nav';
import styles from '../styles/TaskManager.module.css';
import Link from 'next/link';
import ReactModal from 'react-modal';
//import { getTasks, addTask, updateTask, deleteTask, exportTask } from '../services/TaskService';
import { getTasks, addTask, updateTask, deleteTask, exportTask } from '../services/offline/TaskOfflineService';
import { getUserId } from '../services/LoginService';
import { getTags } from '../services/TagService';
import { Autocomplete, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function TaskManager() {

    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isNewTask, setIsNewTask] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [displayFinishTasks, setDisplayFinishTasks] = useState(false);

    let fetchData = () => {
        getTasks(selectedTags).then((tasksData: AxiosResponse) => {
            let tasks = tasksData.data;

            tasks.sort((a, b) => {
                if (a.deadline < b.deadline) {
                    return -1;
                }
                if (a.deadline > b.deadline) {
                    return 1;
                }
                return 0;
            });

            setTasks(tasks);
        });

        // getTags().then((res) => {
        //     setTags(res?.data)
        // });
    }

    useEffect(() => {
        fetchData()
    }, [])

    let handleOpenModal = (task, isNew = false) => {
        setShowModal(true);
        if (isNew) {
            setIsNewTask(true);
            setSelectedTask({
                id: uuidv4(),
                userId: getUserId(),
                name: '',
                description: '',
                deadline: '',
                status: 'Normal',
                creationDate: '',
                modificationDate: '',
                tags: []
            })
        }
        else {
            setIsNewTask(false);
            setSelectedTask(task);
        }
    }

    let handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(null);
        fetchData();
    }

    let handleDisplayFinishTasks = () => {
        setDisplayFinishTasks(!displayFinishTasks);
    }

    let handleTagFilter = (event, value) => {
        console.log(value)
        setSelectedTags(value)
        fetchData();
    }

    const tresUrgent = [];
    const urgent = [];
    const normal = [];
    const terminee = [];

    let taskDisplay = (task) => {
        return (
            <div className={styles.Task} onClick={e => handleOpenModal(task)}>
                <p className={styles.TaskName}>{task.name}</p>
                <p className={styles.TaskDate}>{task.deadline !== null ? (new Date(task.deadline)).toLocaleDateString() : ""}</p>
            </div>
        )
    }

    tasks.forEach(task => {
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
                <h1 className="title">Task Manager</h1>

                {/* <Autocomplete
                    className={styles.TaskFilter}
                    multiple
                    value={selectedTags}
                    onChange={handleTagFilter}
                    options={tags}
                    renderInput={(params) => (
                        <TextField {...params} label="Filters" />
                    )}
                /> */}

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

                <button className='Button' onClick={() => handleOpenModal(null, true)}>Add</button>

                <div className={styles.Area2}>
                    <h2 className="subtitle">Finished</h2>
                    <button className="Button" onClick={handleDisplayFinishTasks}> {displayFinishTasks ? "Unshow" : "Show"} </button>
                    {
                        displayFinishTasks
                            ? <div className={styles.TaskArea}> {terminee} </div>
                            : null
                    }

                </div>

                {/* <button className="Button" onClick={exportTask}>Export</button> */}

                <ReactModal isOpen={showModal} className={styles.Modal}>
                    <TaskModal selectedTask={selectedTask} closeModal={handleCloseModal} isNewTask={isNewTask} />
                    <button className='Button' onClick={handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        </div>
    )
}

function TaskModal({ selectedTask, closeModal, isNewTask = false }) {

    const [task, setTask] = useState(selectedTask);
    const [tags, setTags] = useState([]);

    let fetchTags = () => {
        // getTags().then((res) => {
        //     setTags(res?.data)
        // })
    }

    useEffect(() => {
        fetchTags()
    }, [])

    let handleNameChanged = (event) => {
        setTask({
            ...task,
            name: event.target.value
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
        if (task?.name !== undefined && task?.name !== "") {
            addTask(task).then(closeModal);
        }
    }

    let handleUpdateTask = () => {
        if (task?.name !== undefined && task?.name !== "") {
            updateTask(task).then(closeModal);
        }
    }

    let handleDeleteTask = () => {
        deleteTask(task?.id).then(closeModal);
    }

    let handleTagChanged = (event, value) => {
        setTask({
            ...task,
            tags: value
        })
    }

    return (
        <div className={styles.TaskModal}>
            {
                !isNewTask
                    ? <h1 className='title'>Task Editing</h1>
                    : <h1 className='title'>Task Creation</h1>
            }
            <div className={styles.TaskFormModal}>
                <h3>Name</h3>
                <input type='text' className='Input' value={task?.name} onChange={handleNameChanged} />
                <h3>Deadline</h3>
                <input type='date' className='Input' value={formatDate(task?.deadline)} onChange={handleDeadlineChanged} />
                <h3>Status</h3>
                <select className='Input' name="status" value={task?.status} onChange={handleStatusChanged}>
                    <option value="Normal">Medium</option>
                    <option value="Urgent">High</option>
                    <option value="Très urgent">Highest</option>
                    <option value="Terminée">Finished</option>
                </select>

                {/* <Autocomplete
                    multiple
                    freeSolo
                    value={task.tags}
                    onChange={handleTagChanged}
                    options={tags}
                    renderInput={(params) => (
                        <TextField {...params} label="Tags" />
                    )}
                /> */}
            </div>
            {
                !isNewTask ?
                    (
                        <div className={styles.TaskModalDescription}>
                            <div className={styles.TaskModalDate}>
                                <p>Creation : {(new Date(task?.creationDate)).toLocaleString()}</p>
                                <p>Modification : {(new Date(task?.modificationDate)).toLocaleString()}</p>
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
        </div >
    )
}