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
            const index = state.users.findIndex(user => user._id === action.payload);
            state.users.splice(index, 1);
        }
    }
});


export const {getMessages, getAllMessages, getOnlineUser, deleteOfflineUser} = messagesSlice.actions;
export default messagesSlice;