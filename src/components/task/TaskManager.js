import React from 'react';
import './TaskManager.css';
import ReactModal from 'react-modal';
import { getTasks, addTask, updateTask, deleteTask } from '../../services/TaskService';

class TaskManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            newTask : {
                userId: "Donovan",
                name: '',
                deadline: '',
                status: ''
            },
            selectedTask: null,
            showModal: false,
            displayFinishTasks: false
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
        
            addTask(this.state.newTask).then(this.fetchData);
            
            this.setState({
                newTask : {
                    userId: "Donovan",
                    name: '',
                    deadline: '',
                    status: ''
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

    newTaskStatusChanged = (event) => {
        this.setState({
            newTask: {
                ...this.state.newTask,
                status: event.target.value
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

    displayFinishTasks = () => {
        this.setState({
            displayFinishTasks: !this.state.displayFinishTasks
        })
    }

    render() {

        const newTask = this.state.newTask;
        const tresUrgent = [];
        const urgent = [];
        const normal = [];
        const terminee = [];

        let taskDisplay = (task) => {
            return (
                <div className='Task' onClick={e => this.handleOpenModal(task)}>
                    <p className='TaskName'>{task.name}</p>
                    <p className='TaskDate'>{task.deadline !== null ? (new Date(task.deadline)).toLocaleDateString() : ""}</p>
                </div>
            )
        }

        this.state.tasks.forEach(task => {
            if (task.status === "Très urgent") {
                tresUrgent.push(taskDisplay(task))
            }
            else if (task.status === "Urgent") {
                urgent.push(taskDisplay(task))
            }
            else if (task.status === "Normal") {
                normal.push(taskDisplay(task))
            }
            else if (task.status === "Terminée") {
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
                    <input type="text" className='Input' placeholder='Name' value={newTask.name} id="newTaskName" onChange={this.newTaskNameChanged}/>
                    <input type="date" className='Input' placeholder='Date' value={newTask.deadline} id="newTaskDate" onChange={this.newTaskDeadlineChanged}/>
                    <input type="text" className='Input' placeholder='Status' value={newTask.status} id="newTaskStatus" onChange={this.newTaskStatusChanged}/>
                    <button className='Button' onClick={this.addTask}>Add</button>
                </div>

                <div className='Area2'>
                    <h2 className="subtitle">Terminée</h2>
                    <button className='Button' onClick={this.displayFinishTasks}> {this.state.displayFinishTasks ? "Unshow" : "Show"} </button>
                    { 
                        this.state.displayFinishTasks 
                        ? <div className="TaskArea2"> {terminee} </div>
                        : null
                    }
                    
                </div>
                
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
        this.setState({
            task: {
                ...this.state.task,
                deadline: event.target.value
            }
        });
    }

    handleStatusChanged = (event) => {
        this.setState({
            task: {
                ...this.state.task,
                status: event.target.value
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
        const status = this.state.task?.status;

        return (
            <div className='TaskModal'>
                <h1 className='title'>Task Editing</h1>
                <div className='TaskFormModal'>
                    <h3>Name</h3>
                    <input type='text' className='Input' value={name} onChange={this.handleNameChanged}/>
                    <h3>Deadline</h3>
                    <input type='date' className='Input' value={deadline} onChange={this.handleDeadlineChanged}/>
                    <h3>Description</h3>
                    <textarea className='Input' value={description} onChange={this.handleDescriptionChanged} style={{resize: 'none'}}/>
                    <h3>Status</h3>
                    <input type='text' className='Input' value={status} onChange={this.handleStatusChanged}/>
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