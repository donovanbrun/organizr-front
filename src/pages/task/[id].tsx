import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/EditTask.module.css';
import { getTask, updateTask, deleteTask } from '../../services/TaskService';
//import { getTask, updateTask, deleteTask } from '../../services/offline/TaskOfflineService';
import Nav from '../../components/nav/Nav';
import Task from '../../models/task';

export default function EditTask() {

    const [task, setTask]: [Task, any] = useState(new Task());

    const router = useRouter();
    const { id, from } = router.query;

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        getTask(id).then(data => {
            setTask(data["data"])
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
        return date.getFullYear() + "-" + (date.getUTCMonth() >= 10 ? date.getUTCMonth() + 1 : "0" + (date.getUTCMonth() + 1)) + "-" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate())
    }

    let handleStatusChanged = (event) => {
        setTask({
            ...task,
            status: event.target.value
        })
    };

    let handleUpdateTask = () => {
        if (task?.title !== undefined && task?.title !== "") {
            updateTask(task);
            //router.push(decodeURIComponent(from.toString()));
            router.push('/board');
        }
    }

    let handleDeleteTask = () => {
        deleteTask(task?.id);
        router.push('/board');
    }

    return (
        <div className="App">
            <Nav></Nav>
            <div className={styles.EditTask}>
                <div className={styles.BackButton}>
                    <Link href="/board" className='Button'>Back</Link>
                </div>
                <h1 className='title'>Task Editing</h1>
                <div className={styles.TaskFormModal}>
                    <h3 className='TextColor'>{task.title}</h3>
                    <input type='text' className='Input' value={task.title} onChange={handleNameChanged} />
                    <h3 className='TextColor'>Deadline</h3>
                    <input type='date' className='Input' value={formatDate(task.deadline)} onChange={handleDeadlineChanged} />
                    <h3 className='TextColor'>Status</h3>
                    <select className='Input' name="status" value={task.status} onChange={handleStatusChanged}>
                        <option value="Normal">Medium</option>
                        <option value="Urgent">High</option>
                        <option value="Très urgent">Highest</option>
                        <option value="Terminée">Finished</option>
                    </select>
                    <h3 className='TextColor'>Description</h3>
                    <textarea className='Input' value={task.description} onChange={handleDescriptionChanged} style={{ resize: 'none' }} rows={task?.description?.split(/\r\n|\r|\n/)?.length} />
                </div>
                <div className={styles.TaskModalDate}>
                    <p className='TextColor'>Creation : {(new Date(task.creationDate)).toLocaleString()}</p>
                    <p className='TextColor'>Modification : {(new Date(task.updateDate)).toLocaleString()}</p>
                </div>
                <div className={styles.TaskModalButtons}>
                    <button className='Button' onClick={handleUpdateTask}>Save</button>
                    <button className='Button' onClick={handleDeleteTask}>Delete</button>
                </div>
            </div>
        </div>
    )
}