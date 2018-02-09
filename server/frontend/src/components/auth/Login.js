import React,{Component} from 'react';
import '../../stylesheets/login.css';
import {connect} from 'react-redux';
import { logInOnServer,googleLogInOnTheServer } from "../../actions/auth";
import MdErrorOutline from "react-icons/lib/md/error-outline";
import {Link} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={email:'',password:'',error:''};
        this._handleEmailInputChange = this._handleEmailInputChange.bind(this);
        this._handlePasswordInputChange = this._handlePasswordInputChange.bind(this);
        this.login=this.login.bind(this);
        this.googleLogin=this.googleLogin.bind(this);
    }

   _handleEmailInputChange(target){
    this.setState({
        email:target.value,
        error:''
    });
   }

   _handlePasswordInputChange(target){
        this.setState({password:target.value,error:''});
   }

   login(){
        this.props.logInOnServer({email:this.state.email,password:this.state.password})
        .then(()=>{
           this.props.history.push('/dashboard');
        }).catch((error)=>{
            this.setState({error:error.message});
        });
   }

   googleLogin(){
       this.props.googleLogInOnTheServer()
       .then(()=>{
           this.props.history.push('/dashboard');
       })
       .catch((error)=>{
            this.setState({error:error.message});
       });
   }
    render(){
     return(
            <div className="container login">
                {this.state.error && this.state.error.length>2 && <p className="login__error"><MdErrorOutline/> {this.state.error}</p>}
                <input type="email" placeholder="email.." value={this.state.email} className="login__input" onChange={e =>this._handleEmailInputChange(e.target) }/>
                <input type="password" placeholder="password..." value={this.state.password} className="login__input" onChange={e=>this._handlePasswordInputChange(e.target)}/>
                <button type="button" className="btn" id="login__btn" onClick={this.login}>
                Sign In
                </button>
                <a href="/auth/google"w className='btn login__google'>Google</a>
                <Link to='/signup' className="login__signup">
                Not a Member?
                </Link>
            </div>)
    }
}

export default connect(null,{logInOnServer,googleLogInOnTheServer})(Login);
