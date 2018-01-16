import React, { Component } from 'react';
import { googleLogInOnTheServer } from '../../actions/auth';
import { connect } from 'react-redux';
import {parse} from 'query-string';
class GoogleLogIn extends Component {
    componentDidMount() {
        const token=parse(this.props.location.search).token;
        this.props.googleLogInOnTheServer({token})
        .then(()=>{
            this.props.history.push('/dashboard');
        }).catch((error)=>{
            console.log(error);
        })
    }
    render() {
        return (
            <div>{'Transfering..'}</div>
        )
    }
}

export default connect(null, { googleLogInOnTheServer })(GoogleLogIn);