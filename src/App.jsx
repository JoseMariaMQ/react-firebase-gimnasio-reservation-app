import React, {Fragment, useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Menu from "./components/Menu"
import Login from "./components/Login"
import InicioAdmin from "./components/InicioAdmin"
import InicioUser from "./components/InicioUser"
import Users from "./components/Users"
import Reservas from "./components/Reservas"
import {auth} from "./firebaseconfig"

function App() {

    const [usuario, setUsuario] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
    },[])

  return (
    <Fragment>
      <Router>
          <Menu/>
          <Switch>
              {/*<Route path="/login" component={Login}/>*/}
              {

                  usuario !== null ?
                      (
                          usuario === "user1@user1.com" ?
                              (
                                  <Switch>
                                      <Route exact path="/" component={InicioAdmin}/>
                                      <Route exact path="/users" component={Users}/>
                                      <Route exact path="/reservas" component={Reservas}/>
                                  </Switch>
                              )
                              :
                              (
                                  <Route exact path="/" component={InicioUser}/>
                              )
                      ) :
                      (
                          <Route exact path="/" component={Login}/>
                      )
              }
          </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
