import React,{Component} from 'react';
import {connect} from 'react-redux';
import ToDo from './ToDo';
import '../../stylesheets/todolist.css';
import Toggle from '../Toggle';
import {fetchToDos} from '../../actions/todo';
class ToDoList extends Component{
    constructor(props){
        super(props);
        this._toggle=this._toggle.bind(this);
    }

    state={
        showAll:true,
    }

     componentDidMount() {
    this.props.fetchToDos().catch((error)=>{
      console.log(error.message);
    });
  }

    _toggle(status){
        this.setState((pre)=>{
            return{
                showAll:status
            }
        })
    }
    render(){
        const { todos } = this.props;
        return <div className="todolist">
            <Toggle 
            defaultChecked={this.state.showAll} 
            onLabel="Show all" 
            offLabel="Show only ont done" 
            width="auto"
            onToggleChange={this._toggle}
            />
            <ul className="todolist__list">
              {todos.map(todo => <li key={todo._id} hidden={this.state.showAll?false : todo.completed}>
                  <ToDo todo={todo} className='todo'/>
                </li>)}
            </ul>
          </div>;
    }
}

function mapStateToProps(state){
    return{
        todos:state.todo
    }
}
export default connect(mapStateToProps,{fetchToDos})(ToDoList);