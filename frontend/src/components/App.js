import React, { Component } from 'react';
import '../stylesheets/app.css';
import Login from './Login';
class App extends Component {
  render() {
    return <div className="body">
        <Login />
      </div>;
  }
}

export default App;
