import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import beachService from './beachService';

const initialState = {
    beaches: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const getBeaches = createAsyncThunk('beaches/getBeaches', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await beachService.getBeaches(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const beachSlice = createSlice({
    name: 'beach',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBeaches.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBeaches.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.beaches = action.payload;
            })
            .addCase(getBeaches.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = beachSlice.actions;
export default beachSlice.reducer;
