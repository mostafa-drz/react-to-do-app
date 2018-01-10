import React,{Component} from 'react';
import { connect } from "react-redux";
import {updateToDoOnTheServer} from '../actions/todo';
import '../stylesheets/editToDo.css';
class EditToDo extends Component{
    constructor(props){
        super(props);
        this.state={todo:{description:''}};
        this._handeInputChange=this._handleInputChange.bind(this);
        this._handleUpdateButton = this._handleUpdateButton.bind(this);
    }
    
    componentDidMount(){
        this.setState({todo:{description:this.props.todo.description}});
        this.input.focus();
    }

    _handleInputChange(target){
        this.setState({todo:{description:target.value}});
    }

    _handleUpdateButton(){
        const {todo}=this.props;
        todo.description=this.state.todo.description;
        this.props.updateToDoOnTheServer(todo)
        .then(()=>{
            this.props.onEditDone();
        });
    }
    render(){
     const{description}=this.state.todo;
        return(
            <div className='editToDo'>
                <input 
                ref={(input)=>{this.input=input;}} 
                className='editToDo__description' 
                type="text" 
                value={description} 
                onChange={(e)=>this._handleInputChange(e.target)}/>

                <button 
                className='editToDo__updateButton' 
                type="button" 
                onClick={this._handleUpdateButton}>
                Submit</button>
            </div>
        );
    }
}

export default connect(null,{updateToDoOnTheServer})(EditToDo);