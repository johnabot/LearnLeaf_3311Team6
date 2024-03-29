import React, { useState } from 'react';
import { addTask } from '/src/LearnLeaf_Functions.jsx';
import { useUser } from '/src/UserState.jsx';
import '/src/Components/FormUI.css';
import '/src/Components/PageFormat.css'

export function AddTaskForm({ initialSubject, initialProject, closeForm, refreshTasks }) {
    const { user } = useUser();
    // Initialize taskDetails with initialSubject if provided
    const [taskDetails, setTaskDetails] = useState({
        userId: user.id,
        subject: initialSubject || '', // Use initialSubject as the default value, or '' if not provided
        assignment: '',
        priority: '',
        status: '',
        startDate: '',
        dueDate: '',
        dueTime: '',
        project: initialProject || '', // Use initialProject as the default value, or '' if not provided
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask(taskDetails);
        closeForm();
        refreshTasks();
    };

    return (
        <div className="modal">
            <div className="add-form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="form-header">Add a New Task</h2>
                    <input type="text" id="subject" name="subject" value={taskDetails.subject} onChange={handleInputChange} placeholder="Subject" />
                    <input type="text" id="assignment" name="assignment" value={taskDetails.assignment} onChange={handleInputChange} placeholder="Assignment (Required)" required />

                    <div className="form-row">
                        <div className="form-control">
                            <select id="priority" name="priority" value={taskDetails.priority} onChange={handleInputChange}>
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <select id="status" name="status" value={taskDetails.status} onChange={handleInputChange}>
                                <option value="">Select Status</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-control">
                            <label htmlFor="startDateInput">Start Date:</label>
                            <input type="date" id="startDateInput" name="startDateInput" value={taskDetails.startDateInput} onChange={handleInputChange} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="dueDateInput">Due Date:</label>
                            <input type="date" id="dueDateInput" name="dueDateInput" value={taskDetails.dueDateInput} onChange={handleInputChange} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="dueTimeInput">Time Due:</label>
                            <input type="time" id="dueTimeInput" name="dueTimeInput" value={taskDetails.dueTimeInput} onChange={handleInputChange} />
                        </div>
                    </div>

                    <input type="text" id="project" name="project" value={taskDetails.project} onChange={handleInputChange} placeholder="Project Name" />

                    <button type="submit">Add Task</button>
                    <button type="button" onClick={() => closeForm()}>Cancel</button>
                </form>
            </div>
        </div>
    );

};
