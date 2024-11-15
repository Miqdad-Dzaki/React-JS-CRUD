import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
    const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do' });

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        } else {
            resetForm();
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskToEdit) {
            editTask(task);
        } else {
            addTask(task);
            resetForm();
        }
        handleClose();
    };

    const resetForm = () => {
        setTask({ name: '', priority: 'Medium', status: 'To Do' });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="taskForm" onSubmit={handleSubmit}>
                    <Form.Group controlId="taskName" className="mb-3">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="taskPriority" className="mb-3">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select name="priority" value={task.priority} onChange={handleChange}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="taskStatus" className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={task.status} onChange={handleChange}>
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button
                    form="taskForm"
                    variant="primary"
                    type="submit"
                >
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskForm;
