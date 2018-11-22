import React, { Component } from "react";
import axios from "axios";
var bcrypt = require("bcryptjs");

class Login extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .get("http://localhost:4000/login_register/login/" + username)
            .then(res => {
                bcrypt.compare(password, res.data[0].password, function(err, res) {
                    console.log("Password check = ", res);
                    if (res) {
                        alert("Password is good");
                    }
                });
            });
    };

    render() {
        return (
            <div className="content">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <button className="button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;
