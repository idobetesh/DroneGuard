import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recordService from './recordService';

const initialState = {
    records: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const createRecord = createAsyncThunk('records/createRecord', async (record, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await recordService.createRecord(record, token);
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
            .addCase(createRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = recordSlice.actions;
export default recordSlice.reducer;
