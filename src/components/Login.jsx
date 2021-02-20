import React, {useState, useEffect} from "react";
import {auth} from "../firebaseconfig";
import {useHistory} from 'react-router-dom'

const Login = () => {

    const historial = useHistory()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const  [msgError, serMsgError] = useState(null)

    const [usuario, setUsuario] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
    },[])

    const loginUsuario = (e) => {
        auth.signInWithEmailAndPassword(email, pass)
            .then((r) => {
                historial.push('/')
            })
            .catch((err) => {
                if (err.code === 'auth/wrong-password') serMsgError('Password incorrecta')
            })
    }

    return (
        <div className="row mt-3 ml-4 mr-4">
            <div className="col-lg-4 col-md-3 col-sm-2"/>
            <div className="col">
                <form className="form-group mb4">
                    <input onChange={(e) => {setEmail(e.target.value)}} placeholder="Usuario" type="email" className="form-control"/>
                    <input onChange={(e) => {setPass(e.target.value)}} placeholder="Contraseña" type="password" className="form-control mt-4"/>
                </form>
                <button onClick={loginUsuario} className="btn btn-success btn-block mb-4">INICIAR SESIÓN</button>
                {
                    msgError != null ?
                        (
                            <div className="alert-danger text-center">{msgError}</div>
                        ) :
                        (
                            <span/>
                        )
                }
            </div>
            <div className="col-lg-4 col-md-3 col-sm-2"/>
        </div>
    )
}

export default Login