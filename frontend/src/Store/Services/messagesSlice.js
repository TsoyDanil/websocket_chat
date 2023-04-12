import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    messages: [],
    users: []
};


const messagesSlice = createSlice({
    name: 'messages',
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
        deleteOflineUser: (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload);
            state.users.splice(index, 1);
        }
    }
});


export const {getMessages, getAllMessages, getOnlineUser, deleteOflineUser} = messagesSlice.actions;
export default messagesSlice.reducer;