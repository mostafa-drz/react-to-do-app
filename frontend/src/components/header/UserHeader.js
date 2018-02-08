import React,{Component} from 'react';
import { removeTokenOnStorage } from '../../utils/helpers'
import {Link} from 'react-router-dom';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import { logOutOnServer } from '../../actions/auth';
import { connect } from 'react-redux';
import "../../stylesheets/header.css";
class UserHeader extends Component {
  constructor(props) {
    super(props);
    this._handleLogOutButton = this._handleLogOutButton.bind(this);
  }

  _handleLogOutButton(e) {
    e.preventDefault();
    this.props.logOutOnServer();
  }

  render() {
    return( 
        <nav className="header">
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
                <a  className="header__logout header__item" onClick={this._handleLogOutButton}>
                    Log out
                </a>
                </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
                <li>
                <a className="header__logout header__item" onClick={this._handleLogOutButton}>
                    Log out
                </a>
                </li>
            </ul>
            </div>
        </nav>
    )
  }
}

export default connect(null, { logOutOnServer })(UserHeader);