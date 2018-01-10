import React, { Component } from 'react';
import moment from 'moment';
import {updateToDoOnTheServer,deleteAToDoOnTheServer} from '../actions/todo';
import {connect} from 'react-redux';
import MdHighlightRemove from "react-icons/lib/md/highlight-remove";
import '../stylesheets/todo.css';
class ToDo extends Component {
   constructor(props){
     super(props);
     this._handleToDoClick=this._handleToDoClick.bind(this);
       this._handleDeleteButton = this._handleDeleteButton.bind(this);
   }

   _handleToDoClick(){
     const {todo}=this.props;
     todo.completed=!todo.completed;
    this.props.updateToDoOnTheServer(todo);
   }

   _handleDeleteButton(e){
    e.preventDefault();
    e.stopPropagation();
    const {_id}=this.props.todo;
    this.props.deleteAToDoOnTheServer({_id}).catch((error)=>{
      console.log(error.message);
    });
   }
    render() {
      const {completed,date,description}=this.props.todo;
        return <div className={completed ? "todo todo__completed" : "todo"} onClick={this._handleToDoClick}>
            <span className="todo__deleteIcon" onClick={(e)=>this._handleDeleteButton(e)}>
              <MdHighlightRemove />
            </span>
            <p className="right todo__date">
              {date && moment(date).format("dddd D MMM HH:mm")}
            </p>
            <p className="todo__description">{description}</p>
          </div>;
    }
}

export default connect(null,{updateToDoOnTheServer,deleteAToDoOnTheServer})(ToDo);