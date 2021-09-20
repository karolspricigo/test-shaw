import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserListing from './pages/userprin';
import UserDetails from './pages/userdetails';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>

                <Route exact path="/" component={UserListing}/>
                <Route exact path="/:username/details" component={UserDetails}/>
            </Switch>
        </BrowserRouter>
    );
}