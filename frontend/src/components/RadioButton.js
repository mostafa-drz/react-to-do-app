/* Thi component style and css is inspired by a code on codepen. you can find it here
https://codepen.io/caseycallow/pen/yaGQro?q=radio+button&limit=all&type=type-pens
by Casey Callow
*/

import React,{Component} from 'react';
import '../stylesheets/radioButton.css';

class RadioButton extends Component{
    constructor(props){
        super(props);
        this._handleRadioChange=this._handleRadioChange.bind(this);
    }
    
    _handleRadioChange(id){
        this.props.onRadioChange(id);
    }

    render(){
        const {buttons}=this.props;
        return (
            <div className="radio-tile-group">
                {buttons.map((button)=>(
                    <div className="input-container" key={button.id}>
                        <input id={button.id} className="radio-button" 
                        type="radio" 
                        name="radio" 
                        onClick={(e)=>this._handleRadioChange(button.id)} 
                        />
                        <div className="radio-tile">
                            <label htmlFor={button.id} className="radio-tile-label">
                            <div className="icon">
                                {button.icon}
                            </div>
                                {button.label}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default RadioButton;