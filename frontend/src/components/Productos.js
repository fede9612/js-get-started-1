import React from 'react';

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state= { productos: []}
  }

  componentWillMount() {
    fetch(`http://localhost:8888/productos`)
      .then( res => res.json())
      .then( prds => this.setState({productos: prds}));
  }

    render() {

      
      if( this.state.productos.length > 0 ) {
        return(
          <div className="productosCSS">
              <h2>{this.props.titulo}</h2>
          
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                 <th>Nombre</th>
                 <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>)
      }
      else {
        return(
          <div className="productosCSS">
              <h2>{this.props.titulo}</h2>
              CARGANDO
          </div>);  
      }

    }

    renderRows() {
      return this.state.productos.map((unProducto, index) => {
        return (
          <tr key={unProducto._id}>
              <td>{unProducto.nombre}</td>
              <td>{unProducto.precio}</td>
          </tr>
        );
      })
    }
  
  }



  export default Productos