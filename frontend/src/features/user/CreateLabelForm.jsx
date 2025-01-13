import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLabel } from '../../app/slices/taskSlice';
import { useParams } from 'react-router-dom';

const CreateLabelForm = ({ onClose }) => {
    const url = useParams();

    const id = url['*'].split('/')[1];

    const [labelName, setLabelName] = useState('');
    const dispatch = useDispatch()

    const handleCreate = () => {
        if (labelName && id) {
            console.log("i hit")
            dispatch(createLabel({ categoryId: id, label_name: labelName }))
            onClose()
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-96 border border-zinc-700">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-xl dark:text-gray-300">Create Label</h3>
                    <button onClick={onClose} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Label Name Input */}
                <div className="mt-4">
                    <label htmlFor="label-name" className="block text-gray-700 dark:text-gray-200">Label Name</label>
                    <input
                        id="label-name"
                        type="text"
                        value={labelName}
                        onChange={(e) => setLabelName(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200"
                        placeholder="Enter label name"
                    />
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

export default CreateLabelForm;
