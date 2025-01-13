import React, { useEffect, useState } from 'react';
import CardOptions from '../../components/CardOptions';
import AnlyticsCard from '../../components/AnlyticsCard';
import { 
    Calendar03Icon, 
    CheckmarkBadge03Icon, 
    DashboardSquare01Icon, 
    HourglassOffIcon, 
    Time04Icon 
} from "hugeicons-react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../app/slices/taskSlice';
import { formatDate } from '../../utils/formateDate';
import StepsPopup from '../../components/StepsModal';

const Home = ({ OpenTaskForm }) => {
    const { user } = useSelector((state) => state.auth);
    const { stats } = useSelector((state) => state.task);
    const [categories, setCategories] = useState([]);
    const [getStarted, setGetStarted] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        if (stats?.stats) {
            setCategories(stats.stats);
        }
    }, [stats?.stats]);

    return (
        <div id="home">
            {/* Welcome Section */}
            {getStarted && <StepsPopup onClose={()=>setGetStarted(!getStarted)}/>}
            <div className="flex items-center justify-between mt-12">
                <div className="flex items-baseline flex-col md:flex-row gap-2">
                    <h2 className="font-bold text-3xl text-gray-800 dark:text-gray-200">
                        Hello {user?.name || 'User'}!
                    </h2>
                    <p className="text-sm font-thin text-gray-600 dark:text-gray-400">
                        It's good to see you again.
                    </p>
                </div>
                <button 
                    onClick={()=>setGetStarted(!getStarted)} 
                    className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-600 text-white font-normal flex gap-1 items-center"
                >
                    <span>New Task</span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width={18} 
                        height={18} 
                        color="#ffffff" 
                        fill="none"
                    >
                        <path 
                            d="M12 4V20M20 12H4" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </svg>
                </button>
            </div>

            {/* Quick Analytics Section */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Quick Analytics</h3>
                <p className="text-gray-700 dark:text-gray-500 pt-2">
                    Stay updated with your progress across tasks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                    <AnlyticsCard
                        backgroundColor="#8EEFB5"
                        mainColor="#15B569"
                        icon={CheckmarkBadge03Icon}
                        title="Completed Tasks"
                        quantity={stats?.CompletedTasks || "0"}
                    />
                    <AnlyticsCard
                        backgroundColor="#8CC4FF"
                        mainColor="#007BFF"
                        icon={Calendar03Icon}
                        title="Upcoming Tasks"
                        quantity={stats?.upCommingTasks || "0"}
                    />
                    <AnlyticsCard
                        backgroundColor="#FBD88B"
                        mainColor="#FFC107"
                        icon={Time04Icon}
                        title="In-Progress Tasks"
                        quantity={stats?.InProgressTasks || "0"}
                    />
                    <AnlyticsCard
                        backgroundColor="#FAA5B8"
                        mainColor="#FF4400"
                        icon={HourglassOffIcon}
                        title="Overdue Tasks"
                        quantity={stats?.OverdueTasks || "0"}
                    />
                </div>
            </div>

            {/* Categories Section */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Quick Overview</h3>
                <p className="text-gray-700 dark:text-gray-500 pt-2">
                    Here’s a breakdown of your tasks across all categories.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                    {categories.length > 0 ? (
                        categories.map((cat, i) => (
                            <div 
                                key={i}
                                style={{backgroundColor : cat.color}}
                                className="relative rounded-2xl p-4 border border-[#15B569] border-opacity-30"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-semibold text-gray-950">
                                        {cat.category_name || "Category Name"}
                                    </h4>
                                    <CardOptions type="category" />
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <h5 className="text-5xl font-bold">
                                        {cat.totalTasks || "N/A"}
                                    </h5>
                                    <span className="text-thin text-zinc-800">Tasks</span>
                                </div>
                                <h4 className="text-base font-normal">{formatDate(cat.createdAt)}</h4>
                                <DashboardSquare01Icon
                                    className="absolute right-0 bottom-0 text-white text-opacity-40"
                                    size={80}
                                    variant="stroke"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">
                            No categories available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
