import React from "react";
import './Message.css';


const Message = (props) => {
    return (
        <div className="Message">
            <h3 className="author">{props.author}:</h3>
            <p className="authorMessage">{props.message}</p>
        </div>
    );
};


export default Message;