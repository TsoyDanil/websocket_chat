import React from "react";
import { userLogout } from "../../Store/Services/usersSlice";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './Header.css';


const Header = () => {    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.users, shallowEqual);

    const onClickLogoutHandler = () => {
        dispatch(userLogout());
        navigate({
            pathname: '/'
        });
    };


    return (
        <header className="header">
            <nav>
                <Navigation to={'/chat'} end>
                    <h1 className="headerTitle">Chat</h1>
                </Navigation>
            </nav>
            <nav className="pagination_header">
                {
                    user ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center','& > *': { m: 1,},}}>
                        <ButtonGroup variant="text" color="secondary" size="large" aria-label="text button group">
                            <Button className="btn_btnGrp"><Avatar sx={{ bgcolor: 'blueviolet'}} className='avatar'></Avatar>{user.username}</Button>
                            <Button className="btn_btnGrp" onClick={onClickLogoutHandler}>Logout</Button>
                        </ButtonGroup>
                    </Box> : <h2 className="noAuthenticated">Need to be authenticated</h2>
                }
            </nav>
        </header>
    );
};


export default Header;