import React from 'react';
import './TaskDisplayMin.css';
import { getTasks } from '../../services/TaskService';

class TaskDisplayMin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        
        getTasks().then(tasksData => {
            let tasks = tasksData.data;

            tasks = tasks.filter((task) => {
                return (task.status !== "Terminée");
            });

            tasks.sort((a, b) => {
                if (a.deadline < b.deadline) {
                    return -1;
                }
                if (a.deadline > b.deadline) {
                    return 1;
                }
                return 0;
            });

            tasks.slice(0, 5);

            this.setState({
                tasks: tasks
            });
        });
    }

    formatDeadline = (data) => {
        return (new Date(data?.deadline)).toLocaleDateString();
    }

    render() {

        return (
            <div className='TaskDisplayMin'>
                <h2 className='subtitle'>Five next tasks</h2>
                <table className='TaskDisplayMinTable'>
                    <thead>
                        <tr className='TaskDisplayMinTable'>
                            <th className='TaskDisplayText'>Name</th>
                            <th className='TaskDisplayText'>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.slice(0,5).map((task) => {
                            return (
                                <tr key={task.id} className='TaskDisplayMinTable'>
                                    <td className='TaskDisplayText'>{task.name}</td>
                                    <td className='TaskDisplayText'>{this.formatDeadline(task)}</td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskDisplayMin;