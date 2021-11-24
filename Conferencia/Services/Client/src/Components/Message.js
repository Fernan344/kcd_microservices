import React from "react";
import "./Css/Message.css"

function Message(props) {
    return (
        <div className="message">
            <p className={props.isSender ? "message_message message_receiver" : "message_message"}>                
                <span className="message_name">
                    {props.name}
                </span>
                {props.message}
                <span className="message_timestamp">
                    {props.time}
                </span>
            </p>
        </div>
    )
}

export default Message;