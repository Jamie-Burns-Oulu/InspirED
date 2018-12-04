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
        this.completedQuizzes = this.completedQuizzes.bind(this);
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
                        "http://localhost:4000/quiz_landing/attempted", HEADERS)
                    .then(res => {
                        let attempted = res.data.length - this.state.completed;
                        this.setState({ attempted: attempted });
                    });
            });
    }
    completedQuizzes() {
        window.location = "/completed";
    }

    render() {
        return (
            <div className="subject-container">
                <h1>{localStorage.getItem("user_name")}'s Quiz Home</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="box">
                            <h4>Try something new!</h4>
                            <p>New : {this.state.new}</p>
                        </div>
                        <div className="box">
                            <h4>You can do better!</h4>
                            <p>To be finished : {this.state.attempted}</p>
                        </div>
                        <div
                            className="box"
                            style={{ cursor: "pointer" }}
                            onClick={this.completedQuizzes}
                        >
                            <h4>Nailed it!</h4>
                            <p>Completed : {this.state.completed}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
