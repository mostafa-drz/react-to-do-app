import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToDoOnServer } from '../actions/todo';
import '../stylesheets/newToDo.css';
import DateTimePicker from './DateTimePicker';

class NewToDo extends Component {

  constructor(props) {
    super(props);
    this.state = { description: "", date: null };
  }

  _handelInputChange(target) {
    this.setState({ description: target.value });
  }

  _handleKeyPress(e) {
    if (e.keCode === 13 || e.which === 13) {
      this._addToDo();
    }
  }

  async _addToDo() {
    const { description, date } = this.state;
    await this.props.addToDoOnServer({ description, date });
    this.setState({ description: "", date: null });
  }


  _handleDateTimeChange(value) {
    this.setState({ date: value});
  }


  render() {
    return <div className="row newtodo">
        <input type="text" placeholder="What else?..." id="newtodo__description" value={this.state.description} onKeyPress={e => {
            this._handleKeyPress(e);
          }} onChange={e => {
            this._handelInputChange(e.target);
          }} />
          <DateTimePicker
            onChange={(value)=>this._handleDateTimeChange(value)}
            value={this.state.date}
          />
      </div>;
  }
}

export default connect(null, { addToDoOnServer })(NewToDo);