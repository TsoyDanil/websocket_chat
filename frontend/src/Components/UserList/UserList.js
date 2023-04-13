import React from "react";
import User from "../User/User";
import './UserList.css';


const UserList = (props) => {
    return (
        <div className="UserList">
            <p className="onlineUser">Online users</p>
            {
                props.users.length && props.users.map((user, idx) => {
                    return (
                        <User key={user._id + idx} user={user.username}/>
                    )
                })
            }
        </div>
    );
};


export default UserList;