import React, { Component } from "react";
import { connect } from "react-redux";
import UserHeader from './UserHeader';
import GuestHeader from './GuestHeader';

const Header=(props)=>{
  return(
  props.isLoggedIn ? <UserHeader/> : <GuestHeader/>
  )
}

function mapSatetToProps(state){
  return{
    isLoggedIn:state.auth.authenticated
  }
}

export default connect(mapSatetToProps)(Header);
