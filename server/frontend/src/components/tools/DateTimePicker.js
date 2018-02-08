import React, { Component } from 'react';
import Datetime from "react-datetime";
import "../../stylesheets/react-datetime.css";
import GoCalendar from "react-icons/lib/go/calendar";
import * as moment from "moment";
import '../../stylesheets/dateTimePicker.css';

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this._clearDate = this._clearDate.bind(this);
    this.state = { date: null };
  }

  _handleDateTimeChange(e) {
    this.setState({ date: e._d }, () => {
      this.props.onChange(this.state.date);
    });
  }

  _clearDate() {
   this.props.onChange(null);
  }

  _renderDateTimeInput(props, openCalendar) {
    return (
      <div>
        <GoCalendar
          onClick={openCalendar}
          className="dateTimePicker__calendarIcon"
        />
      </div>
    );
  }
  render() {
    return (
      <div className="dateTimePicker">
        {this.props.value && (
          <label>
            {moment(this.props.value).format("MMM D,ddd h:mm a")}
            <span
              onClick={this._clearDate}
              className="dateTimePicker__clearDateBtn"
            >
              X
            </span>
          </label>
        )}
        <Datetime
          renderInput={this._renderDateTimeInput}
          onChange={e => this._handleDateTimeChange(e)}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default DateTimePicker;