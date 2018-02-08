import React, { Component} from "react";
import {connect} from 'react-redux';
import UserHeader from './UserHeader';
import GuestHeader from './GuestHeader';

class Header extends Component{
    render(){
        return(
            this.props.isLoggedIn ? (< UserHeader />) : (< GuestHeader />)
        )
    }
}

function mapSatetToProps(state) {
    return {
        isLoggedIn: state.auth.authenticated
    }
}

export default connect(mapSatetToProps)(Header);



