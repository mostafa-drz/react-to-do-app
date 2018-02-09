import React, { Component } from 'react';
import '../stylesheets/app.css';
import { BrowserRouter, Route, Redirect,Switch } from "react-router-dom";
import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './Dashboard';
import Header from './header/Header';
import NotFound from './NotFound';
class App extends Component {
  render() {
    return( 
      <BrowserRouter>
        <div className="body">
          <Header/>
          <Switch>
            <Route  path="/login" component={Login}/>
            <Route  path="/signup" component={Signup}/>
            <Route  path="/dashboard" component={Dashboard}/>
            <Route  path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>);
  }
}

export default App;
