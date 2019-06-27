import React from 'react';
import Button from '@material-ui/core/Button';

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state= { clientes: [], nombre: '', direccion: ''}    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cargarCliente = this.cargarCliente.bind(this);
  }
    
  estadoInicial() {
    return {nombre: '', direccion: ''};
  }
    
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
    
  componentWillMount() {
    this.actualizarLista();
  }

  actualizarLista(){
    fetch(`http://localhost:8888/clientes`)
      .then( res => res.json())
      .then( cls => this.setState({clientes: cls}));
  }

    render() {
      const formulario = 
      <form>
      Ingrese nombre del cliente:
      <input type="text" name="nombre" size="50" id="nombre"
             value={this.state.nombre} onChange={this.handleInputChange}/>
      <br/>
      Ingrese la direccion del cliente:
      <input type="text" name="direccion" size="10" id="direccion"
             value={this.state.direccion} onChange={this.handleInputChange}/>
      <br/>
      <Button variant="contained" color="primary" onClick={this.cargarCliente}>
         Aceptar
      </Button>
      </form>

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
          {formulario}
        </div>)
      }
      else {
        return(
          <div className="clientesCSS">
              <h2>{this.props.titulo}</h2>
              CARGANDO
              {formulario}
          </div> );  
      }

    }

    renderRows() {
      return this.state.clientes.map((unCliente, index) => {
        return (
          <tr key={unCliente._id}>
              <td>{unCliente.nombre}</td>
              <td>{unCliente.direccion}</td>
              <td>
                <Button variant="contained" color="primary" onClick={() => this.eliminarCliente(unCliente._id)}>
                 Eliminar
                </Button>
              </td>
          </tr>
        );
      })
    }

    cargarCliente(){      
      var cliente = {nombre:this.state.nombre,
                    direccion:this.state.direccion}
      console.log(JSON.stringify(cliente))
      fetch(`http://localhost:8888/clientes`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(cliente), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(() => this.setState(this.estadoInicial()))
      .then(() => this.actualizarLista())
    }

    eliminarCliente(idCliente){
      fetch(`http://localhost:8888/clientes/${idCliente}`, {
        method: 'DELETE', // or 'PUT'
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(() => this.actualizarLista())
    }
  
  }



  export default Productos