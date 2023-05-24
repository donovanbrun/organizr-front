import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './EditTask.css';
import { getTask, updateTask, deleteTask } from '../../services/TaskService';

export default function EditTask() {

    const [task, setTask] = useState({
        userId: '',
        name: '',
        deadline: '',
        status: '',
        tags: []
    });

    let {id} = useParams();

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        getTask(id).then(data => {
            setTask(data.data)
        })
    }

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
        return date.getFullYear() + "-" + (date.getUTCMonth() >= 10 ? date.getUTCMonth()+1 : "0"+(date.getUTCMonth()+1)) + "-" + (date.getDate() >= 10 ? date.getDate() : "0"+date.getDate())
    }

    let handleStatusChanged = (event) => {
        setTask({
            ...task,
            status: event.target.value
        })
    };

    let handleUpdateTask = () => {
        if (task?.name !== undefined && task?.name !== "") {
            updateTask(task);
        }
    }

    let handleDeleteTask = () => {
        deleteTask(task?.id);
    }

    return (
        <div className='EditTask'>
            <Link to="/todo" className='Button'>Back</Link>
            <h1 className='title'>Task Editing</h1>
            <div className='TaskFormModal'>
                <h3>Name</h3>
                <input type='text' className='Input' value={task.name} onChange={handleNameChanged}/>
                <h3>Deadline</h3>
                <input type='date' className='Input' value={formatDate(task.deadline)} onChange={handleDeadlineChanged}/>
                <h3>Status</h3>
                <select className='Input' name="status" value={task.status} onChange={handleStatusChanged}>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Très urgent">Très urgent</option>
                    <option value="Terminée">Terminée</option>
                </select>
                <h3>Description</h3>
                <textarea className='Input' value={task.description} onChange={handleDescriptionChanged} style={{resize: 'none'}} rows={task?.description?.split(/\r\n|\r|\n/)?.length}/>
            </div>
            <div className='TaskModalDate'>
                <p>Creation : {(new Date(task.creationDate)).toLocaleString()}</p>
                <p>Modification : {(new Date(task.modificationDate)).toLocaleString()}</p>
            </div>
            <div className='TaskModalButtons'>
                <button className='Button' onClick={handleUpdateTask}>Save</button>
                <button className='Button' onClick={handleDeleteTask}>Delete</button>
            </div>
        </div>
    )
}