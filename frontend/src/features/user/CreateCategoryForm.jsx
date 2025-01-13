import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../app/slices/taskSlice';

const CreateCategoryForm = ({ onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const dispatch = useDispatch()

    const colors = [
        '#A47E42', '#9B7EBD', '#009688', '#795548', '#ADA397', '#D2797F',
        '#8BC34A', '#BD5734', '#C08552', '#9E9E1C', '#FFAB91', '#607D8B'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryName && selectedColor) {
            dispatch(createCategory({ category_name : categoryName, color : selectedColor }))

            console.log(`Category Name: ${categoryName}, Selected Color: ${selectedColor}`);
            // Here, you would send the form data to your backend.
        } else {
            alert("Please fill out both the category name and select a color.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full md:w-96 border border-zinc-700">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-700 dark:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Create Category</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Category Name Input */}
                    <div className="mb-4">
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Color Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Choose Category Color
                        </label>
                        <div className="grid grid-cols-6 gap-4">
                            {/* 2 rows, 6 colors total */}
                            {colors.map((color, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="categoryColor"
                                        value={color}
                                        className="hidden"
                                        checked={selectedColor === color}
                                        onChange={() => setSelectedColor(color)}
                                    />
                                    <span
                                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Create Category Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        Create Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCategoryForm;
