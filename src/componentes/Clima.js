import React from 'react';

const Clima = ({resultado}) => {

    const {name,main,coord} = resultado;
    let kelvin = 273.15;

    if(!name) return null;
    return ( 
        <div className="card-panel white col s12">
            <h2>{name}</h2>
            
            <p>Temperatura actual :{parseFloat(main.temp -kelvin).toFixed(0)}<span>&#x2103;</span></p>
            <p>Latitud:{coord.lon}°</p>

        </div>
    );
}

export default Clima;