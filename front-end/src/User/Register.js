import React, { Component } from "react";
import axios from "axios";
var bcrypt = require("bcryptjs");

class Register extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            id: 0,
            username: "",
            pass: "",
            confirm: "",
            email: "",
            admin: 0,
            picture: "",
            nonMatch: false,
            nonUnique: false
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        this.setState({ nonMatch: false });
        this.setState({ nonUnique: false });
    };

    handleSubmit = event => {
        event.preventDefault();
        const {
            id,
            username,
            pass,
            confirm,
            email,
            admin,
            picture
        } = this.state;
        var self = this;
        if (confirm !== pass) {
            this.setState({ nonMatch: true });
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(pass, salt, function(err, hash) {
                    let password = hash;
                    axios
                        .post("http://localhost:4000/login_register/register", {
                            id,
                            username,
                            password,
                            email,
                            admin,
                            picture
                        })
                        .then(res => {
                            if (res) {
                                if (res.data.code === "ER_DUP_ENTRY") {
                                    self.setState({ nonUnique: true });
                                } else {
                                    window.location = "/Login";
                                }
                            }
                        });
                });
            });
        }
    };

    render() {
        return (
            <div className="container register-content">
                <form onSubmit={this.handleSubmit} className="form">
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
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="text"
                            name="picture"
                            placeholder="Link to Picture"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            name="pass"
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm Password"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <label>
                        I agree to the terms and conditions
                        <input required type="checkbox" name="terms" />
                    </label>
                    <br />
                    <button className="button" type="submit">
                        Register Now
                    </button>
                </form>
                {this.state.picture && (
                    <div
                        className="id-card"
                        onClick={() => {
                            window.print();
                        }}
                    >
                        <h3>ID Card</h3>
                        <div className="content">
                            <div id="card-picture">
                                <img
                                    src={this.state.picture}
                                    className="profilePicture"
                                />
                            </div>
                            <div id="card-content">
                                <p id="card-username">{this.state.username}</p>
                                <p id="card-email">{this.state.email}</p>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.nonMatch ? (
                    <p style={{ color: "red" }}>passwords do not match</p>
                ) : (
                    <div />
                )}
                {this.state.nonUnique ? (
                    <p style={{ color: "red" }}>username is already in use</p>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default Register;
