import {createSlice} from "@reduxjs/toolkit";

const namespace = 'messages'

const initialState = {
    messages: [],
    users: []
};


const messagesSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        getMessages: (state, action) => {
            state.messages.push(action.payload);
        },
        getAllMessages: (state, action) => {
            state.messages = action.payload;
        },
        getOnlineUser: (state, action) => {
            state.users = action.payload;
        },
        deleteOfflineUser: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload)
        }
    }
});


export const {getMessages, getAllMessages, getOnlineUser, deleteOfflineUser} = messagesSlice.actions;
export default messagesSlice;