import React, {useState, useEffect} from "react"
import {store, auth} from "../firebaseconfig"

import {faSearch, faSignOutAlt} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Users = () => {

    const [modoEdicion, setModoEdicion] = useState(null)
    const [usuarios, setUsuarios] = useState([])
    const [idUsuario, setIdUsuario] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [phone, setPhone] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [dni, setDni] = useState("")
    const [error, setError] = useState("")


    useEffect(() => {
        const getUsuarios = async () => {
            const {docs} = await  store.collection('users').orderBy('nombre', 'asc').get()
            const nuevoArray = docs.map(item => ({id: item.id, ...item.data()}))
            setUsuarios(nuevoArray)
        }
        getUsuarios()
    },[])

    const buscarUsuario = async (phone) => {
        await store.collection('users').where('telefono', '==', parseInt(phone)).get()
            .then((query) => {
                console.log(query.empty)
                if (!query.empty) {
                    query.forEach((doc) => {
                        const {nombre, apellidos, email, telefono} = doc.data()
                        setIdUsuario(doc.id)
                        setNombre(nombre)
                        setApellidos(apellidos)
                        setEmail(email)
                        setTelefono(telefono)
                    })
                } else {
                    setNombre("")
                    setApellidos("")
                    setEmail("")
                    setTelefono("")
                }
            })
            .catch((e) => {
                console.log('Error ', e)
            })
    }

    const modificarUsuario = async (id) => {
        try {
            const data = await store.collection('users').doc(id).get()
            const {nombre, apellidos, email, telefono, dni} = data.data()
            setNombre(nombre)
            setApellidos(apellidos)
            setEmail(email)
            setTelefono(telefono)
            setDni(dni)
            setIdUsuario(id)
            setModoEdicion(true)
        } catch (e) {
            console.log(e)
        }
    }

    const setUpdate = async (e) => {
        e.preventDefault()
        if (!nombre.trim()) {
            setError("El campo nombre está vacío")
        } else if (!apellidos.trim()) {
            setError("El campo apellidos está vacío")
        } else if (!email.trim()) {
            setError("El campo email está vacío")
        } else if (!telefono.trim()) {
            setError("El campo teléfono está vacío")
        } else if (!dni.trim()) {
            setError("El campo DNI está vacío")
        } else {
            const userUpdate = {
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                telefono: parseInt(telefono),
                dni: dni
            }
            try {
                await store.collection('users').doc(idUsuario).set(userUpdate)
                const {docs} = await store.collection('users').orderBy('nombre', 'asc').get()
                const nuevoArray = docs.map(item => ({id: item.id, ...item.data()}))
                setUsuarios(nuevoArray)
                alert('Usuario modificado')
                setNombre('')
                setApellidos('')
                setEmail('')
                setTelefono('')
                setDni('')
                setError('')
                setModoEdicion(false)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="">USUARIOS</h2>
                </div>
                <div className="col-md-6 input-group-append">
                    <input value={phone} onChange={(e) => {setPhone(e.target.value)}} type="number" className="form-control" placeholder="Buscar por teléfono"/>
                    <button onClick={(e) => {buscarUsuario(phone)}} className="btn btn-info mb-2"><FontAwesomeIcon icon={faSearch}/></button>
                </div>
            </div>
            {
                modoEdicion ?
                    (
                        <div>
                            <form onSubmit={setUpdate} className="form-group">
                                <input value={nombre} onChange={(e) => {setNombre(e.target.value)}} placeholder="Introduce el nombre" type="text" className="form-control mb-3"/>
                                <input value={apellidos} onChange={(e) => {setApellidos(e.target.value)}} placeholder="Introduce los apellidos" type="text" className="form-control mb-3"/>
                                <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Introduce el email" type="email" className="form-control mb-3"/>
                                <input value={telefono} onChange={(e) => {setTelefono(e.target.value)}} placeholder="Introduce el teléfono" type="number" className="form-control mb-3"/>
                                <input value={dni} onChange={(e) => {setDni(e.target.value)}} placeholder="Introduce el DNI" type="text" className="form-control mb-3"/>
                                <input value="ACTUALIZAR" type="submit" className="btn btn-warning btn-block"/>
                            </form>
                        </div>
                    ) :
                    (
                        <span/>
                    )
            }
            {
                error ?
                    (
                        <div>
                            <p className="alert-danger text-center">{error}</p>
                        </div>
                    ) :
                    (
                        <span/>
                    )
            }
            <ul className="row mt-3 list-inline justify-content-center">
                {
                    nombre.trim() && modoEdicion !== true ?
                        (
                            <li className="list-item border col-lg-4">
                                <div className="mt-2">
                                    <div className="text-center">{nombre}</div>
                                    <div className="text-center">{apellidos}</div>
                                    <div className="text-center">{email}</div>
                                    <div className="text-center mb-1">{telefono}</div>
                                </div>
                                <div className="mb-2 text-center">
                                    <button className="btn btn-primary btn-sm mr-2">MODIFICAR</button>
                                    <button className="btn btn-danger btn-sm">ELIMINAR</button>
                                </div>
                            </li>
                        ) :
                        (
                            <span/>
                        )
                }
            </ul>
            <ul className="row mt-3 list-inline">
                {
                    usuarios.length !== 0 ?
                        (
                            usuarios.map(item => (
                                <li className="list-item border col-lg-4" key={item.id}>
                                    <div className="mt-2">
                                        <div className="text-center">{item.nombre}</div>
                                        <div className="text-center">{item.apellidos}</div>
                                        <div className="text-center">{item.email}</div>
                                        <div className="text-center mb-1">{item.telefono}</div>
                                    </div>
                                    <div className="mb-2 text-center">
                                        <button onClick={(id) => {modificarUsuario(item.id)}} className="btn btn-primary btn-sm mr-2">MODIFICAR</button>
                                        <button className="btn btn-danger btn-sm">ELIMINAR</button>
                                    </div>
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