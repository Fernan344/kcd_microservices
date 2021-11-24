import React from "react";
import socket from "../Recursos/Socket";
import ChatBar from "../Components/ChatBar";
import Chat from "../Components/Chat"
import Message from "../Components/Message"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Css/Principal.css'

const connection = require("../Recursos/Connection")

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cargado: false,
            accounts: [],
            actualChat: {"user": "", "id": ""},
            messages: []
        }  
        this.getUsers = this.getUsers.bind(this);
        this.changeChat = this.changeChat.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }   

    componentDidMount(){
        (async () =>{
            socket.on('receiveMessage', data=>{
                if(data.sended==true){
                    if((data.receptor==parseInt(sessionStorage.getItem("id")) && data.emisor==this.state.actualChat.id)
                        || (data.receptor==this.state.actualChat.id && data.emisor==parseInt(sessionStorage.getItem("id")))){
                        let messages = this.state.messages
                        let emisor = sessionStorage.getItem('user')
                        let newMessage = <Message name= {emisor} message={data.mensaje} time={data.fecha} isSender={true}/>
                        if(data.emisor==this.state.actualChat.id) newMessage = <Message name= {this.state.actualChat.user} message={data.mensaje} time={data.fecha} isSender={false}/>
                        
                        
                        messages.unshift(newMessage)
                        this.setState({
                            messages: messages
                        })
                    }
                }
            })
            
            socket.on('addUser', data=>{
                let accounts = this.state.accounts;
                accounts.unshift(data)
                this.setState({
                    accounts: accounts
                })
            })
        })();
        this.getUsers();
    }

    getUsers(){
        fetch(connection.getConnectionChat()+'/getUsers')
        .then((response) => {
            return response.json()
            }).then((data) => {
                this.setState({
                    cargado: true,
                    accounts: data,
                    actualChat: {"user": data[0].user, "id": data[0].id},
                })
            })
    }

    getMessages(user, id){
        let info = {idEmisor: parseInt(sessionStorage.getItem('id')), idReceptor: id}

        fetch(connection.getConnectionChat()+'/getMessages'
        , {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE',
                'Access-Control-Allow-Headers': ''
        },
        body: JSON.stringify(info) 
        }).then(res => res.json()).then((data) => {
            console.log(data)
            let mensajes = data.map(data => {
                let emisor = sessionStorage.getItem('user')
                let newMessage = <Message name= {emisor} message={data.mensaje} time={data.fecha} isSender={true}/>
                if(data.idEmisor==this.state.actualChat.id) newMessage = <Message name= {this.state.actualChat.user} message={data.mensaje} time={data.fecha} isSender={false}/>
                return newMessage
            })
            
            this.setState({
                messages: mensajes,
                actualChat: {"user": user, "id": id}
            })
        })
    }

    changeChat(user, id){
        this.getMessages(user, id);        
    }

    sendMessage(message){
        socket.emit('sendMessage', {message: message, emisor: parseInt(sessionStorage.getItem('id')), receptor: this.state.actualChat.id})
    }

    render() {        
        if(this.state.cargado===false){
            return(
                <form>
                    <div style={{textAlign: "center", marginTop: 250}}>
                        <div class="spinner-border text-light" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>           
                </form>
            )
        }  

        return (
            <form>    
                <div className="app">             
                    <div className="app_body">
                        <ChatBar account={sessionStorage.getItem("user")} id={sessionStorage.getItem("id")} accounts={this.state.accounts} change={this.changeChat}/> 
                        <Chat room={this.state.actualChat.user} id={this.state.actualChat.id} messages={this.state.messages} send={this.sendMessage}/>
                    </div>
                </div>         
            </form>
        );
    }
}

export default Principal;