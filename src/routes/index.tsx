import React from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Station from '../pages/Station';
import Tank from '../pages/Tank';
import Island from 'src/pages/Island';
import Pump from '../pages/Pump';
import Hose from '../pages/Hose';
import "react-toastify/dist/ReactToastify.css";
const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/station" component={Station} />
            <Route exact path="/tank" component={Tank} />
            <Route exact path="/island" component={Island} />
            <Route exact path="/pump" component={Pump} />
            <Route exact path="/hose" component={Hose} />
        </Switch>
        <ToastContainer/>
    </BrowserRouter>
    )
}

export default Routes
