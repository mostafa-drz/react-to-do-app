import React, { Component } from 'react';
import '../stylesheets/app.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './auth/Login';
import Signup from './auth/Signup';
import RequireAuth from './auth/require_authentication_hoc';
import Dashboard from './Dashboard';
import Header from './header/Header';
class App extends Component {
  render() {
    return( 
      <BrowserRouter>
        <div className="body">
          <Header/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/dashboard" component={RequireAuth(Dashboard)}/>
        </div>
      </BrowserRouter>);
  }
}

export default App;
