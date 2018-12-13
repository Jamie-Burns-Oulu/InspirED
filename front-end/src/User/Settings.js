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
            pass: "",
            p: "",
            em: "",
            pa: ""
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        const username = localStorage.getItem("user_name");
        const { picture, email, pass } = this.state;
        if (picture) {
            axios
                .put("http://localhost:4000/user_settings/picture", {
                    headers: { authorization: Token },
                    username,
                    picture
                })
                .then(res => {
                    localStorage.setItem("user_pic", picture);
                    this.setState({ p: "picture updated", em:"", pa:"" });
                    setTimeout(function() {
                            window.location = window.location;
                        }.bind(this),
                        400
                    );
                });
        } else if (email) {
            axios
                .put("http://localhost:4000/user_settings/email", {
                    headers: { authorization: Token },
                    username,
                    email
                })
                .then(res => {
                  const self = this;
                    localStorage.setItem("user_email", email);
                    this.setState({ em: "email updated", p:"", pa:"" });
                    setTimeout(function() {
                        window.location = window.location;
                    }.bind(this),
                    400
                );

                });
        } else if (pass) {
          const self = this;
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
                            self.setState({ pa: "password updated", p:"", em:"" });
                            setTimeout(function() {
                                window.location = window.location;
                            }.bind(this),
                            400
                        );
                        });
                });
            });
        }
    };

    render() {
        return (
            <div className="subject-container">
                <h1>{localStorage.getItem("user_name")}'s Settings</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="settings-box">
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
                                <div className="updated">{this.state.p}</div>
                            </form>
                        </div>
                        <div className="settings-box">
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
                                <div className="updated">{this.state.em}</div>
                            </form>
                        </div>
                        <div className="settings-box">
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
                                <div className="updated">{this.state.pa}</div>
                            </form>
                            {this.state.picture.length ? (
                                <div className="settings-id-card">
                                    <img
                                        src={this.state.picture}
                                        className="profilePicture"
                                    />
                                </div>
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
