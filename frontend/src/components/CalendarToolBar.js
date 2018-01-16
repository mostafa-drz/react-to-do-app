import React, { Component } from 'react';
import MdNavigateNext from 'react-icons/lib/md/navigate-next';
import MdNavigateBefore from 'react-icons/lib/md/navigate-before';
import { startOfDay, nextDay, previousDay } from '../utils/helpers';
import moment from 'moment';
class CalendarToolBar extends Component {


    constructor(props){
        super(props);
        this.nextDay=this.nextDay.bind(this);
        this.previousDay=this.previousDay.bind(this);
        
    }
    nextDay() {
        const { date } = this.props;
       this.props.onDateChange({date:nextDay(date)});
    }

    previousDay() {
        const { date } = this.props;
        this.props.onDateChange({date:previousDay(date)});
    }

    render() {
        return (
            <div className="calendarView__dateTools">
                    <MdNavigateBefore className="calendarView__dateTools__previousIcon" onClick={this.previousDay} />
                    <span className='calendarView__dateTools__currentDate'>{moment(this.props.date).format("dddd D MMM")}</span>
                    <MdNavigateNext className="calendarView__dateTools__nextIcon" onClick={this.nextDay} />
        </div>
        );
    }
}

export default CalendarToolBar;