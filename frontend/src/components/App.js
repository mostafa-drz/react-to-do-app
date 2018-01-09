import React, { Component } from 'react';
import '../stylesheets/app.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
class App extends Component {
  render() {
    return( 
      <BrowserRouter>
        <div className="body">
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
        </div>
      </BrowserRouter>);
  }
}

export default App;
