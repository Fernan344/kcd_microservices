import React from "react";
import { Avatar } from "@material-ui/core";
import './Css/Account.css'

function ChatBar(props) {
    function change(){
        props.change(props.room, props.id)
    }

    return(
        <div className="chatPersonal" onClick={change}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${props.id}.svg`}/>
            <div className="chatInfo">
                <h2>{props.room}</h2>
                <p>{props.message}</p>
            </div>
        </div>
    )
}

export default ChatBar;