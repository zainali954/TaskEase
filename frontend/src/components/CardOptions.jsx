import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../app/slices/taskSlice";

const CardOptions = ({ type, taskId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        if(option === "Complete"){
            if(taskId){
                const data = {"status" : "Completed"}
                dispatch(updateTask({ taskId, data }))
            }
            console.log(`${option} clicked`);
            console.log(`${taskId} task ki id`);
        }

        if(option === "Edit"){
            console.log(`${option} clicked`);
            console.log(`${taskId} task ki id`);
        }

        if(option === "Delete"){
            console.log(`${option} clicked`);
            console.log(`${taskId} task ki id`);
        }

        setIsOpen(false); // Close the menu after an option is selected
    };


    return (
        <div className="relative inline-block text-left">
            {/* Dots Button */}
            <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 text-black dark:hover:text-white focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12a.75.75 0 100-1.5.75.75 0 000 1.5zM12 17.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                        {type === "task" && (
                            <>
                                <li>
                                    <button
                                        onClick={() => handleOptionClick("Complete")}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                                    >
                                        Complete
                                    </button>
                                </li>
                               
                            </>
                        )}
                        
                        <li>
                            <button
                                onClick={() => handleOptionClick("Edit")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                            >
                                Edit
                            </button>
                        </li>
                        
                        <li>
                            <button
                                onClick={() => handleOptionClick("Delete")}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-zinc-700"
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CardOptions;
