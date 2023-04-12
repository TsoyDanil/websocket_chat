import React, {useState} from "react";
import Register from "../../Components/Register/Register";
import Login from "../../Components/Login/Login";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './Authentication.css';



const Authentication = () => {
    const [state, setState] = useState({
        isRegister: 'active',
        isLogin: 'no-active'
    });

    const handleChange = (e) => {
        if(e.target.value === 'register') {
            setState(prevState => ({...prevState, isLogin: 'no-active', isRegister: 'active'}));
        } else {
            setState(prevState => ({...prevState, isLogin: 'active', isRegister: 'no-active'}));
        };
    };

    return(
        <div className="Authentication">
            <div className="Authentication_pagination">
            <FormControl>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="register" name="radio-buttons-group">
                    <FormControlLabel onClick={handleChange} sx={{color: 'blueviolet', textShadow: '0px 0px 20px blueviolet'}} value="register" control={<Radio color="secondary"/>} label="Register" />
                    <FormControlLabel onClick={handleChange} sx={{color: 'blueviolet', textShadow: '0px 0px 20px blueviolet'}} value="login" control={<Radio color="secondary"/>} label="Login" />
                </RadioGroup>
            </FormControl>
            </div>
            <Register registerState={state.isRegister}/>
            <Login loginState={state.isLogin}/>
        </div>
    );
};


export default Authentication;