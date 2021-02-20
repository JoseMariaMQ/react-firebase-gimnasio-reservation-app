import React, {useState, useEffect} from "react"
import {store} from "../firebaseconfig";

import {faSearch, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Users = () => {

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        const getUsuarios = async () => {
            const {docs} = await  store.collection('users').get()
            const nuevoArray = docs.map(item => ({id: item.id, ...item.data()}))
            setUsuarios(nuevoArray)
        }
        getUsuarios()
    },[])

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-5">
                    <h4 className="col-7">USUARIOS</h4>
                </div>
                <div className="col input-group-append">
                    <input type="text" className="form-control" placeholder="Buscar"/>
                    <button type="submit" className="btn btn-info mb-1"><FontAwesomeIcon icon={faSearch}/></button>
                </div>
            </div>
            <ul className="row mt-3 list-inline">
                {
                    usuarios.length !== 0 ?
                        (
                            usuarios.map(item => (
                                <li className="list-item border col-lg-4" key={item.id}>
                                    <div className="text-center">{item.nombre}</div>
                                    <div className="text-center">{item.apellidos}</div>
                                    <div className="text-center">{item.email}</div>
                                    <div className="text-center mb-1">{item.telefono}</div>
                                    <button className="btn btn-primary btn-sm mr-2">MODIFICAR</button>
                                    <button className="btn btn-warning btn-sm mr-2">INHABILITAR</button>
                                    <button className="btn btn-danger btn-sm">ELIMINAR</button>
                                </li>
                            ))
                        ) :
                        (
                            <span>
                        No hay usuarios en tu agenda
                        </span>
                        )
                }
            </ul>
        </div>
    )
}

export default Users