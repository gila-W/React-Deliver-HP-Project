import React from 'react'
import Packages from './components/package';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Customer from './components/customer';
import Invoice from './components/invoice';
import Layout from './components/layout';
import CreateInvoice from './components/createInvoice';

export default function Routing(props) {
    return (
        <Router>
            <Switch>
                <Route >
                    <Route path="/" ><Layout /></Route>
                    <Route path="/package"><Packages {...props} /></Route>
                    <Route path="/customer"><Customer {...props} /></Route>
                    <Route path="/invoice" ><Invoice {...props} /></Route>
                    <Route path="/createInvoice/id/:id/name/:name" ><CreateInvoice {...props} /></Route>
                </Route>

            </Switch>
        </Router>
    )
}
