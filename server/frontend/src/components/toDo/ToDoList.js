import React,{Component} from 'react';
import {connect} from 'react-redux';
import ToDo from './ToDo';
import '../../stylesheets/todolist.css';
import Toggle from '../tools/Toggle';
import {fetchToDos} from '../../actions/todo';
import Loading from '../Loading';

class ToDoList extends Component{
    constructor(props){
        super(props);
        this._toggle=this._toggle.bind(this);
    }

    state={
        showAll:true,
        loaded: false
    }

     componentDidMount() {
       setTimeout(() => {
          this.props.fetchToDos()
            .then(() => {
              this.setState({ loaded: true });
            })
            .catch((error)=>{
                console.log(error.message);
            });
       }, 3000);
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
        const { loaded } = this.state;
        return loaded ?
        (<div className="todolist">
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
          </div>)
        :
        (<Loading/>)
    }
}

function mapStateToProps(state){
    return{
        todos:state.todo
    }
}
export default connect(mapStateToProps,{fetchToDos})(ToDoList);