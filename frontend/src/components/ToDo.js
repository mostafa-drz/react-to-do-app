import React, { Component } from 'react';
import moment from 'moment';
import '../stylesheets/todo.css';
class ToDo extends Component {
    render() {
        return <div className="todo">
                  <p className="right todo__date">
                    {this.props.date &&
                      moment(this.props.date).format(
                        "dddd D MMM HH:mm"
                      )}
                  </p>
                  <p className="todo__description">{this.props.description}</p>
          </div>;
    }
}

export default ToDo;