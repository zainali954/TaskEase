import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import labelModel from "../models/labelModel.js";
import taskModel from "../models/taskModel.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Helper function for validating ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new task
export const createTask = asyncHandler(async (req, res) => {
  console.log(req.body)
    const { categoryId, labelIds, title, description, startDate, dueDate, status,  priority } = req.body;

    // Step 1: Validate inputs
    if (!categoryId) {
        throw new apiError(400, "Category ID is required to create a task.");
    }

    if (!labelIds || !labelIds.length) {
        throw new apiError(400, "At least one label is required to create a task.");
    }
    if (!title) {
        throw new apiError(400, "Task title is required.");
    }

    // Step 2: Fetch the category
    const category = await categoryModel.findById(categoryId);
    if (!category) {
        throw new apiError(400, "Category not found.");
    }

    const invalidLabels = labelIds.filter(labelId => !category.labels.includes(labelId));
    if (invalidLabels.length > 0) {
        throw new apiError(400, `Invalid labels provided`);
    }

    // Step 3: Create the task
    const newTask = await taskModel.create({
        title,
        description,
        category: categoryId,
        labels: labelIds,
        startDate,
        dueDate,
        status,
        priority: priority || "low",
        user : req.user_id
    });

    // Step 4: Update each label with the new task ID
    await labelModel.updateMany(
        { _id: { $in: labelIds } },
        { $push: { tasks: newTask._id } }
    );

    // Step 5: Respond with success
    apiResponse.success(res, "Task created successfully", newTask, 201);
});

// Get all tasks
export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await taskModel.find({user : req.user_id});
    if (!tasks.length) {
        throw new apiError(404, 'Tasks not found.');
    }

    apiResponse.success(res, "Fetched Successfully.", tasks, 200);
});

export const getTasks = asyncHandler(async (req, res) => {
  const {
    status, isPinned, startDate, dueDate, labelId, categoryId, priority,
    sortBy = "startDate", order = "asc", page = 1, limit = 10
  } = req.query;

  if (categoryId && !isValidObjectId(categoryId)) {
    throw new apiError(400, "Failed to load Tasks. Invalid Id.");
  }


  const filter = {};

  if (status) filter.status = status;
  if (isPinned !== undefined) filter.isPinned = isPinned === "true"; 
  if (priority) filter.priority = priority;
  
  // Date filters
  if (startDate || dueDate) {
    filter.$and = [];
    if (startDate) filter.$and.push({ startDate: { $gte: new Date(startDate) } });
    if (dueDate) filter.$and.push({ dueDate: { $lte: new Date(dueDate) } });
  }

  if (labelId) filter.labels = { $in: [labelId] };
  if (categoryId) filter.category = categoryId; // Add categoryId filter
  filter.user = req.user_id

  // Pagination
  const skip = (page - 1) * limit;
  const sortOptions = { [sortBy]: order === "asc" ? 1 : -1 };

  console.log(filter);

  const tasks = await taskModel.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit))
    .select("-__v") // Exclude '__v' from the main task document
    .populate([
      {
        path: "labels", // Path to populate
        select: "label_name color -_id" // Include only 'label_name' and exclude '_id' in the populated labels
      },
      {
        path: "category", // Populate category
        select: "category_name -_id" // Include only 'category_name' and exclude '_id' in the populated category
      }
    ]);

  const totalTasks = await taskModel.countDocuments(filter);

  if (!tasks.length) {
    return apiResponse.success(
      res,
      "No tasks found for the given criteria.",
      {},
      200
    );
  }

  apiResponse.success(res, "Fetched Successfully.", {
    tasks,
    pagination: {
      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
      pageSize: Number(limit),
    },
  }, 200);
});


// Update a task by ID
export const updateTaskById = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { id } = req.params;
  const { title, description, startDate, dueDate, status, isPinned, priority } = req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid or missing Task ID.");
  }

  const task = await taskModel.findOne({ _id : id, user: req.user_id});
  if (!task) {
    throw new apiError(404, "Task not found.");
  }

  if (!title && !description && !startDate && !dueDate && !status && !isPinned && !priority) {
    throw new apiError(400, "At least one field is required to update the task.");
  }

  const updateFields = {
    ...(title && { title }),
    ...(description && { description }),
    ...(startDate && { startDate }),
    ...(dueDate && { dueDate }),
    ...(status && { status }),
    ...(isPinned && { isPinned }),
    ...(priority && { priority }),
  };

  // Update task fields and trigger `pre-save` middleware
  Object.assign(task, updateFields);
  const updatedTask = await task.save();

  apiResponse.success(res, "Task updated successfully.", updatedTask, 200);
});

export const deleteTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !isValidObjectId(id)) {
    throw new apiError(400, "Invalid Task ID.");
  }

  const task = await taskModel.findById(id);

  if (!task) {
    throw new apiError(404, "Task not found.");
  }

  // Check if the task belongs to the logged-in user
  if (task.user.toString() !== req.user_id) {
    throw new apiError(403, "Unauthorized: You cannot delete this task.");
  }

  // Remove the task reference from all labels' tasks array
  await labelModel.updateMany(
    { tasks: id },
    { $pull: { tasks: id } }
  );

  await taskModel.findByIdAndDelete(id);

  apiResponse.success(res, "Task deleted successfully.", {}, 200);
});

export const TaskStats = asyncHandler(async (req, res) => {
  const userId = req.user_id;

  const CompletedTasks = await taskModel.countDocuments({ user: userId, status: "Completed" });
  const upCommingTasks = await taskModel.countDocuments({ user: userId, status: "Not Started" });
  const InProgressTasks = await taskModel.countDocuments({ user: userId, status: "In Progress" });
  const OverdueTasks = await taskModel.countDocuments({ user: userId, status: "Overdue" });

  const stats = await taskModel.aggregate([
    // Match tasks for the logged-in user
    { $match: { user: userId } },
    // Group by category and count the tasks
    {
      $group: {
        _id: "$category",
        totalTasks: { $sum: 1 },
      },
    },
    // Lookup to fetch category details
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    // Unwind categoryDetails to simplify the structure
    {
      $unwind: {
        path: "$categoryDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    // Project the required fields
    {
      $project: {
        _id: 0,
        category_name: "$categoryDetails.category_name",
        createdAt: "$categoryDetails.createdAt",
        color: "$categoryDetails.color",
        totalTasks: 1,
      },
    },
  ]);

  const result = {
    CompletedTasks,
    upCommingTasks,
    InProgressTasks,
    OverdueTasks,
    stats,
  };

  apiResponse.success(res, "Fetched Successfully.", result, 200);
});
