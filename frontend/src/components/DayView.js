import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getADayToDos} from '../actions/todo';
import ToDo from './toDo/ToDo';
import '../stylesheets/dayView.css';
import MdNavigateNext from 'react-icons/lib/md/navigate-next';
import MdNavigateBefore from 'react-icons/lib/md/navigate-before';
import moment from 'moment';
import {startOfDay,nextDay,previousDay} from '../utils/helpers'
class DayView extends Component{

    constructor(props){
        super(props);
        this.nextDay=this.nextDay.bind(this);
        this.previousDay = this.previousDay.bind(this);
        this.state = {
            date: startOfDay(new Date())
        }
    }

   
    componentDidMount(){
        console.log(this.initialDate);
        this.props.getADayToDos({ date: this.state.date });
    }


    nextDay(){
        console.log(this.state.date.getDate()+1);
        this.setState(({date})=>({date:nextDay(date)}),()=>{
            this.props.getADayToDos({ date: this.state.date });
        })

    }

    previousDay(){
        this.setState(({ date }) =>({date:previousDay(date)}),()=>{
            this.props.getADayToDos({ date: this.state.date });
        })
    }
    render(){
        const {todos}=this.props;
        return(<div className='dayView'>
            <div className="dayView__dateTools">
                <MdNavigateBefore className="dayView__dateTools__previousIcon" onClick={this.previousDay}/>
                <span className='dayView__dateTools__currentDate'>{moment(this.state.date).format("dddd D MMM") }</span>
                <MdNavigateNext className="dayView__dateTools__nextIcon" onClick={this.nextDay}/>
            </div>
            {todos.map((todo)=>(
            <ToDo 
            todo={todo} 
            key={todo._id} 
            className='day'
            >
            {this.props.children}
            </ToDo>
        ))}
        </div>);
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        todos:state.todo.day
    }
}
export default connect(mapStateToProps,{getADayToDos})(DayView);