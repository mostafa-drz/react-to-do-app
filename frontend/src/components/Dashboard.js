import React,{Component} from 'react';
import {connect} from 'react-redux';
import ToDOList from './ToDoList';
import ToDoList from './ToDoList';
import {fetchToDos} from '../actions/todo';
import '../stylesheets/dashboard.css';
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchToDos();
  }
  render() {
    return (
      <div className="container body dashboard">
        <ToDoList/>
      </div>
    );
  }
}

export default connect(null,{fetchToDos})(Dashboard);