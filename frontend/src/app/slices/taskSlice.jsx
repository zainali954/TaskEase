import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

const errorMessageHandler = (error) =>
  error.response?.data?.message || error.message || "An unexpected error occurred";

// Async thunks for fetching and modifying data
export const fetchCategories = createAsyncThunk("data/fetchCategories", async (_, thunkAPI) => {
  try {
    const response = await apiClient.get("/categories");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

export const fetchLabels = createAsyncThunk("data/fetchLabels", async (id, thunkAPI) => {
  try {
    const response = await apiClient.get(`/labels/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

export const fetchTasks = createAsyncThunk("data/fetchTasks", async (url, thunkAPI) => {
  try {
    const response = await apiClient.get(`/tasks?${url}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

export const fetchStats = createAsyncThunk("data/fetchStats", async (_, thunkAPI) => {
  try {
    const response = await apiClient.get("/tasks/stats");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

export const createCategory = createAsyncThunk("data/createCategory", async (data, thunkAPI) => {
  try {
    const response = await apiClient.post("/categories", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

export const createLabel = createAsyncThunk("data/createLabel", async (data, thunkAPI) => {
  try {
    const response = await apiClient.post("/labels", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

export const createTask = createAsyncThunk("data/createTask", async (data, thunkAPI) => {
  try {
    const response = await apiClient.post("/tasks", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

export const updateTask = createAsyncThunk("data/updateTask", async ({ taskId, data }, thunkAPI) => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorMessageHandler(error));
  }
});

// Initial state
const initialState = {
  categories: [],
  labels: [],
  tasks: [],
  stats: {},
  pagination: {},
  loading: false,
  isError: false,
  message: "",
};

// Slice definition
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        localStorage.setItem("categories", JSON.stringify(action.payload.data));
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
      })
      .addCase(fetchLabels.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.loading = false;
        state.labels = action.payload.data;
        localStorage.setItem("labels", JSON.stringify(action.payload.data));
      })
      .addCase(fetchLabels.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data.tasks;
        state.pagination = action.payload.data.pagination;
        localStorage.setItem("tasks", JSON.stringify(action.payload.data));
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
      })
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
        localStorage.setItem("stats", JSON.stringify(action.payload.data));
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = [...(state.categories || []), action.payload.data];
        localStorage.setItem("categories", JSON.stringify(state.categories));
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        state.labels = [...(state.labels || []), action.payload.data];
        localStorage.setItem("labels", JSON.stringify(state.labels));
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = [...(state.tasks || []), action.payload.data];
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.data;
        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      });
  },
});

export default dataSlice.reducer;
