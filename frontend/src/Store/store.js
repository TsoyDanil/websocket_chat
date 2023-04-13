import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './Services/usersSlice'
import messagesReducer from './Services/messagesSlice'

export const store = configureStore({
    reducer: {
            users: usersReducer.reducer,
            messages: messagesReducer.reducer
        }
    });