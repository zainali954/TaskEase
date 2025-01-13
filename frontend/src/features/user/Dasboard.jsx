import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../app/slices/authSlice';
import { logout } from '../auth/asyncThunks';
import { Route, Routes, useNavigate } from 'react-router-dom';

import UserSidebar from '../../components/UserSidebar';
import Topbar from '../../components/Topbar';
import Home from './Home';
import TaskPage from './TaskPage';
import CreateTaskForm from './CreateTaskForm';
import CreateCategoryForm from './CreateCategoryForm';
import CreateLabelForm from './CreateLabelForm';
import { fetchCategories, fetchStats } from '../../app/slices/taskSlice';


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);
  const { categories, stats } = useSelector((state) => state.task)


  useEffect(() => {
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(true));
    navigate('/');
  };
  const [isMenuOpen, setisMenuOpen] = useState(false)

  const [isCategoryFormOpen, setisCategoryFormOpen] = useState(false)
  const [isLabelFormOpen, setisLabelFormOpen] = useState(false)
  // const [isTaskFormOpen, setisTaskFormOpen] = useState(false)

  // const categories = ["Work", "Personal", "Urgent"];
  const labels = ["Bug", "Feature", "Improvement"];
  const OpenCategoryForm = () => { setisCategoryFormOpen(!isCategoryFormOpen) }
  const OpenLabelForm = () => { setisLabelFormOpen(!isLabelFormOpen) }
  // const OpenTaskForm = () => { setisTaskFormOpen(!isTaskFormOpen) }

  useEffect(() => {
    // Fetch categories only if not already loaded

      dispatch(fetchStats())

    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (

    //  <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    // //   <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
    // //     <h1 className="text-3xl font-bold text-purple-700 text-center">Dashboard</h1>
    // //     <p className="text-gray-500 text-center mt-2">Welcome back, {user.name || "guest"}!</p>

    // //     {/* User Details Card */}
    // //     <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
    // //       <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
    // //       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
    // //         <div>
    // //           <p className="text-sm font-medium text-gray-500">Full Name</p>
    // //           <p className="text-lg font-semibold text-gray-800">{user.name || "guest"}</p>
    // //         </div>
    // //         <div>
    // //           <p className="text-sm font-medium text-gray-500">Email Address</p>
    // //           <p className="text-lg font-semibold text-gray-800">{user.email || "email"}</p>
    // //         </div>
    // //         <div>
    // //           <p className="text-sm font-medium text-gray-500">Account Created</p>
    // //           <p className="text-lg font-semibold text-gray-800">{user.createdAt}</p>
    // //         </div>

    // //       </div>
    // //     </div>

    // //     {/* Action Buttons */}
    // //     <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
    // //       <button className="w-full sm:w-auto bg-purple-700 text-white py-3 px-6 rounded-lg shadow-md hover:bg-purple-800 transition">
    // //         Edit Profile
    // //       </button>
    // //       <button onClick={handleLogout} className="w-full sm:w-auto bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition">
    // //         Logout
    // //       </button>
    // //     </div>
    // //   </div>
    // </div>
    <>

      {isCategoryFormOpen && <CreateCategoryForm onClose={() => setisCategoryFormOpen(!isCategoryFormOpen)} />}
      {isLabelFormOpen && <CreateLabelForm onClose={() => setisLabelFormOpen(!isLabelFormOpen)} />}
      {/* {isTaskFormOpen && <CreateTaskForm labels={labels} onClose={() => setisTaskFormOpen(!isTaskFormOpen)} />} */}

      {/* sidebar */}
      <div className="flex dark:bg-zinc-950">



        <UserSidebar isMenuOpen={isMenuOpen}  setisMenuOpen={setisMenuOpen} OpenCategoryForm={OpenCategoryForm} />

        {/* main content */}
        <div className="flex-1 min-h-screen  bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-4 m-2 md:m-4  md:ms-64">

          {/* navbar */}
          <Topbar isMenuOpen={isMenuOpen} setisMenuOpen={setisMenuOpen} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/tasks/:id"
              element={<TaskPage OpenLabelForm={OpenLabelForm} />}
            />

          </Routes>

        </div>
      </div>

    </>

  );
};

export default Dashboard;
