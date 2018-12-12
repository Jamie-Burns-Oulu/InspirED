import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

export default class Category extends Component {
    constructor() {
        if (!Token) {
            window.location = "/Login";
        }
        super();
        this.get = this.get.bind(this);
        this.state = {
            new: "",
            attempted: "",
            completed: ""
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const HEADERS = { headers: { authorization: Token } };
        axios
            .get("http://localhost:4000/quiz_landing/new", HEADERS)
            .then(res => {
                this.setState({ new: res.data.length });
            });
        axios
            .get("http://localhost:4000/quiz_landing/complete", HEADERS)
            .then(res => {
                this.setState({ completed: res.data.length });
                axios
                    .get(
                        "http://localhost:4000/quiz_landing/attempted",
                        HEADERS
                    )
                    .then(res => {
                        this.setState({ attempted: res.data.length });
                    });
            });
    }
    completedQuizzes() {
        window.location = "/completed";
    }
    attemptedQuizzes() {
        window.location = "/attempted";
    }
    newQuizzes() {
        window.location = "/new";
    }

    render() {
        return (
            <div className="subject-container">
                <h1>{localStorage.getItem("user_name")}'s Quiz Home</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="ql-box"
                        style={{ cursor: "pointer" }}
                        onClick={this.newQuizzes}>
                            <h3>Try something new!</h3>
                            <p>New : {this.state.new}</p>
                        </div>
                        <div
                            className="ql-box"
                            style={{ cursor: "pointer" }}
                            onClick={this.attemptedQuizzes}
                        >
                            <h3>You can do better!</h3>
                            <p>To be finished : {this.state.attempted}</p>
                        </div>
                        <div
                            className="ql-box"
                            style={{ cursor: "pointer" }}
                            onClick={this.completedQuizzes}
                        >
                            <h3>Nailed it!</h3>
                            <p>Completed : {this.state.completed}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
