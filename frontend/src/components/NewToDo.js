import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToDoOnServer } from '../actions/todo';
import '../stylesheets/newToDo.css';
import Datetime from 'react-datetime'
import '../stylesheets/react-datetime.css';
import GoCalendar from 'react-icons/lib/go/calendar';
import * as moment from 'moment';
class NewToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", date: null };
    this._clearDate = this._clearDate.bind(this);
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
  _renderDateTimeInput(props, openCalendar) {
    function clear() {
      props.onChange({ target: { value: "" } });
    }

    return (
      <div>
        <GoCalendar onClick={openCalendar} className="newtodo__calendarIcon" />
      </div>
    );
  }

  _handleDateTimeChange(e) {
    this.setState({ date: e._d });
  }

  _clearDate() {
    this.setState({ date: null });
  }
  render() {
    return <div className="row newtodo">
        <input type="text" placeholder="What else?..." id="newtodo__description" value={this.state.description} onKeyPress={e => {
            this._handleKeyPress(e);
          }} onChange={e => {
            this._handelInputChange(e.target);
          }} />
        <div className="newtodo__date">
          {this.state.date && <label>
              {moment(this.state.date).format("MMM D,ddd h:mm a")}
              <span onClick={this._clearDate} className="newtodo__clearDateBtn">
                X
              </span>
            </label>}
          <Datetime 
          renderInput={this._renderDateTimeInput} 
          onChange={e => this._handleDateTimeChange(e)} 
          value={this.state.date} 
          />
        </div>
      </div>;
  }
}

export default connect(null, { addToDoOnServer })(NewToDo);