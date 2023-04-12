import React, {useState} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../Store/Services/usersSlice";
import Form from "../UI/Form/Form";
import MyAlert from "../UI/MyAlert/MyAlert";
import Spinner from "../UI/Spinner/Spinner";
import './Login.css';


const Login = ({loginState}) => {
    const {loginError, isLoading} = useSelector(state => state.users, shallowEqual);
    const navigate = useNavigate('/');
    const dispatch = useDispatch();

    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(loginUser({
            userData: {...state},
            navigate
        }));
    };

    return(
        <div className={loginState}>
            {isLoading ? <Spinner/> : null}
            {loginError && <MyAlert alertText={loginError.error}/>}
            <Form 
                btnText={'Login'}
                formTitle={'Please Login'}
                onSubmit={submitHandler}
                username={state.username}
                password={state.password}
                onChange={inputChangeHandler}
            />
        </div>
    );
};


export default Login;