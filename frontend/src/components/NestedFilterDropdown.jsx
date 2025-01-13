import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowDown01Icon, ArrowUp01Icon, FilterHorizontalIcon } from "hugeicons-react";

const NestedFilterDropdown = ({ onFilterSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null); // Tracks which category is open
  const dropdownRef = useRef(null); // Reference to the dropdown container

  const navigate = useNavigate();
  const { id: categoryId } = useParams(); // Get the current categoryId from the route
  const [searchParams, setSearchParams] = useSearchParams(); // Extract current query parameters

  const labelId = searchParams.get("labelId"); // Get labelId if it exists in the query

  const filters = {
    priority: ["low", "medium", "high"],
    status: ["Not Started", "In Progress", "Completed", "Overdue"],
    "startDate": "startDate", // Custom date input
    "dueDate": "dueDate", // Custom date input
  };

  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const toggleCategory = (category) => {
    if (openCategory === category) {
      setOpenCategory(null); // Close if the same category is clicked again
    } else {
      setOpenCategory(category); // Open the clicked category
    }
  };

  const handleOptionClick = async (filterCategory, filterOption) => {
    onFilterSelect(filterCategory, filterOption);
    setIsOpen(false);
    setOpenCategory(null); // Close dropdown after selection

    // Conditional Filtering Logic Based on Category or Label
    const filtersWithDates = { ...searchParams, startDate, dueDate };
    
    if (labelId) {
      navigate(
        `/user/dashboard/tasks/${categoryId}?labelId=${labelId}&${filterCategory}=${filterOption}&startDate=${startDate}&dueDate=${dueDate}`
      );
    } else if (categoryId) {
      navigate(
        `/user/dashboard/tasks/${categoryId}?${filterCategory}=${filterOption}&startDate=${startDate}&dueDate=${dueDate}`
      );
    }
  };

  const handleApplyFilters = () => {
    const filtersWithDates = { ...searchParams, startDate, dueDate };
    navigate(`/user/dashboard/tasks/${categoryId}?${new URLSearchParams(filtersWithDates)}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
        setOpenCategory(null); // Reset the open category
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex gap-1 rounded-xl px-4 py-2 bg-gray-300 dark:bg-zinc-700 hover:bg-white font-medium text-gray-800 hover:dark:bg-zinc-800 dark:text-gray-300"
      >
        <FilterHorizontalIcon size={22} variant={"stroke"} />
        Filter
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-56 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 z-10 transition-all duration-200 ease-in-out transform">
          {Object.keys(filters).map((category) => (
            <div key={category} className="mb-4">
              {/* Main Category Button */}
              <button
                onClick={() => toggleCategory(category)}
                className={`flex capitalize justify-between items-center w-full text-left px-2 py-1 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md font-semibold ${
                  openCategory === category
                    ? "bg-gray-100 dark:bg-zinc-700"
                    : ""
                }`}
              >
                {category}
                <span>
                  {openCategory === category ? (
                    <ArrowUp01Icon size={24} variant={"stroke"} />
                  ) : (
                    <ArrowDown01Icon size={24} variant={"stroke"} />
                  )}
                </span>
              </button>

              {/* Sub-options */}
              {openCategory === category && (
                <div className="pl-4 mt-2 max-h-64 overflow-y-auto">
                  {category === "startDate" || category === "dueDate" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category === "startDate" ? "Start Date" : "Due Date"}
                      </label>
                      <input
                        type="date"
                        value={category === "startDate" ? startDate : dueDate}
                        onChange={(e) =>
                          category === "startDate"
                            ? setStartDate(e.target.value)
                            : setDueDate(e.target.value)
                        }
                        className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                  ) : (
                    filters[category].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(category, option)}
                        className="block w-full text-left capitalize px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md"
                      >
                        {option}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            className="block w-full text-center mt-4 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply Filters
          </button>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setOpenCategory(null);
              setIsOpen(false);
              onFilterSelect(null, null); // Clear filters
            }}
            className="block w-full text-center mt-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default NestedFilterDropdown;
