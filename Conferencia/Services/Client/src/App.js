import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Pagina from "./Pages/Pagina";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Admin from "./Pages/Admin"

function App() {

  let rutas = []
  if(sessionStorage.getItem("user")==null){
    rutas.push(<Route path="/principal" render={() => <Redirect to="/login" />} exact={true} />)   
    rutas.push(<Route path="/principalAdmin" render={() => <Redirect to="/login" />} exact={true} />) 
  }else{
    if(sessionStorage.getItem("tipo")=="U"){
      rutas.push(<Route path="/principalAdmin" render={() => <Redirect to="/principal" />} exact={true} />) 
      rutas.push(<Route path="/login" render={() => <Redirect to="/principal" />} exact={true} />) 
      rutas.push(<Route path="/signup" render={() => <Redirect to="/principal" />} exact={true} />) 
    }else{
      rutas.push(<Route path="/login" render={() => <Redirect to="/principalAdmin" />} exact={true} />) 
      rutas.push(<Route path="/signup" render={() => <Redirect to="/principalAdmin" />} exact={true} />) 
    }
  }

  return(
    

    <BrowserRouter>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/principal" component={Pagina} />
        <Route path="/principalAdmin" component={Admin} />
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
        {rutas}
    </BrowserRouter> 
  ); 
}

export default App;