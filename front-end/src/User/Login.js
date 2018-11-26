import React, { Component } from "react";
import axios from "axios";
import Token from '../Auth/token';
import './login_register.scss';
var bcrypt = require("bcryptjs");

class Login extends Component {
    constructor() {
        super();
        if(Token) {
            window.location = '/';
        }
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
        const { loginRegisterContainer, header, loginContent, toggle } = this.refs;
        loginRegisterContainer.classList.add('register');
        
    }
    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state,
        self = this;
        axios
            .post("http://localhost:4000/login_register/login/", {username: username})
            .then(response => {
    
                bcrypt.compare(password, response.data.count[0].password, function(err, res) {
                    console.log("Password check = ", res);
                    if (res) {   
                        localStorage.setItem('loggedUserToken', response.data.token);
                        const user = response.data.count[0];
                        
                        window.location = '/profile';
                    }
                    
                });
                
            });
    };

    render() {
        return (
            <div className="container">
                <div className="login-register-container" ref="loginRegisterContainer">
                    <div ref="toggle">
                        <div className="login-register-header">
                            <h1 ref="header">Login to Group1</h1>
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
                </div>
            </div>
        );
    }
}

export default Login;
