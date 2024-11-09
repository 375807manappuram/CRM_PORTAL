import React from 'react';

const TaskList = ({ tasks, deleteTask }) => {
    if (!Array.isArray(tasks)) {
        return <p>No tasks available.</p>;
    }

    return (
        <div style={{ marginTop: '-80px' }}>
            <h2 className='text-center'>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul className='list-group'>
                    {tasks.map((task) => {
                        // Check if the task object has the required properties
                        if (!task || !task.id || !task.title || !task.status || !task.assigned_emp || !task.description) {
                            return null; // Skip this task if it's not valid
                        }
                        return (
                            <li key={task.id} className='list-group-item d-flex justify-content-between align-items-center'>
                                <div>
                                    <h5>{task.title}</h5>
                                    <p>Status: {task.status}</p>
                                    <p>Assigned Employee ID: {task.assigned_emp}</p>
                                    <p>Description: {task.description}</p>
                                </div>
                                <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
