import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@material-ui/core"
import LogOut from "./Logout"
import Chat from "./Account"
import "./Css/ChatBar.css"

function ChatBar(props) {
    return(
        <div className="chatBar">
            <div className="chatBar_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${props.id}.svg`}/>
                <h2>{props.account}</h2>
                <LogOut/>
            </div>
            <div className="chatBar_chats">
                {
                    props.accounts.map(data => {
                        return <Chat room={data["user"]} message="A message" id={data["id"]} change={props.change}/>
                    })
                }                
            </div>
        </div>
    )
}

export default ChatBar;