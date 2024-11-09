import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://localhost:7294/API/AllTasks'); // Adjust the endpoint as needed
            console.log('API Response:', response.data); // Log the entire response for debugging

            if (response.data && Array.isArray(response.data.tasks)) {
                setTasks(response.data.tasks); // Set tasks from the response
            } else {
                toast.error('Unexpected response structure.');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const requestBody = {
                id: taskId // Use the taskId directly
            };

            const response = await axios.delete('https://localhost:7294/API/DeleteTask', { data: requestBody });

            if (response.data.status.code === 1) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Use functional update
                toast.success('Task deleted successfully!');
            } else {
                toast.error('Failed to delete task: ' + response.data.status.message);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <div className='row' style={{ marginTop: '40px' }}>
                <div className='col-md-9 my-3'>
                    <TaskForm setTasks={setTasks} /> {/* Pass setTasks to TaskForm */}
                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : (
                        <TaskList tasks={tasks} deleteTask={deleteTask} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;
