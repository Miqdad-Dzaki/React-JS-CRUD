// App.js
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    

const deleteTask = (id) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to undo this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // If user confirmed, delete the task
            setTasks(tasks.filter(task => task.id !== id));
            Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
            );
        }
    });
};


    const openEditForm = (task) => {
        setTaskToEdit(task);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setTaskToEdit(null);
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <div className="task-header d-flex justify-content-between align-items-center mb-4">
                <h1 className="m-0">Task List</h1>
                <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus"></i> Add Task
                </Button>
            </div>

            {/* Task List */}
            <TaskList tasks={tasks} deleteTask={deleteTask} showEditForm={openEditForm} />

            {/* Modal untuk tambah/edit tugas */}
            <TaskForm
                show={showModal}
                handleClose={handleClose}
                addTask={addTask}
                editTask={editTask}
                taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default App;
