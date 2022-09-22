import React from 'react';
import './TaskManager.css';
import ReactModal from 'react-modal';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { getTasks, addTask, updateTask, deleteTask } from '../../services/TaskService';

class TaskManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            newTask : {
                userId: "Donovan",
                name: '',
                description: '',
                deadline: ''
            },
            selectedTask: null,
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    fetchData = ()  => {
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

            this.setState({
                tasks: tasks
            });
        });

        this.forceUpdate();
    }

    componentDidMount() {
        this.fetchData();
    }

    addTask = () => {

        if (this.state.newTask.name !== undefined && this.state.newTask.name !== "") {
        
            addTask(this.state.newTask).then(() => {
                this.fetchData();
            });
            
            this.setState({
                newTask : {
                    userId: "Donovan",
                    name: '',
                    description: '',
                    deadline: ''
                }
            });
        }
    }

    newTaskNameChanged = (event) => {
        this.setState({
            newTask: {
                ...this.state.newTask,
                name: event.target.value
            }
        });
    }

    newTaskDescriptionChanged = (event) => {
        this.setState({
            newTask: {
                ...this.state.newTask,
                description: event.target.value
            }
        });
    }

    newTaskDeadlineChanged = (event) => {
        this.setState({
            newTask: {
                ...this.state.newTask,
                deadline: event.target.value
            }
        });
    }

    handleOpenModal (task) {
        this.setState(
            { 
                showModal: true,
                selectedTask: task
            });
    }
    
    handleCloseModal () {
        this.setState(
            { 
                showModal: false,
                selectedTask: null
            }, this.fetchData);
    }

    render() {

        const newTask = this.state.newTask;

        const tresUrgent = this.state.tasks.filter(task => {return task.status === "Très urgent"}).map(task => {
            return (
                <div className='Task' onClick={e => this.handleOpenModal(task)}>
                    <p className='TaskText'>{task.name} {task.deadline !== null ? " - " + (new Date(task.deadline)).toLocaleDateString() : ""}</p>
                </div>
            )
        });

        const urgent = this.state.tasks.filter(task => {return task.status === "Urgent"}).map(task => {
            return (
                <div className='Task' onClick={e => this.handleOpenModal(task)}>
                    <p className='TaskText'>{task.name} {task.deadline !== null ? " - " + (new Date(task.deadline)).toLocaleDateString() : ""}</p>
                </div>
            )
        });

        const normal = this.state.tasks.filter(task => {return task.status === "Normal"}).map(task => {
            console.log(task.deadline)
            return (
                <div className='Task' onClick={e => this.handleOpenModal(task)}>
                    <p className='TaskText'>{task.name} {task.deadline !== null ? " - " + (new Date(task.deadline)).toLocaleDateString() : ""}</p>
                </div>
            )
        });

        const terminee = this.state.tasks.filter(task => {return task.status === "Terminée"}).map(task => {
            return (
                <div className='Task' onClick={e => this.handleOpenModal(task)}>
                    <p className='TaskText'>{task.name} {task.deadline !== null ? " - " + (new Date(task.deadline)).toLocaleDateString() : ""}</p>
                </div>
            )
        });

        /*
        <div className='AddTask'>
            <input type="text" className='Input' placeholder='Name' value={newTask.name} id="newTaskName" onChange={this.newTaskNameChanged}/>
            <input type="text" className='Input' placeholder='Description' value={newTask.description} id="newTaskDescription" onChange={this.newTaskDescriptionChanged}/>
            <input type="date" className='Input' placeholder='Date' value={newTask.deadline} id="newTaskDate" onChange={this.newTaskDeadlineChanged}/>
            <button className='Button' onClick={this.addTask}>Add</button>
        </div>
        */

        return (
            <div className='TaskManager'>
                <h1 className="title">Task Manager</h1>

                <h2 className="subtitle">Très urgent</h2>
                {tresUrgent}

                <h2 className="subtitle">Urgent</h2>
                {urgent}

                <h2 className="subtitle">Normal</h2>
                {normal}

                <h2 className="subtitle">Terminée</h2>
                {terminee}

                <ReactModal isOpen={this.state.showModal} className="Modal">
                    <Task task={this.state.selectedTask} closeModal={this.handleCloseModal}/>
                    <button className='Button' onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        );
    }
}

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        };
    }

    handleNameChanged = (event) => {
        this.setState({
            task: {
                ...this.state.task,
                name: event.target.value
            }
        });
    }

    handleDescriptionChanged = (event) => {
        this.setState({
            task: {
                ...this.state.task,
                description: event.target.value
            }
        });
    }

    handleDeadlineChanged = (event) => {
        console.log(event.target.value);
        this.setState({
            task: {
                ...this.state.task,
                deadline: event.target.value
            }
        });
    }

    handleFinishedChanged = (event) => {
        this.setState({
            task: {
                ...this.state.task,
                finished: event.target.checked
            }
        });
    }

    updateTask= () => {
        if (this.state.task?.name !== undefined && this.state.task?.name !== "") {
            updateTask(this.state.task).then(() => {
                this.props.closeModal();
            });
        }
    }

    deleteTask = () => {
        deleteTask(this.state.task?.id).then(() => {
            this.props.closeModal();
        });
    }

    render() {

        const name = this.state.task?.name;
        const deadline = this.state.task?.deadline;
        const description = this.state.task?.description;
        const finished = this.state.task?.finished;

        return (
            <div className='TaskModal'>
                <h1 className="title">Task Editing</h1>
                <div className='TaskFormModal'>
                    <h3>Name</h3>
                    <input type='text' className='Input' value={name} onChange={this.handleNameChanged}/>
                    <h3>Deadline</h3>
                    <input type="date" className='Input' placeholder='Date' value={(new Date(deadline)).toString()} onChange={this.handleDeadlineChanged}/>
                    <h3>Description</h3>
                    <InputTextarea autoResize={true} value={description} onChange={this.handleDescriptionChanged}/>
                    <div>
                        <h3>Status</h3>
                        <label htmlFor="isFinished" className="p-checkbox-label">Finished</label>
                        <Checkbox inputId="isFinished" onChange={this.handleFinishedChanged} checked={finished}/>
                    </div>
                </div>
                <div className='TaskModalButtons'>
                    <button className='Button' onClick={this.updateTask}>Save</button>
                    <button className='Button' onClick={this.deleteTask}>Delete</button>
                </div>
            </div>
        );
    }
}

export default TaskManager;