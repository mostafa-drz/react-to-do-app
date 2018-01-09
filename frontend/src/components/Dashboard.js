import React,{Component} from 'react';
import {connect} from 'react-redux';
import ToDOList from './ToDoList';
import ToDoList from './ToDoList';
import '../stylesheets/dashboard.css'
class Dashboard extends Component{
    render(){
        return(
            <div className='container body dashboard'><ToDoList/></div>
        );
    }
}

export default Dashboard;