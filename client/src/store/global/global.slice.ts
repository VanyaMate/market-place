import {createSlice} from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        resetValue: true,
    },
    reducers: {
        globalReset: (state) => {
            state.resetValue = !state.resetValue;
        }
    }
})

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;