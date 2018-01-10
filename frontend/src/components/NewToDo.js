import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addToDoOnServer} from '../actions/todo';
class NewToDo extends Component {
    constructor(props) {
        super(props);
        this.state = { todo: {description:'',date:null} }
    }

    _handelInputChange(target){
        this.setState({todo:{description:target.value}});
    }

    _handleKeyPress(e){
        if(e.keCode===13 || e.which===13){
           this._addToDo();
        }
    }

    _addToDo(){
        this.props.addToDoOnServer(this.state.todo);
    }
    render() {
        return ( <input 
        type = "text" 
        placeholder = "What else?..." 
        value={this.state.todo.description} 
        onKeyPress={(e)=>{this._handleKeyPress(e)}} 
        onChange={(e)=>{this._handelInputChange(e.target)}}/>
        );
    }
}

export default connect(null,{addToDoOnServer})(NewToDo);