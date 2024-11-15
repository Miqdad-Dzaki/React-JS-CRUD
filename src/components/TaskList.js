import React from 'react';
import { Card } from 'react-bootstrap';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'to do':
                return 'circle';
            case 'in progress':
                return 'circle-half';
            case 'done':
                return 'circle-fill';
            default:
                return 'circle';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'danger';
            case 'medium':
                return 'warning';
            case 'low':
                return 'success';
            default:
                return 'secondary';
        }
    };

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <Card className="task-card mb-3" key={task.id}>
                    <Card.Body className="d-flex align-items-center">
                        <div className="task-cell task-name">
                            <small className="text-muted d-block">Task</small>
                            {task.name}
                        </div>
                        <div className="task-cell priority">
                            <small className="text-muted d-block">Priority</small>
                            <span className={`text-${getPriorityColor(task.priority)}`}>
                                {task.priority}
                            </span>
                        </div>
                        <div className="task-cell status">
                            <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                                {task.status}
                            </span>
                        </div>
                        <div className="task-cell status-icon">
                            <i className={`bi bi-${getStatusIcon(task.status)}`}></i>
                        </div>
                        <div className="task-cell actions">
                        <button className="btn btn-icon" onClick={() => showEditForm(task)}>
                            <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button className="btn btn-icon" onClick={() => deleteTask(task.id)}>
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default TaskList;