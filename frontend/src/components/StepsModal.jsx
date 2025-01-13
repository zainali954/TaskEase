import React from "react";

const StepsPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 shadow-lg">
        {/* Header */}
        <div className="border-b dark:border-zinc-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
            How to Get Started
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition"
          >
            ✖
          </button>
        </div>
        
        {/* Steps */}
        <div className="p-6 space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="text-2xl text-purple-700 dark:text-purple-400 font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-zinc-200">
                Create a Category
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Go to the sidebar and click on the "Create Category" button to organize your tasks.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="text-2xl text-purple-700 dark:text-purple-400 font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-zinc-200">
                Add Labels
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Select a category, then click "Create Label" to define task-specific labels.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="text-2xl text-purple-700 dark:text-purple-400 font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-zinc-200">
                Create a Task
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Choose a label and click "Create Task" to add your task to the selected label.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t dark:border-zinc-700 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md transition"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepsPopup;
