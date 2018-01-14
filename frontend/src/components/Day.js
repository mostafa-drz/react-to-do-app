import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchADayToDos} from '../actions/day';
class Day extends Component{

    componentDidMount(){
        this.props.fetchADayToDos({date:new Date()});
    }

    render(){
        return(

            <div>Day</div>
        );
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        todos:state.todo
    }
}
export default connect(mapStateToProps,{fetchADayToDos})(Day);