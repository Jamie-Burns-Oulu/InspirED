import React, { Component } from "react";
import axios from "axios";
import Token from '../Auth/token';
import './login_register.scss';
import Register from "./Register";
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
            password: "",
            register: false,
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
        this.setState({register: !this.state.register});
        console.log(this.state.register);
        if(this.state.register) {
            loginRegisterContainer.classList.remove('login');
            loginRegisterContainer.classList.add('register');
        }
        else {
            loginRegisterContainer.classList.remove('register');
            loginRegisterContainer.classList.add('login');
        }
        
        
    }
    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state,
        self = this;
        axios
            .post("http://localhost:4000/login_register/login/", {username: username})
            .then(response => {
                    bcrypt.compare(password, response.data.count[0].password, function(err, res) {
                    if (res) {   
                        localStorage.setItem('loggedUserToken', response.data.token);
                            axios.get('http://localhost:4000/user_profile/data', {headers: {'authorization' :  response.data.token}}).then(res => {
                            localStorage.setItem('user_id', res.data[0].id);   
                            localStorage.setItem('user_name', res.data[0].username);
                            localStorage.setItem('user_pic', res.data[0].picture);
                            localStorage.setItem('user_email', res.data[0].email);
                            window.location = '/';
                        });
                    }
                    
                });
                
            });
    };
    
    render() {
        if(this.state.register) {
            return (
                <div className="container">
                <div className="login-register-container" ref="loginRegisterContainer">
                    <div ref="toggle">
                        <div className="login-register-header">
                            <h1 ref="header">Register to Group1</h1>
                        </div>
                        <div className="content" ref="content">
                            <div className="login-content" ref="loginContent">
                                <Register />
                            </div>
                            <div className="switch" ref="register">
                                <p ref="switchText">Already registered? Login <a href="#" onClick={() => {this.register()}}>Here!</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        return (
            <div className="container">
                <div className="login-register-container" ref="loginRegisterContainer">
                    <div ref="toggle">
                        <div className="login-register-header">
                            <h1 ref="header">Login to Group1</h1>
                        </div>
                        <div className="content" ref="content">
                            <div className="login-content" ref="loginContent">
                                <form onSubmit={this.handleSubmit} className="form">
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
