import React, { Component } from 'react';
import '../stylesheets/toggle.css'
class Toggle extends Component {
  constructor(props) {
    super(props);
    this._handleToggle = this._handleToggle.bind(this);
  }

  state = {
    checked: true,
    onLabel: "Show only not completed",
    offLabel: "Show All"
  };


  componentDidMount(){
      this.setState({
          checked:this.props.defaultChecked|| false,
          onLabel:this.props.onLabel || "",
          offLabel:this.props.offLabel || ""
      })
  }

  _handleToggle() {
    this.setState(prev => {
      return { checked: !prev.checked };
    });
  }
  render() {
    return (
      <div className="toggle">
        <div className="wrapper">
            <label className="toggle__status" style={{width:this.props.width || '200px'}}>
            {this.state.checked ? this.state.onLabel : this.state.offLabel}
            </label>
            <label className="toggle__switch">
            <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this._handleToggle}
            />
            <span className="toggle__slider toggle__round" />
            </label>
        </div>
      </div>
    );
  }
}

export default Toggle;