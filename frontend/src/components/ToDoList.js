import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchToDos} from '../actions/todo';

class ToDoList extends Component{
    componentDidMount(){
        this.props.fetchToDos();
    }
    render(){
        return(
            <div className="todolist">
                here is tod list
            </div>
        );
    }
}

export default connect(null,{fetchToDos})(ToDoList);