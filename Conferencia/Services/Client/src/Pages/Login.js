import React from "react";
import NavSinSesion from "../Components/NavNoSession";
const connection = require("../Recursos/Connection")

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    }    
  }

  postLogin(){
    var nick = document.getElementById("nickLogin").value
    var pass = document.getElementById("passLogin").value
    const credenciales = {"user":nick, "password":pass}

    fetch(connection.getConnectionAdmission()+'/login'
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
        sessionStorage.setItem("user", nick)
        sessionStorage.setItem("id", data["id"])
        sessionStorage.setItem("tipo", data["tipo"])
        if(data["tipo"]==="U") window.location.href = "/principal"
        else  window.location.href = "/principalAdmin"
      }else{
        alert("Credenciales Incorrectas")
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
                            id="nickLogin"
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
                            id="passLogin"
                            />
                        </div>
                        <button type="button" class="btn btn-outline-primary btn-lg btn-block" onClick={this.postLogin}>LOGIN</button>  
                    </div>
                </div> 
            </div>       
        </div>
      </form>
    );
  }
}

export default Login;