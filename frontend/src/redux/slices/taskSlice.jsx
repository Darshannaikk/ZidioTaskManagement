import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('/api/tasks');
    return response.data;
});

// Async thunk to add a task
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await axios.post('/api/tasks', task);
    return response.data;
});

// Async thunk to update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
    const response = await axios.put(`/api/tasks/${task._id}`, task);
    return response.data;
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            });
    },
});

export default taskSlice.reducer;