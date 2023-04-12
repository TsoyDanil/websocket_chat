import React, {useState, useRef, useEffect} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getAllMessages, getMessages, getOnlineUser, deleteOflineUser } from "../../Store/Services/messagesSlice";
import UserList from "../../Components/UserList/UserList";
import ChatWindow from "../../Components/ChatWindow/ChatWindow";
import './Chat.css';


const Chat = () => {
    const ws = useRef(null);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const {user} = useSelector(state => state.users, shallowEqual);
    const {messages, users} = useSelector(state => state.messages, shallowEqual);
    
    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000/chat');
        ws.current.onopen = async () => {
            await ws.current.send(JSON.stringify({
                type:"OPEN_CHAT",
                user: user
            }));
            await ws.current.send(JSON.stringify({
                type:"GET_ALL_MESSAGES"
            }));
        };
        ws.current.onmessage = async (event) => {
            const decodedMessage = await JSON.parse(event.data);
            if(decodedMessage.type === "NEW_MESSAGES"){
                dispatch(getMessages(decodedMessage.message));
            };
            if(decodedMessage.type === "ALL_MESSAGES"){
                dispatch(getAllMessages(decodedMessage.allMessages));
            };
            if(decodedMessage.type === "OPEN_CHAT_USER"){
                dispatch(getOnlineUser(decodedMessage.user));
            };
            if(decodedMessage.type === 'CLOSED_CHAT_USER') {
                dispatch(deleteOflineUser(decodedMessage.id));
            };
        };

        return  () =>  {
            ws.current.send(JSON.stringify({
                type:"CLOSED_CHAT",
                user: user
            }));
        };
    }, [user, dispatch]);

    const onChangeHandler = (e) => {
        setMessage(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await ws.current.send(JSON.stringify({
            type:"CREATE_MESSAGE",
            user: {
                text: message,
                id: user._id
            }
        }));
    };

    return (
        <div className="Chat">
            <div className="Chat_users">
                <UserList users={users}/>
            </div>
            <div className="Chat_window">
                <ChatWindow
                    messages={messages}
                    onSubmit={onSubmitHandler}
                    value={message}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
};


export default Chat;