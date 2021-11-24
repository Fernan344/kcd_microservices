import React from "react";
import NavBar from "../Components/NavBar";
import Table from "../Components/Table"
const connection = require("../Recursos/Connection")

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        tuplas: [],
        columnas: ['ID', 'Mensaje', 'Id Emisor', 'Emisor', 'Id Receptor', 'Receptor', 'Fecha'],
        }     
    }

    componentDidMount(){
        (async () =>{
            setInterval(() => {
                fetch(connection.getConnectionAdmin()+'/getAll')
                    .then((response) => {
                        return response.json()
                    }).then((data) => {
                        console.log(data)
                        this.setState({
                            tuplas: data
                        })
                    })  
            }, 2000);
            
        })();

        
    }

    render() {
        return (
        <form>
            <NavBar/>
            <Table tuplas={this.state.tuplas} columnas={this.state.columnas}/>
        </form>
        );
    }
}

export default Admin;