import React, { Fragment ,useState,useEffect } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';
import Error from './componentes/Error';

function App() {

  const[busqueda,guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  });
  const [consultar,guardarConsultar] = useState(false);
  const [resultado,guardarResultado] = useState({});
  const [error,guardarError] = useState(false);

  
  const {ciudad,pais} = busqueda;

  useEffect(() => {
    const consultarApi = async() => {
      if(consultar){
        const appId = "837de784108467e325fe08140a820b1d";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false)
        }
      }
    }
    consultarApi();
  },[consultar,ciudad,pais]);

  let componente;
  if(error){
    componente = <Error mensaje= "City not found" />
  }else{
    componente =   <Clima 
                    resultado = {resultado}
                  /> 
  }


  return (
    <Fragment>
      <div>
        <Header 
          titulo = "React Clima"
        />  
      </div>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar = {guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
