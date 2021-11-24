import React from 'react'

class NavVar extends React.Component {
    constructor(props) {
        super(props);  
    }

    render(){
      return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: 75, border: 10, borderColor: 'black'}}>
                <a class="navbar-brand" href="/Login" style={{marginLeft: 10}}>TALLER KCD</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/login">Login <span class="sr-only"></span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/signup">Sign Up <span class="sr-only"></span></a>
                        </li>
                    </ul>
                </div>
                <div style={{marginLeft: 0}}>
                    {this.props.comp}
                </div>
            </nav>
        </div>
      )
    }
  }

  
  
  export default NavVar