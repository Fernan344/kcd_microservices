import React from "react";
import "./Css/Logout.css"

function Logout(props) {
    function logOut(){
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('id')
        window.location.href = "/login"
    }

    return (
        <div className="logout">
            <button type="button" class="btn btn-outline-danger" onClick={logOut}>LogOut</button>
        </div>
    )
}

export default Logout;