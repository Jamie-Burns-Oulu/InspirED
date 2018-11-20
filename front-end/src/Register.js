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
            password: "",
            confirmPassword: "",
            email: "",
            admin: 0,
            picture: ""
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        if(this.state.confirmPassword != null && this.state.confirmPassword === this.state.id ){
            alert("Passwords do not match")
        }
        this.state.password = bcrypt.hashSync(this.state.password, 2);
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        const { id, username, password, email, admin, picture } = this.state;
        console.log(this.state.password);
        axios
            .post("http://localhost:4000/login_register/", {
                id,
                username,
                password,
                email,
                admin,
                picture
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data.code === "ER_DUP_ENTRY") {
                    alert("Not unique");
                }
                // alert("Reg complete ");
                //window.location = "/"
            });
    };

    render() {
        return (
            <div className="content">
                <h2>Register</h2>
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
                            name="password"
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            name="confirmPassword"
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
                <img src={this.state.picture} alt="profile" width="200" height="200"></img>
            </div>
        );
    }
}

export default Register ;
