import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToDoOnServer } from '../actions/todo';
import '../stylesheets/newToDo.css';
import Datetime from 'react-datetime'
import '../stylesheets/react-datetime.css';
import GoCalendar from 'react-icons/lib/go/calendar';
class NewToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {  description: '', date: null }
    }

    _handelInputChange(target) {
        this.setState({  description: target.value});
    }

    _handleKeyPress(e) {
        if (e.keCode === 13 || e.which === 13) {
            this._addToDo();
        }
    }

    _renderInput(props,openCalendar){
        function clear(){
            props.onChange({target:{value:''}});
        }

        return(
                <GoCalendar onClick={openCalendar} className="newtodo__calendarIcon"/>
        );

    }

    _handleDateTimeChange(e){
        this.setState({date:e._d});
    }
    async _addToDo() {
        const {description,date}=this.state;
        await this.props.addToDoOnServer({description,date});
        this.setState({  description: '',date:null });
    }
    render() {
        return <div className="row newToDo">
            <input type="text" placeholder="What else?..." id="newToDo__description" value={this.state.description} onKeyPress={e => {
                this._handleKeyPress(e);
              }} onChange={e => {
                this._handelInputChange(e.target);
              }} className="col s10" />
            <div className="col s1">
            <Datetime renderInput={this._renderInput} onChange={e => this._handleDateTimeChange(e)} />
            </div>
          </div>;
    }
}

export default connect(null, { addToDoOnServer })(NewToDo);