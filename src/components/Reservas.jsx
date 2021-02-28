import React, {useState, useEffect} from "react"
import {store, auth} from "../firebaseconfig"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const Reservas = () => {

    const [reservas, setReservas] = useState([])
    const [Fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [phone, setPhone] = useState("")


    useEffect(() => {
        const getReservas = async () => {
            const {docs} = await  store.collection('reservas').orderBy('Fecha', 'asc').get()
            const nuevoArray = docs.map(item => ({id: item.id, ...item.data()}))
            setReservas(nuevoArray)
        }
        getReservas()
    },[])

    const borrarReserva = async (id) => {
        try {
            await store.collection('reservas').doc(id).delete()
            const {docs} = await store.collection('reservas').orderBy('Fecha', 'asc').get()
            const nuevoArray = docs.map(item => ({id: item.id, ...item.data()}))
            setReservas(nuevoArray)
        } catch (e) {
            console.log(e)
        }
    }

    const filtrarFecha = async (Fecha) => {
        if (Fecha !== '') {
            const fecha = new Date(Fecha.toLocaleString())
            fecha.setHours(0, 0, 0, 0)
            console.log(fecha)
            await store.collection('users').where('Fecha', '==', fecha).get()
                .then((query) => {
                    console.log(query.empty)
                    if (!query.empty) {
                        query.forEach((doc) => {
                            const {Fecha, nombre, apellidos, phone} = doc.data()
                            setNombre(nombre)
                            setApellidos(apellidos)
                            setPhone(phone)
                            setFecha(Fecha)
                        })
                    } else {
                        setNombre("")
                        setApellidos("")
                        setPhone("")
                        setFecha("")
                    }
                })
                .catch((e) => {
                    console.log('Error ', e)
                })
        } else {
            console.log('Introduce una fecha')
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="">RESERVAS</h2>
                </div>
                <div className="col-md-6 input-group-append">
                    <input value={Fecha} onChange={(e) => {setFecha(e.target.value)}} type="date" className="form-control"/>
                    <button onClick={(e) => {filtrarFecha(Fecha)}} className="btn btn-info mb-2"><FontAwesomeIcon icon={faSearch}/></button>
                </div>
            </div>
            <ul className="row mt-3 list-inline">
                {
                    reservas.length !== 0 ?
                        (
                            reservas.map(item => (
                                <li className="list-item border col-lg-4" key={item.id}>
                                    <div className="mt-2">
                                        <div className="text-center">{new Date(item.Fecha.seconds*1000).toDateString()}</div>
                                        <div className="text-center">{new Date(item.Fecha.seconds*1000).toLocaleTimeString()}</div>
                                        <div className="text-center">{item.nombre} {item.apellidos}</div>
                                        <div className="text-center">{item.telefono}</div>
                                    </div>
                                    <div className="mb-2 text-center">
                                        <button className="btn btn-primary btn-sm mr-2">MODIFICAR</button>
                                        <button onClick={(e) => {borrarReserva(item.id)}} className="btn btn-danger btn-sm">ELIMINAR</button>
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

export default Reservas