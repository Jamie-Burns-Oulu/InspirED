import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";
var bcrypt = require("bcryptjs");

class Settings extends Component {
    constructor() {
        if (!Token) {
            window.location = "/Login";
        }
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            picture: "",
            email: "",
            pass: ""
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        const username = this.props.userData.username;
        const { picture, email, pass } = this.state;
        if (picture) {
            axios
                .put("http://localhost:4000/user_settings/picture", {
                    headers: { authorization: Token },
                    username,
                    picture
                })
                .then(res => {
                    //What to do
                    console.log("Picture updated");
                });
        } else if (email) {
            axios
                .put("http://localhost:4000/user_settings/email", {
                    headers: { authorization: Token },
                    username,
                    email
                })
                .then(res => {
                    //What to do
                    console.log("Email updated");
                });
        } else if (pass) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(pass, salt, function(err, hash) {
                    let password = hash;

                    axios
                        .put("http://localhost:4000/user_settings/password", {
                            headers: { authorization: Token },
                            username,
                            password
                        })
                        .then(res => {
                            //What to do
                            console.log("Password updated");
                        });
                });
            });
        }
    };

    render() {
        return (
            <div className="subject-container">
                <h1>{this.props.userData.username}'s Settings</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="box">
                            <h4>Update Picture</h4>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <input
                                        type="text"
                                        name="picture"
                                        placeholder="New picture link"
                                        onChange={this.onChange}
                                    />
                                </label>
                                <br />
                                <button className="button" type="submit">
                                    Update Picture
                                </button>
                            </form>
                        </div>
                        <div className="box">
                            <h4>Update Email</h4>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="New email"
                                        onChange={this.onChange}
                                    />
                                </label>
                                <br />
                                <button className="button" type="submit">
                                    Update Email
                                </button>
                            </form>
                        </div>
                        <div className="box">
                            <h4>Update Password</h4>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <input
                                        type="password"
                                        name="pass"
                                        placeholder="New password"
                                        onChange={this.onChange}
                                    />
                                </label>
                                <br />
                                <button className="button" type="submit">
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
