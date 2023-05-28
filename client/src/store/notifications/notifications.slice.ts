import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export enum NotificationType {
    ADD_TO_CART_ERROR,
}

export interface INotification {
    data: any,
    type: NotificationType,
    id?: number;
}

export interface INotifications {
    notifications: INotification[],
}

const initialState: INotifications = {
    notifications: [],
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        addNotification: (state: Draft<INotifications>, action: PayloadAction<INotification>) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state: Draft<INotifications>, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter(item => item.id !== action.payload);
        },
    }
});