import React from "react";
import User from "../User/User";
import './UserList.css';


const UserList = ({users}) => {
    return (
        <div className="UserList">
            <p className="onlineUser">Online users</p>
            {
                users.map((user, idx) => {
                    return (
                        <User key={user._id + idx} user={user.username}/>
                    )
                })
            }
        </div>
    );
};


export default UserList;