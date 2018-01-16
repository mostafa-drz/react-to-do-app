import React, { Component } from 'react';
import moment from 'moment';
import {updateToDoOnTheServer,deleteAToDoOnTheServer} from '../../actions/todo';
import {connect} from 'react-redux';
import MdHighlightRemove from "react-icons/lib/md/highlight-remove";
import MdEdit from "react-icons/lib/md/edit"
import '../../stylesheets/todo.css';
import EditToDo from './EditToDo';

class ToDo extends Component {
   constructor(props){
     super(props);
     this.state={editMode:false}
     this._handleToDoClick=this._handleToDoClick.bind(this);
     this._handleDeleteButton = this._handleDeleteButton.bind(this);
     this._handleEditButton = this._handleEditButton.bind(this);
     this._editDone = this._editDone.bind(this);
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

   _handleEditButton(e){
      e.preventDefault();
      e.stopPropagation();
      this.setState({editMode:true});

   }

   _editDone(){
     this.setState({editMode:false});
   }
   
    render() {
      const {completed,date,description}=this.props.todo;
      const {editMode}=this.state;
        return !editMode ? (<div 
            className={completed ? `${this.props.className} ${this.props.className}--completed` : `${this.props.className}`} 
            onClick={this._handleToDoClick}>
            
            <p className={`right ${this.props.className}__date`}>
              {date && moment(date).format("dddd D MMM HH:mm")}
            </p>
            <span className={`${this.props.className}__deleteIcon`} onClick={e => this._handleDeleteButton(e)}>
              <MdHighlightRemove />
            </span>
            <span className={`${this.props.className}__editIcon`} onClick={e=>this._handleEditButton(e)}>
              <MdEdit />
            </span>
            <p className={`${this.props.className}__description`}>{description}</p>
          </div>)
        :
        (<EditToDo todo={this.props.todo} onEditDone={this._editDone}/>)
    }
}

export default connect(null,{updateToDoOnTheServer,deleteAToDoOnTheServer})(ToDo);