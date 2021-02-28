import React from 'react'
import {useHistory} from "react-router-dom";

const InicioAdmin = () => {

    const historial = useHistory()

    return (
        <div className="row mt-5 ml-4 mr-4">
            <div className="col-lg-4 col-md-3 col-sm-2"/>
            <div className="col">
                <button onClick={(e) => {historial.push('/reservas')}} className="btn btn-success btn-block btn-lg mb-4 p-5">RESERVAS</button>
                <button onClick={(e) => {historial.push('/users')}} className="btn btn-success btn-block btn-lg mb-4 p-5">USUARIOS</button>
            </div>
            <div className="col-lg-4 col-md-3 col-sm-2"/>
        </div>
    )
}

export default InicioAdmin