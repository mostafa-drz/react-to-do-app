import React, { Component } from 'react';
import {connect} from 'react-redux';
export default function(composedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.authenticated){
                this.props.history.push('/');
            }
        }

        render(){
            return(
                <composedComponent {...this.props}/>
            );
        }
    }
    function mapStateToProps(state){
        return{
            authenticated:state.authenticated
        };
    }
    return connect()(Authentication);
}

