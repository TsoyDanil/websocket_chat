import React from "react";
import './Message.css';


const Message = ({author, message}) => {
    return (
        <div className="Message">
            <h3 className="author">{author}:</h3>
            <p className="authorMessage">{message}</p>
        </div>
    );
};


export default Message;