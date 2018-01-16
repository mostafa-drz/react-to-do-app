import React,{Component} from 'react';
import { connect } from "react-redux";
import {updateToDoOnTheServer} from '../../actions/todo';
import '../../stylesheets/editToDo.css';
import DateTimePicker from '../DateTimePicker';

class EditToDo extends Component{
    constructor(props){
        super(props);
        this.state={description:'',date:null};
        this._handeInputChange=this._handleInputChange.bind(this);
        this._handleUpdateButton = this._handleUpdateButton.bind(this);
        this._handeDateTimeChange=this._handeDateTimeChange.bind(this);
    }
    
    componentDidMount(){
        const {description,date}=this.props.todo;
        this.setState({description,date});
    }

    _handleInputChange(target){
        console.log('trying to handle input change');
        console.log(target.value);
        this.setState({description:target.value});
    }

    _handleUpdateButton(){
        const {todo}=this.props;
        const {description,date}=this.state;
        todo.description=description;
        todo.date=date;
        this.props.updateToDoOnTheServer(todo)
        .then(()=>{
            this.props.onEditDone();
        });
    }

    _handeDateTimeChange(value){
        this.setState({date:value});
    }
    render(){
     const{description,date}=this.state;
        return <div className="editToDo">
            <input autoFocus className="editToDo__description" type="text" value={description} onChange={e => this._handleInputChange(e.target)} />
            <DateTimePicker
            value={date}
            onChange={(value)=>this._handeDateTimeChange(value)}
            />
            <button className="editToDo__updateButton" type="button" onClick={this._handleUpdateButton}>
              Submit
            </button>
          </div>;
    }
}

export default connect(null,{updateToDoOnTheServer})(EditToDo);