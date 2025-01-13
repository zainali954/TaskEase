import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync with localStorage for persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center gap-2 p-3 bg-zinc-200 dark:bg-zinc-700 rounded-md text-gray-800 dark:text-gray-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112.004 21c-5.385 0-9.75-4.365-9.75-9.75 0-4.555 3.072-8.404 7.3-9.533a.75.75 0 01.87.878 6.767 6.767 0 007.081 7.083.75.75 0 01.878.87 9.717 9.717 0 013.37 4.454z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.221 4.221l1.06 1.06M18.718 18.718l1.061 1.061M3 12h1.5M19.5 12H21M4.221 19.778l1.06-1.061M18.718 5.282l1.061-1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
          />
        </svg>
      )}
      <span>{isDarkMode ? "Night Mode" : "Light Mode"}</span>
    </button>
  );
};

export default ThemeToggle;
