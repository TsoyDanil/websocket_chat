import React, {useState} from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { registerUser } from "../../Store/Services/usersSlice";
import Form from "../UI/Form/Form";
import MyAlert from "../UI/MyAlert/MyAlert";
import Spinner from "../UI/Spinner/Spinner";
import './Register.css';


const Register = (props) => {
    const {registerError, isLoading} = useSelector(state => state.users, shallowEqual);
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
        await dispatch(registerUser({
            userData: {...state}
        }));
    };

    return(
        <div className={props.registerState}>
            {isLoading ? <Spinner/> : null}
            {registerError && <MyAlert alertText={registerError.errors['username'].message}/>}
            <Form 
                btnText={'Registration'}
                formTitle={'Please register'}
                onSubmit={submitHandler}
                username={state.username}
                password={state.password}
                onChange={inputChangeHandler}
            />
        </div>
    );
};


export default Register;