import React, { Component } from 'react';
import MdNavigateNext from 'react-icons/lib/md/navigate-next';
import MdNavigateBefore from 'react-icons/lib/md/navigate-before';
import {nextDay, previousDay } from '../../utils/helpers';
import moment from 'moment';
import Datetime from "react-datetime";
import '../../stylesheets/calendarToolbar.css'
class CalendarToolBar extends Component {


    constructor(props){
        super(props);
        this.nextDay=this.nextDay.bind(this);
        this.previousDay=this.previousDay.bind(this);
        this._renderDateTimeInput=this._renderDateTimeInput.bind(this);
        this.onDateSelect=this.onDateSelect.bind(this);

    }
    nextDay() {
        const { date } = this.props;
       this.props.onDateChange({date:nextDay(date)});
    }

    previousDay() {
        const { date } = this.props;
        this.props.onDateChange({date:previousDay(date)});
    }

    onDateSelect(e){
        this.props.onDateChange({date:e._d});
    }
    _renderDateTimeInput(props, openCalendar) {
        return (
            <div>
                <button type="button" className='calendarToolbar__currentDate' onClick={openCalendar}>{moment(this.props.date).format("dddd D MMM")}</button>
            </div>
        );
    }

    render() {
        return (
            <div className="calendarToolbar">
                    <MdNavigateBefore className="calendarToolbar__previousIcon" onClick={this.previousDay} />
                    <Datetime
                        renderInput={this._renderDateTimeInput}
                        onChange={e => this.onDateSelect(e)}
                        value={this.props.date}
                        timeFormat={false}
                        closeOnSelect={true}
                    />
                    <MdNavigateNext className="calendarToolbar__nextIcon" onClick={this.nextDay} />
        </div>
        );
    }
}

export default CalendarToolBar;