import React, { useState, useEffect } from 'react';
import './TaskManager.css';
import ReactModal from 'react-modal';
import { getTasks, addTask, updateTask, deleteTask, exportTask } from '../../services/TaskService';
import { getUserId } from '../../services/LoginService';

export default function TaskManager() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        userId: getUserId(),
        name: '',
        deadline: '',
        status: '',
        tags: []
    });
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [displayFinishTasks, setDisplayFinishTasks] = useState(false);

    let fetchData = ()  => {
        getTasks().then(tasksData => {
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
    }

    useEffect(() => {
        fetchData()
    }, [])

    let handleAddTask = () => {

        if (newTask.name !== undefined && newTask.name !== "") {
        
            addTask(newTask).then(fetchData);
            
            setNewTask({
                userId: getUserId(),
                name: '',
                deadline: '',
                status: '',
                tags: []
            });
        }
    }

    let newTaskNameChanged = (event) => {
        setNewTask({
            ...newTask,
            name: event.target.value
        });
    }

    let newTaskStatusChanged = (event) => {
        setNewTask({
            ...newTask,
            status: event.target.value
        });
    }

    let newTaskDeadlineChanged = (event) => {
        setNewTask({
            ...newTask,
            deadline: event.target.value
        });
    }

    let handleOpenModal = (task) => {
        setShowModal(true);
        setSelectedTask(task);
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

    let taskDisplay = (task) => {
        return (
            <div className='Task' onClick={e => handleOpenModal(task)}>
                <p className='TaskName'>{task.name}</p>
                <p className='TaskDate'>{task.deadline !== null ? (new Date(task.deadline)).toLocaleDateString() : ""}</p>
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
        <div className='TaskManager'>
            <h1 className="title">Task Manager</h1>

            <div className="Area1">
                <div className="TaskArea">
                    <h2 className="subtitle">Très urgent</h2>
                    {tresUrgent}
                </div>

                <div className="TaskArea">
                    <h2 className="subtitle">Urgent</h2>
                    {urgent}
                </div>

                <div className="TaskArea">
                    <h2 className="subtitle">Normal</h2>
                    {normal}
                </div>
            </div>

            <div className='AddTask'>
                <input type="text" className='Input' placeholder='Name' value={newTask.name} id="newTaskName" onChange={newTaskNameChanged}/>
                <input type="date" className='Input' placeholder='Date' value={newTask.deadline} id="newTaskDate" onChange={newTaskDeadlineChanged}/>
                <input type="text" className='Input' placeholder='Status' value={newTask.status} id="newTaskStatus" onChange={newTaskStatusChanged}/>
                <button className='Button' onClick={handleAddTask}>Add</button>
            </div>

            <div className='Area2'>
                <h2 className="subtitle">Terminée</h2>
                <button className='Button' onClick={handleDisplayFinishTasks}> {displayFinishTasks ? "Unshow" : "Show"} </button>
                { 
                    displayFinishTasks 
                    ? <div className="TaskArea2"> {terminee} </div>
                    : null
                }
                
            </div>
            
            <button className='Button' onClick={exportTask}>Export</button>

            <ReactModal isOpen={showModal} className="Modal">
                <TaskModal selectedTask={selectedTask} closeModal={handleCloseModal}/>
                <button className='Button' onClick={handleCloseModal}>Close</button>
            </ReactModal>
        </div>
    )
}

function TaskModal({selectedTask, closeModal}) {

    const [task, setTask] = useState(selectedTask);

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

    let handleStatusChanged = (event) => {
        setTask({
            ...task,
            status: event.target.value
        })
    };

    let handleUpdateTask = () => {
        if (task?.name !== undefined && task?.name !== "") {
            updateTask(task).then(closeModal);
        }
    }

    let handleDeleteTask = () => {
        deleteTask(task?.id).then(closeModal);
    }

    return (
        <div className='TaskModal'>
            <h1 className='title'>Task Editing</h1>
            <div className='TaskFormModal'>
                <h3>Name</h3>
                <input type='text' className='Input' value={task.name} onChange={handleNameChanged}/>
                <h3>Deadline</h3>
                <input type='date' className='Input' value={task.deadline} onChange={handleDeadlineChanged}/>
                <h3>Description</h3>
                <textarea className='Input' value={task.description} onChange={handleDescriptionChanged} style={{resize: 'none'}}/>
                <h3>Status</h3>
                <input type='text' className='Input' value={task.status} onChange={handleStatusChanged}/>
            </div>
            <div className='TaskModalButtons'>
                <button className='Button' onClick={handleUpdateTask}>Save</button>
                <button className='Button' onClick={handleDeleteTask}>Delete</button>
            </div>
        </div>
    )
}