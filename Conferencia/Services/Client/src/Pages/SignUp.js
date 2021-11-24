import React from "react";
import socket from "../Recursos/Socket";
import NavSinSesion from "../Components/NavNoSession";
const connection = require("../Recursos/Connection")

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    }    
  }

  postLogin(){
    var nick = document.getElementById("nickSign").value
    var pass = document.getElementById("passSign").value
    const credenciales = {"user":nick, "password":pass}

    fetch(connection.getConnectionAdmission()+'/signup'
    , {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE',
        'Access-Control-Allow-Headers': ''
      },
      body: JSON.stringify(credenciales) 
    }).then(res => res.json()).then((data) => {
      if (data["auth"]===true){ 
        alert("Usuario Creado!!!")
        socket.emit('newUsuario', {"user": nick})
        window.location.href = "/login"
      }else{
        alert("Este Nombre De Usuario Ya Existe!!!")
      }
    })
  }

  render() {
    return (
      <form>
        <NavSinSesion/>
        <div class="container"> 
            <div class="abs-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                <div class="card w-75 bg-dark">
                    <div class="card-body text-light ">
                        <div class="form-group">
                            <label for="nickLogin">NickName</label>
                            <input
                            type="text"
                            class="form-control"
                            id="nickSign"
                            aria-describedby="emailHelp"
                            />
                            <small id="emailHelp" class="form-text text-muted">
                            We'll never share your email with anyone else.
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="passLogin">Password</label>
                            <input
                            type="password"
                            class="form-control"
                            id="passSign"
                            />
                        </div>
                        <button type="button" class="btn btn-outline-primary btn-lg btn-block" onClick={this.postLogin}>SIGN UP</button>  
                    </div>
                </div> 
            </div>       
        </div>
      </form>
    );
  }
}

export default SignUp;