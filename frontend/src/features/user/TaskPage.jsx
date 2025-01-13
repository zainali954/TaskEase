import { PlusSignIcon } from 'hugeicons-react';
import React, { useEffect, useState } from 'react';
import TaskCard from '../../components/TaskCard';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLabels, fetchTasks } from '../../app/slices/taskSlice';
import FilterDropdown from '../../components/FilterTasks';
import CreateTaskForm from './CreateTaskForm';

const TaskPage = ({ OpenLabelForm }) => {
    const { labels, tasks, categories } = useSelector((state) => state.task);
    const { id } = useParams(); // Category ID from URL
    const [searchParams, setSearchParams] = useSearchParams(); // Query params
    const dispatch = useDispatch();

    const currentCategory = categories.find((cat) => cat._id === id);
    const activeLabel = searchParams.get('labelId'); // Active label filter
    const filters = Object.fromEntries([...searchParams]); // Extract all filters from query params


    // Check if `labelId` exists in filters
    let fullUrl;

    if (filters.labelId) {
        // If `labelId` exists, include it in the URL
        const otherFilters = Object.entries(filters)
            .filter(([key]) => key !== "labelId") // Exclude labelId from other filters
            .map(([key, value]) => `${key}=${value}`) // Format as key=value
            .join("&"); // Join with &

        fullUrl = `categoryId=${id}&labelId=${filters.labelId}${otherFilters ? `&${otherFilters}` : ""}`;
    } else {
        // If `labelId` does not exist, include only other filters
        const otherFilters = Object.entries(filters)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        fullUrl = `categoryId=${id}${otherFilters ? `&${otherFilters}` : ""}`;
    }



    useEffect(() => {
        dispatch(fetchLabels(id)); // Fetch labels for the current category
        dispatch(fetchTasks(fullUrl)); // Fetch tasks with all filters
    }, [id, searchParams]);

    const handleLabelClick = (labelID) => {
        if (labelID) {
            // Set only the labelId in the search params, removing all other filters
            setSearchParams({ labelId: labelID });
        } else {
            // Clear all filters if no labelID is provided
            setSearchParams({});
        }
    };


    // Handle filter changes from FilterDropdown
    const handleFilterChange = (newFilters) => {
        setSearchParams({ ...filters, ...newFilters });
    };

    const [isTaskFormOpen, setisTaskFormOpen] = useState(false)
    const OpenTaskForm = () => { setisTaskFormOpen(!isTaskFormOpen) }

    return (
        <div>
            {isTaskFormOpen && <CreateTaskForm labels={labels} onClose={() => setisTaskFormOpen(!isTaskFormOpen)} />}

            <h2 className="font-bold text-3xl text-gray-800 mt-8 dark:text-gray-200">
                {currentCategory?.category_name || "Category Name"}
            </h2>

            <div className="flex flex-wrap items-center gap-6 mt-8">
                {/* All Label Button */}
                <button
                    onClick={() => handleLabelClick(null)} // Clear label filter
                    className={`text-gray-800 dark:text-gray-300 font-medium border-b-2 ${!activeLabel ? 'border-purple-700' : 'border-gray-100 dark:border-zinc-900'
                        } hover:border-purple-600 hover:text-purple-800 dark:hover:border-purple-600 dark:hover:text-purple-600`}
                >
                    All
                </button>

                {/* Labels */}
                {labels.map((label) => (
                    <button
                        key={label._id}
                        onClick={() => handleLabelClick(label._id)}
                        className={`text-gray-800 dark:text-gray-300 font-medium border-b-2 ${activeLabel === label._id ? 'border-purple-700' : 'border-gray-100 dark:border-zinc-900'
                            } hover:border-purple-600 hover:text-purple-800 dark:hover:border-purple-600 dark:hover:text-purple-600`}
                    >
                        {label.label_name}
                    </button>
                ))}

                {/* Create Label Button */}
                <button
                    onClick={OpenLabelForm}
                    className="flex items-center border-2 border-dotted border-purple-900 bg-purple-300 dark:bg-purple-900 dark:text-gray-100 hover:dark:bg-purple-800 text-black px-4 py-2 rounded-xl font-medium hover:bg-purple-400"
                >
                    New Label
                    <PlusSignIcon className="ml-2" size={20} variant={"stroke"} />
                </button>
            </div>

            {/* toolbar */}
            <div className="mt-6">
                <h4 className="text-2xl font-medium text-gray-800 dark:text-gray-300">Tasks</h4>
                <div className="flex justify-between items-center mt-4">
                    <div className="rounded-xl flex gap-1 p-1 bg-gray-300 dark:bg-zinc-700">
                        <button className="flex gap-1 rounded-lg px-4 py-2 bg-white dark:bg-zinc-900 font-medium text-gray-800 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" /></svg>
                            Board
                        </button>
                        <button className="flex gap-1 rounded-lg px-4 py-2 hover:bg-white hover:dark:bg-zinc-900 font-medium text-gray-800 dark:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-table"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 11h4a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-2a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-6a1 1 0 0 1 1 -1z" /><path d="M21 12v6a3 3 0 0 1 -2.824 2.995l-.176 .005h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1z" /><path d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v2a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h6z" /><path d="M9 4v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a3 3 0 0 1 2.824 -2.995l.176 -.005h2a1 1 0 0 1 1 1z" /></svg>
                            Table
                        </button>
                    </div>

                    <div className="rounded-xl flex  gap-1 p-1">
                        <FilterDropdown />
                        <button onClick={OpenTaskForm} className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-600 text-white font-normal flex gap-1 items-center">
                            <span>New task</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#ffffff"} fill={"none"}>
                                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tasks Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            taskId={task._id}
                            priority={task.priority || "Low"}
                            title={task.title || "No Title"}
                            description={task.description || "No Description"}
                            startTime={task.startDate || "N/A"}
                            endTime={task.dueDate || "N/A"}
                            status={task.status || "N/A"}
                            tags={task.labels || ["N/A"]}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-4">No tasks found</p>
                )}
            </div>
        </div>
    );
};

export default TaskPage;
