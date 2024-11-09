import React, { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu'; // Assuming you want to keep the AdminMenu
import Loading from './Loading'; // Assuming you have a Loading component
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskForm = ({ setTasks }) => { // Accept setTasks as a prop
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedEmp, setAssignedEmp] = useState(''); // Changed to camelCase for consistency
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim() || !assignedEmp.trim()) {
            toast.error('Title, Description, and Assigned Employee ID are required');
            return;
        }

        const newTask = {
            title: title, // Use title as per backend requirement
            description: description, // Use description as per backend requirement
            assigned_emp: assignedEmp, // Use assigned_emp as per backend requirement
        };

        try {
            setLoading(true);
            const response = await axios.post('https://localhost:7294/API/TaskManagement', newTask);

            if (response.data.status.code === 1) {
                toast.success('New Task added successfully !!');
                setTasks((prevTasks) => [...prevTasks, response.data.task]); // Update tasks in parent component
                // Reset form fields
                setTitle('');
                setDescription('');
                setAssignedEmp('');
                fetchTasks();
            } else {
                toast.error('Error adding task: ' + response.data.status.message);
            }
        } catch (error) {
            console.error('Error adding task:', error);
            toast.error('An error occurred while adding the task.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className='container marginStyle' style={{ marginTop: '20px' }}>
            {!loading ? (
                <div className='container-fluid'>
                    <div className='row'>
                    <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9 my-3'>
                            <form onSubmit={handleSubmit}>
                                <h1 className='text-center'>Add Task</h1>
                                <div className='m-1'>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={title}
                                            placeholder='Task Title'
                                            className='form-control'
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={assignedEmp}
                                            placeholder='Assigned Employee ID'
                                            className='form-control'
                                            onChange={(e) => setAssignedEmp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <textarea
                                            value={description}
                                            placeholder='Task Description'
                                            className='form-control'
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <button className='btn btn-success' type='submit'>
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default TaskForm;

