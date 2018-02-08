import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/auth';
export default function(ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            this.props.getCurrentUser()
                .then(() => {
                    if (!this.props.authenticated) {
                        this.props.history.push('/login');
                    }
                });
        }
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/login');
            }
        }

        render() {
            return ( < ComposedComponent {...this.props }
                />
            );
        }
    }

    function mapStateToProps(state) {
        if (state.auth) {
            return { authenticated: state.auth.authenticated };
        }

        return { authenticated: false };

    }
    return connect(mapStateToProps, { getCurrentUser })(Authentication);
}