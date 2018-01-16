import React,{Component} from 'react';
import {connect} from 'react-redux';
import ToDoList from './toDo/ToDoList';
import NewToDo from './toDo/NewToDo';
import '../stylesheets/dashboard.css';
import Toggle from './Toggle';
import Day from './Day';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';
import TiCalendarOutline from 'react-icons/lib/ti/calendar-outline';
import RadioButton from './RadioButton';
class Dashboard extends Component {
  constructor(props){
    super(props);
    this._handleChangeView=this._handleChangeView.bind(this);
    this.renderBasedOnView=this.renderBasedOnView.bind(this);
  }

  state={
    view:'list'
  }
  renderBasedOnView(){
    switch (this.state.view) {
      case 'list':
         return <ToDoList key='todolist'/>;
      case 'calendar':
        return <Day key='day'/>
    }
  }

  _handleChangeView(value){
    this.setState({
      view:value
    })
  }
  render() {
    return <div className="container dashboard">
        <div className="row">
          <RadioButton
          buttons={[
            {
              id:'list',
              label:'List View',
              icon:<MdFormatListBulleted/>,
              checked:true
            },
            {
              id:'calendar',
              label:'Calendar View',
              icon:<TiCalendarOutline/>,
              checked:false
            }
          ]}
          onRadioChange={(id)=>{this._handleChangeView(id)}}
          />
        </div>
        <div className="row">
          <NewToDo key="newtodo" />
        </div>
        {this.renderBasedOnView()}
      </div>;
  }
}

export default Dashboard;