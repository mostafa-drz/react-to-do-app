import React,{Component} from 'react';
import { removeTokenOnStorage } from '../../utils/helpers'
import {Link} from 'react-router-dom';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import { logOutOnServer } from '../../actions/auth';
import { connect } from 'react-redux';
import "../../stylesheets/header.css";
import $ from 'jquery';
class UserHeader extends Component {
  constructor(props) {
    super(props);
    this._handleLogOutButton = this._handleLogOutButton.bind(this);
  }

  _handleLogOutButton(e) {
    this.props.logOutOnServer();
  }

  render() {
    return( 
        <nav className="header">
            <Link to="/" className="brand-logo">
                Do
            </Link>
            <ul className="right">
                <li>
                <Link  to="/" className="header__logout header__item" onClick={this._handleLogOutButton}>
                    Log out
                </Link>
                </li>
            </ul>
        </nav>
    )
  }
}

export default connect(null, { logOutOnServer })(UserHeader);