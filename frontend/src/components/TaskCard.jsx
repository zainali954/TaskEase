import React from "react";
import CardOptions from "./CardOptions";
import { formatDate } from "../utils/formateDate";
import { calculateProgress } from "../utils/calculateProgress";

const TaskCard = ({
  taskId,
  priority,
  title,
  description,
  startTime,
  endTime,
  status,
  tags,
}) => {
  const progress = calculateProgress(startTime, endTime);

  // Map status to background colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-400";
      case "In Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "Overdue":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "low":
        return "bg-yellow-500";
      case "medium":
        return "bg-orange-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`w-full ${getStatusColor(status)} rounded-xl`}>
      <div className="h-full w-full p-4 mt-1 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700">
        {/* Priority and Close Button */}
        <div className="flex justify-between items-start mb-2 mt-2">

          {/* Status */}
          <div className="space-x-1">
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(
                priority
              )} bg-opacity-35 text-black dark:text-white`}
            >
              {priority}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                status
              )} text-white`}
            >
              {status}
            </span>
          </div>
          <CardOptions type="task"  taskId={taskId}/>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Timeline */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(startTime)}</span>
            <span>{formatDate(endTime)}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${getStatusColor(status)}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>



        {/* Tag */}
        <div className="mt-4 space-x-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              style={{ backgroundColor: tag.color }}
              className="text-sm text-white px-3 py-1 rounded-full"
            >
              {tag.label_name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
