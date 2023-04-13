import React from 'react';
import Button from '@mui/material/Button';
import Message from '../Message/Message';
import './ChatWindow.css';

const ChatWindow = (props) => {
    return (
        <div className='window'>
            <div className='ChatWindow'>
                <p className='ChatTitle'>Chat Room</p>
                {
                    props.messages.map((message, idx) => {
                        return (
                            <Message key={message?._id + idx} message={message?.message} author={message?.user.username || message.user}/>
                        )
                    })
                }
            </div>
            <form onSubmit={props.onSubmit} className='formMessage'>
                <input type="text" name="message" value={props.value} onChange={props.onChange}/>
                <Button type='submit' className='sendMessageBtn' color="secondary" variant="text">Send</Button>
            </form>
        </div>
    );
};


export default ChatWindow;