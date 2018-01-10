import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToDoOnServer } from '../actions/todo';
import '../stylesheets/newToDo.css';
class NewToDo extends Component {
    constructor(props) {
        super(props);
        this.state = { todo: { description: '', date: null } }
    }

    _handelInputChange(target) {
        this.setState({ todo: { description: target.value } });
    }

    _handleKeyPress(e) {
        if (e.keCode === 13 || e.which === 13) {
            this._addToDo();
        }
    }

    async _addToDo() {
        await this.props.addToDoOnServer(this.state.todo)
        this.setState({ todo: { description: '' } });
    }
    render() {
        return <div className="newToDo">
            <input type="text" placeholder="What else?..." 
            id="newToDo__description" 
            value={this.state.todo.description}
            onKeyPress={e => {
                this._handleKeyPress(e);
              }} onChange={e => {
                this._handelInputChange(e.target);
              }} />
          </div>;
    }
}

export default connect(null, { addToDoOnServer })(NewToDo);