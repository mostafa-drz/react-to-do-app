import React,{Component} from 'react';
import '../stylesheets/login.css';
class Login extends Component{
    render(){
        return <div className="container login">
    
                <input type="email" placeholder="email.." className="login__input" />


                <input type="password" placeholder="password..."  className="login__input"/>
                <button type="button" className="btn" id="login__btn">Sign In</button>
                <a href="#" className="login__signup">Not a Member?</a>
          </div>;
    }
}

export default Login;