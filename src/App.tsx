import "./App.css";

import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CountryDetails from "./details/detail.component";
import HomeComponent from './home/home.component';

class App extends Component {


render(){
    // let match  =  useRouteMatch();
    return(
        <div>
            <Router>
            <Switch>
              <Route  exact path="/" component={HomeComponent}></Route>
                <Route path="/:id" component={CountryDetails}></Route>
              </Switch>
            </Router>            
        </div>
    );
}


}

export default App;
