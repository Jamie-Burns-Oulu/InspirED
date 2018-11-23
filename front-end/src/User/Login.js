import React, { Component } from "react";
import axios from "axios";
import './login_register.scss';
var bcrypt = require("bcryptjs");

class Login extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            username: "",
            password: ""
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    register() {
        const self = this;
        this.refs.loginRegisterContainer.classList.add('register');
        this.refs.loginRegisterContainer.addEventListener('animationstart', Listener, false);
        this.refs.loginRegisterContainer.addEventListener('animationend', Listener, false);
        
        function Listener(e) {
            switch (e.type) {
                case 'animationstart':
                console.log('start');
                let i = 1;
                const content = self.refs.loginContent.style;
                    const interval = setInterval( () => {
                        content.opacity = i;
                        i = i - 0.2;
                        if(i <= 0) {
                            content.visibility= 'hidden';
                            clearInterval(interval);
                        }
                    }, 100);
                    break;
                case 'animationend':
                    self.refs.loginRegisterContainer.classList.remove('register');

                    break;
            
                default:
                    break;
            }
            if(e.type === 'animationend') {
                
            }
            
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .post("http://localhost:4000/login_register/login/", {username: username})
            .then(response => {
    
                bcrypt.compare(password, response.data.count[0].password, function(err, res) {
                    console.log("Password check = ", res);
                    if (res) {   
                        localStorage.setItem('loggedUserToken', response.data.token);
                        window.location = '/';
                    }
                    
                });
            });
    };

    render() {
        return (
            <div className="container">
                <div className="login-register-container" ref="loginRegisterContainer">
                    <div className="login-register-header">
                        <h1 ref="login-register-h1">Login to Group1</h1>
                    </div>
                    <div className="content" ref="content">
                        <div className="login-content" ref="loginContent">
                            <form onSubmit={this.handleSubmit}>
                                <div className="username-container">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="username-input"
                                        onChange={this.onChange}
                                    />
                                    </div>
                                <br />
                                <div className="password-container">
                                    <input
                                        type="password"
                                        name="password"
                                        className="password-input"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <div className="submit-container">
                                    <input className="submit-btn btn btn-default" type="submit"  value="Login!"></input>
                                </div>
                            </form>
                        </div>
                        <div className="switch" ref="register">
                            <p ref="switchText">Not a member yet? Register <a href="#" onClick={() => {this.register()}}>Here!</a></p>
                        </div>
                        
                    </div>
                </div>
                {/* <div className="register-container" ref="RegisterContainer">
                    <div className="register-header">
                        <h1 ref="register-h1">Register!</h1>
                    </div>
                    <div className="content" ref="content">
                        <div className="register-content" ref="registerContent">
                            <form onSubmit={this.handleSubmit}>
                                <div className="username-container">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="username-input"
                                        onChange={this.onChange}
                                    />
                                    </div>
                                <br />
                                <div className="email-container">
                                    <input
                                        type="email"
                                        name="email"
                                        className="email-input"
                                        placeholder="Email"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <div className="email-container">
                                    <input
                                        type="text"
                                        name="picture"
                                        className="picture-input"
                                        placeholder="Picture URL"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <div className="password-container">
                                    <input
                                        type="password"
                                        name="password"
                                        className="password-input"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <div className="submit-container">
                                    <input className="submit-btn btn btn-default" type="submit"  value="Login!"></input>
                                </div>
                            </form>
                        </div>
                        <div className="switch" ref="register">
                            <p ref="switchText">Not a member yet? Register <a href="#" onClick={() => {this.register()}}>Here!</a></p>
                        </div>
                        
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Login;
