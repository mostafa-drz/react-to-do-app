import React,{Component} from 'react';
import {connect} from 'react-redux';
import ToDoList from './ToDoList';
import {fetchToDos} from '../actions/todo';
import NewToDo from './NewToDo';
import '../stylesheets/dashboard.css';
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchToDos().catch((error)=>{
      console.log(error.message);
    });
  }
  render() {
    return (
      <div className="container body dashboard">
         <NewToDo/>
        <ToDoList/>
      </div>
    );
  }
}

export default connect(null,{fetchToDos})(Dashboard);