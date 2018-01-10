import React, { Component } from 'react';
import moment from 'moment';
import {updateToDoOnTheServer} from '../actions/todo';
import {connect} from 'react-redux';
import '../stylesheets/todo.css';
class ToDo extends Component {
   constructor(props){
     super(props);
     this._handleToDoClick=this._handleToDoClick.bind(this);
   }

   _handleToDoClick(){
     const {todo}=this.props;
     todo.completed=!todo.completed;
    this.props.updateToDoOnTheServer(todo);
   }
    render() {
      const {completed,date,description}=this.props.todo;
        return <div className={completed?'todo todo__completed':'todo'} onClick={this._handleToDoClick}>
                  <p className="right todo__date">
                    {date &&
                      moment(date).format(
                        "dddd D MMM HH:mm"
                      )}
                  </p>
                  <p className="todo__description">{description}</p>
          </div>;
    }
}

export default connect(null,{updateToDoOnTheServer})(ToDo);