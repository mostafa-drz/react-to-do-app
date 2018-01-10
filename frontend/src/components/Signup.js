import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signUpOnServer} from '../actions/auth';
import MdErrorOutline from "react-icons/lib/md/error-outline";
import '../stylesheets/signup.css'
class Signup extends Component{
    constructor(props){
        super(props);
        this.state={email:'',password:'',rePassword:'',error:''};
        this.signUp=this.signUp.bind(this);
    }

    signUp(){
        const {email,password,rePassword}=this.state;
        if(password!==rePassword){
            this.setState({error:'The password and re-password should be same'});
            return false;
        }else{
            this.props.signUpOnServer({
                email,
                password
            }).then(()=>{
                console.log('done');
            }).catch((error)=>{
                this.setState({error:error});
            });
        }

    }
    _handleInputChange(key,target){
        this.setState({[key]:target.value,error:''});
    }
    render(){
        return <div className="container signup">
            {this.state.error && this.state.error.length>2 && <p className="signup__error"><MdErrorOutline/> {this.state.error}</p>}
            <input type="email" placeholder="email" className="signup__input" onChange={e => this._handleInputChange("email", e.target)} />
            <input type="password" placeholder="password" className="signup__input" onChange={e => this._handleInputChange("password", e.target)} />
            <input type="password" placeholder="re-pasword" className="signup__input" onChange={e => this._handleInputChange("rePassword", e.target)} />
            <button type="button" className="btn" onClick={this.signUp}>
              Sign Up
            </button>
          </div>;
    }
};

export default connect(null,{signUpOnServer})(Signup);

