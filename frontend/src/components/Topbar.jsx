import React from 'react'
import { useSelector } from 'react-redux';

const Topbar = ({ setisMenuOpen, isMenuOpen }) => {
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

    return (
        <div className="p-3 flex justify-between bg-white dark:bg-zinc-950 rounded-2xl border-2 dark:border-zinc-800 border-zinc-200">
            <div className="flex gap-2 items-center ">
                <button className="p-2 rounded-xl bg-black dark:bg-white text-white dark:text-black">pic</button>
                <span className="font-semibold text-lg dark:text-white">{user?.name || 'User'}</span>
            </div>
            <div className="hidden md:flex relative items-center">
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill={"none"}
                >
                    <path
                        d="M17.5 17.5L22 22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
                <input
                    type="text"
                    name=""
                    id=""
                    className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button onClick={() => { setisMenuOpen(!isMenuOpen) }} className="md:hidden  text-black dark:text-white px-4 py-2 rounded-xl">
                <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                    <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <button className="hidden md:block px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
                Log out</button>
        </div>
    )
}

export default Topbar
