import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../AxiosBaseUrl";

const namespace = 'users'

const initialState = {
    user: null,
    isLoading: false,
    registerStatus: null,
    error: false,
    registerError: null,
    global: null,
    loginError: null,
};

export const loginUser = createAsyncThunk(
    `${namespace}/loginUser`,
    async (payload, thunkApi) => {
        try {
            const res = await axios.post('/users/sessions', payload.userData);
            payload.navigate('/chat');
            return res.data;
        } catch (e) {
            if (e.response && e.response.data) {
                thunkApi.dispatch(usersSlice.actions.catchLoginError(e.response.data));
            } else {
                thunkApi.dispatch(usersSlice.actions.globalError(e));
            };
        };
    }
);

export const registerUser = createAsyncThunk(
    `${namespace}/registerUser`,
    async (payload, thunkApi) => {
        try {
            return await axios.post('/users', payload.userData).then(res => res.data);
        } catch (e) {
            if (e.response && e.response.data) {
                thunkApi.dispatch(usersSlice.actions.catchRegisterError(e.response.data));
            } else {
                thunkApi.dispatch(usersSlice.actions.globalError(e));
            };
        };
    }
);

export const userLogout = createAsyncThunk(
    `${namespace}/userLogout`,
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.token;
        
            const headers = {'Authorization': token};

            await axios.delete('users/sessions', {headers});
            thunkAPI.dispatch(usersSlice.actions.logoutUser());  
        } catch (error) {
            console.log(error);
        };
    }
);

const usersSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        getMessages: (state, action) => {
            state.messages = action.payload;
        },
        catchRegisterError: (state, action) => {
            state.registerError = action.payload;
        },
        catchLoginError: (state, action) => {
            console.log(action.payload);
            state.loginError = action.payload;
        },
        globalError: (state, action) => {
            state.global = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.loginError = null;
            state.global = null;
            state.registerError = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.user){
                state.registerStatus = action.payload.user;
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.loginError = null;
            state.global = null;
            state.registerError = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload){
                state.user = action.payload;
            }
        })
    }
});


export const {catchLoginError, catchRegisterError, globalError, logoutUser, getMessages} = usersSlice.actions;
export default usersSlice;