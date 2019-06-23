import React from 'react';
import Button from '@material-ui/core/Button';

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state= { clientes: []}
  }

  componentWillMount() {
    fetch(`http://localhost:8888/clientes`)
      .then( res => res.json())
      .then( cls => this.setState({clientes: cls}));
  }


    render() {

      
      if( this.state.clientes.length > 0 ) {
        return(
          <div className="clientesCSS">
              <h2>{this.props.titulo}</h2>
          
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                 <th>Nombre</th>
                 <th>Direccion</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
          <form method="post" action="http://localhost:8888/clientes">
            Ingrese nombre del cliente:
            <input type="text" name="nombre" size="50" id="nombre"/>
            <br/>
            Ingrese la direccion del cliente:
            <input type="text" name="direccion" size="10" id="direccion"/>
            <br/>
            <Button variant="contained" color="primary" >
               Aceptar
            </Button>
            </form>
        </div>)
      }
      else {
        return(
          <div className="clientesCSS">
              <h2>{this.props.titulo}</h2>
              CARGANDO
          </div>);  
      }

    }

    renderRows() {
      return this.state.clientes.map((unCliente, index) => {
        return (
          <tr key={unCliente._id}>
              <td>{unCliente.nombre}</td>
              <td>{unCliente.direccion}</td>
          </tr>
        );
      })
    }

    cargarCliente(){
      var cliente = {"nombre":document.getElementById("nombre").value,
                    "direccion":document.getElementById("direccion").value}
      console.log(JSON.stringify(cliente))
      fetch(`http://localhost:8888/clientes`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(cliente), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    }
  
  }



  export default Productos