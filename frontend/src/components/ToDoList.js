import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchToDos} from '../actions/todo';
import ToDo from './ToDo';
import '../stylesheets/todolist.css'
class ToDoList extends Component{
    
    render(){
        const { todos } = this.props;
        console.log(todos);
        return <div className="todolist container">
              <ul className="todolist__list">
                {todos.map(todo => <li key={todo._id}>
                    <ToDo {...todo}/>
                  </li>)}
              </ul>
          </div>;
    }
}

function mapStateToProps(state){
    return{
        todos:state.todo
    }
}
export default connect(mapStateToProps)(ToDoList);