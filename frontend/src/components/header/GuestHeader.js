import React, { Component } from "react";
import { Link } from "react-router-dom";
import FaAlignJustify from "react-icons/lib/fa/align-justify";
import '../../stylesheets/header.css';
class GuestHeader extends Component {
  render() {
    return( 
        <div className="navbar-fixed">
            <nav className="header navbar-fixed">
                <div className="nav-wrapper">
                <a to="/" className="brand-logo">
                    Do
                </a>
                <a data-activates="mobile-demo" className="button-collapse">
                    <i className="material-icons">
                    <FaAlignJustify />
                    </i>
                </a>
                <ul className="right hide-on-med-and-down">
                    <li>
                    <Link to="/login" className="header__item">
                        Log In
                    </Link>
                    </li>
                    <li>
                    <Link to="/signup" className="header__item--signUp">
                    Sign Up
                    </Link>
                    </li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                    <li>
                    <Link to="/login" className="header__item">
                        Log In
                    </Link>
                    </li>
                    <li>
                    <Link to="/signup" className="header__item--signUp">
                        Sign Up
                    </Link>
                    </li>
                </ul>
                </div>
            </nav>
      </div>
    )
  }
}

export default GuestHeader;
