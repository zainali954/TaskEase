import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../app/slices/taskSlice";
import { useParams } from "react-router-dom";

const CreateTaskForm = ({ onClose }) => {
    const { categories, labels } = useSelector((state) => state.task)
    const url = useParams();
    const id = url['*'].split('/')[1];
    const CurrentCategory = categories.find((cat)=> cat._id === id)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [priority, setPriority] = useState("low");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const dispatch = useDispatch()

    const handleLabelToggle = (label) => {
        setSelectedLabels((prev) =>
            prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
        );
    };

    const handleCreate = () => {
        dispatch(createTask( { 
            categoryId :id, 
            labelIds : selectedLabels, 
            title : title, 
            description, 
            startDate, 
            dueDate, 
            priority 
        }))



        console.log("Task Created:", {
            title,
            description,
            selectedLabels,
            priority,
            startDate,
            dueDate,
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md h-[90vh] overflow-y-auto shadow-lg border border-zinc-700">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-xl dark:text-gray-300">Create Task</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                        >
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Title Input */}
                <div className="mt-4">
                    <label htmlFor="title" className="block text-gray-700 dark:text-gray-200">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200"
                        placeholder="Enter task title"
                    />
                </div>

                {/* Description Input */}
                <div className="mt-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 dark:text-gray-200"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200"
                        placeholder="Enter task description"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="category" className="block text-gray-700 dark:text-gray-200">
                        Selected Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={CurrentCategory.category_name}
                        disabled
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200"
                        placeholder="Enter task title"
                    />
                </div>


                {/* Labels Checkboxes */}
                <div className="mt-4">
                    <label className="block text-gray-700 dark:text-gray-200">Labels</label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        {labels.map((label, index) => (
                            
                            <label
                                key={index}
                                className="flex items-center gap-2 text-purple-600 dark:text-purple-400"
                            >
                                <input
                                    type="checkbox"
                                    value={label._id}
                                    checked={selectedLabels.includes(label._id)}
                                    onChange={() => handleLabelToggle(label._id)}
                                    className="accent-purple-600 dark:bg-zinc-800"
                                />
                                <span>{label.label_name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Priority Radio Buttons */}
                <div className="mt-4">
                    <label className="block text-gray-700 dark:text-gray-200">Priority</label>
                    <div className="mt-2 flex gap-4">
                        {["low", "medium", "high"].map((level) => (
                            <label key={level} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="priority"
                                    value={level}
                                    checked={priority === level}
                                    onChange={() => setPriority(level)}
                                    className="accent-purple-600 dark:bg-zinc-800"
                                />
                                <span className="capitalize text-gray-700 dark:text-gray-200">
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Start Date & Due Date */}
                {/* Start Date & Due Date */}
                <div className="mt-4 flex gap-4">
                    <div className="w-1/2">
                        <label
                            htmlFor="start-date"
                            className="block text-gray-700 dark:text-gray-200"
                        >
                            Start Date & Time
                        </label>
                        <input
                            id="start-date"
                            type="datetime-local" // Changed type to datetime-local
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200"
                        />
                    </div>
                    <div className="w-1/2">
                        <label
                            htmlFor="due-date"
                            className="block text-gray-700 dark:text-gray-200"
                        >
                            Due Date & Time
                        </label>
                        <input
                            id="due-date"
                            type="datetime-local" // Changed type to datetime-local
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200"
                        />
                    </div>
                </div>


                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handleCreate}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-purple-700 dark:hover:bg-purple-600"
                    >
                        Create
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskForm;
