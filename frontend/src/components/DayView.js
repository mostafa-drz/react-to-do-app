import React,{Component} from 'react';
import {connect} from 'react-redux';
import {isTheSameDay} from '../utils/helpers';
import ToDo from './toDo/ToDo';
import '../stylesheets/dayView.css';
class DayView extends Component{
   
    render(){
        const {todos}=this.props;
        return(<div className='dayView'>
            {todos.map((todo)=>(
            <ToDo 
            todo={todo} 
            key={todo._id} 
            className='day'
            >
            {this.props.children}
            </ToDo>
        ))}
        </div>);
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