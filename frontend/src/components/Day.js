import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getADayToDos} from '../actions/todo';
import ToDo from './toDo/ToDo';
class Day extends Component{

    componentDidMount(){
        this.props.getADayToDos({date:new Date()})
    }

    render(){
        const {todos}=this.props;
        return(
        todos.map((todo)=>(
            <ToDo todo={todo} key={todo._id}/>
        )));
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        todos:state.todo
    }
}
export default connect(mapStateToProps,{getADayToDos})(Day);