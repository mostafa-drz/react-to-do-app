import React, { Component } from 'react';
import DayView from './DayView';
import {startOfDay,nextDay,previousDay} from '../utils/helpers';
import MdNavigateNext from 'react-icons/lib/md/navigate-next';
import MdNavigateBefore from 'react-icons/lib/md/navigate-before';
import moment from 'moment';
import '../stylesheets/calendarView.css'
class CalendarView extends Component {

    constructor(props) {
        super(props);
        this.nextDay = this.nextDay.bind(this);
        this.previousDay = this.previousDay.bind(this);
    }

    state = {
        date:startOfDay(new Date())
    }

    
    nextDay() {
        this.setState(({ date }) => ({ date: nextDay(date) }));
    }

    previousDay() {
        this.setState(({ date }) => ({ date: previousDay(date) }));
    }

    render() {
        return ( 
        <div className="calendarView">
            <div className="calendarView__dateTools">
                        <MdNavigateBefore className="calendarView__dateTools__previousIcon" onClick={this.previousDay} />
                        <span className='calendarView__dateTools__currentDate'>{moment(this.state.date).format("dddd D MMM")}</span>
                        <MdNavigateNext className="calendarView__dateTools__nextIcon" onClick={this.nextDay} />
            </div>
            <DayView
            date={this.state.date}
            />
        </div>
        );
    }
}

export default CalendarView;