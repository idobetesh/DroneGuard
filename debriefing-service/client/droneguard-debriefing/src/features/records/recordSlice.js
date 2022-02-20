import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recordService from './recordService';


const initialState = {
    records: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getRecords = createAsyncThunk('records/getAllRecords', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await recordService.getRecords(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteRecord = createAsyncThunk('records/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await recordService.deleteRecord(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const addComment = createAsyncThunk('records/comment', async (newComment, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await recordService.addComment(newComment, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});


export const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecords.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.records = action.payload;
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.records = state.records.filter((record) => record._id !== action.payload._id);
            })
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
    }
});

export const { reset } = recordSlice.actions;
export default recordSlice.reducer;