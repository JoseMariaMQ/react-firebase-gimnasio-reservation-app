import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom"
import {auth} from "../firebaseconfig";

import { faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../img/img.png'

const Menu = () => {

    const historial = useHistory()
    const [usuario, setUsuario] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
    },[])

    const cerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/')
        window.location.reload(true)
    }

    return (
        <div>
            <nav className="row navbar navbar-expand-sm navbar-dark bg-dark">
                <img className="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-2 img-fluid" src={Logo} alt="logo"/>
                <ul className="col navbar-nav mx-auto mr-auto">
                    <li className="nav-item">
                        {
                            usuario !== null ?
                                (
                                    <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome}/></Link>
                                ) :
                                (
                                    <span/>
                                )
                        }
                    </li>
                    {/*<li className="nav-item">
                        {
                            usuario !== null ?
                                (
                                    usuario === "josemaria.munoz89@gmail.com" ?
                                        (
                                            <Link className="nav-link" to="/">RESERVAS</Link>
                                        ) :
                                        (
                                            <Link className="nav-link" to="/">MIS RESERVAS</Link>
                                        )
                                ) :
                                (
                                    <span/>
                                )
                        }
                    </li>
                    <li className="nav-item">
                        {
                            usuario !== null ?
                                (
                                    usuario === "josemaria.munoz89@gmail.com" ?
                                        (
                                            <Link className="nav-link" to="/users">USUARIOS</Link>
                                        ) :
                                        (
                                            <Link className="nav-link" to="/">RESERVAR</Link>
                                        )
                                ) :
                                (
                                    <span/>
                                )
                        }
                    </li>*/}
                </ul>
                {
                    usuario ?
                        (
                            <button onClick={cerrarSesion} className="btn btn-danger mr-3"><FontAwesomeIcon icon={faSignOutAlt}/></button>
                        ) :
                        (
                            <span/>
                        )
                }
            </nav>
        </div>
    )
}

export default Menu