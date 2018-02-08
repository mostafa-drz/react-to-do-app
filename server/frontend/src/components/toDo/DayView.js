import React,{Component} from 'react';
import {connect} from 'react-redux';
import {isTheSameDay} from '../../utils/helpers';
import ToDo from './ToDo';
import '../../stylesheets/dayView.css';
import NothingToDo from './NothingToDo';
class DayView extends Component{
   
    render(){
        const {todos}=this.props;
        return(todos.length>0 ? 
        <div className='dayView'>
            {todos.map((todo)=>(
            <ToDo 
            todo={todo} 
            key={todo._id} 
            className='day'
            >
            {this.props.children}
            </ToDo>
        ))}
        </div>
    :<NothingToDo/>) 
    }
}

function mapStateToProps(state,ownProps){
    return{
        todos:state.todo.filter((todo)=>{
            return isTheSameDay(todo.date,ownProps.date)
        })
    }
}
export default connect(mapStateToProps)(DayView);