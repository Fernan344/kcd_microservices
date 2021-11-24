import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import './Css/Chat.css'

function Chat(props) {
    const [input, setInput] = useState("")

    function sendMessage(e){
        e.preventDefault();
        setInput("")
        props.send(input)
    }

    const handleOnChange = (e) => {
        setInput(e.target.value)
    }

    return(
        <div className="chat">            
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${props.id}.svg`}/>
                <div className="chat_header_info">
                    <h3>{props.room}</h3>
                </div>                
            </div>
            <div className="chat-body">
                {props.messages}
            </div>
            <div className="chat-footer">
                <form>
                    <input value={input} onChange={handleOnChange} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;