import React,{Component} from 'react';
import {connect} from 'react-redux';
import ToDoList from './toDo/ToDoList';
import {fetchToDos} from '../actions/todo';
import NewToDo from './toDo/NewToDo';
import '../stylesheets/dashboard.css';
import Toggle from './Toggle';
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchToDos().catch((error)=>{
      console.log(error.message);
    });
  }
  render() {
    return (
      <div className="container body dashboard">
         <Toggle/>
         <NewToDo/>
        <ToDoList/>
      </div>
    );
  }
}

export default connect(null,{fetchToDos})(Dashboard);