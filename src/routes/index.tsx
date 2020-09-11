import React from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateHome from '../pages/Home';
import Create from '../pages/create'
import Edit from '../pages/edit'
import CreateStation from '../pages/create/Station';
import CreateDevice from '../pages/create/Device';
import CreateTank from '../pages/create/Tank';
import CreateIsland from '../pages/create/Island';
import CreatePump from '../pages/create/Pump';
import CreateHose from '../pages/create/Hose';
import EditDevice from '../pages/edit/Device';
import "react-toastify/dist/ReactToastify.css";
const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={CreateHome} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/edit" component={Edit} />
            <Route exact path="/create/station" component={CreateStation} />
            <Route exact path="/create/device" component={CreateDevice} />
            <Route exact path="/create/tank" component={CreateTank} />
            <Route exact path="/create/island" component={CreateIsland} />
            <Route exact path="/create/pump" component={CreatePump} />
            <Route exact path="/create/hose" component={CreateHose} />
            <Route exact path="/edit/device" component={EditDevice} />
        </Switch>
        <ToastContainer/>
    </BrowserRouter>
    )
}

export default Routes
