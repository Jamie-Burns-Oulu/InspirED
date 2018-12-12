import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

export default class Completed extends Component {
    constructor() {
        if (!Token) {
            window.location = "/Login";
        }
        super();
        this.state = {
            attemptedQuizzes: []
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:4000/quiz_landing/attempted", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ attemptedQuizzes: res.data });
                console.log(res.data);
            });
    }
    result(id) {
        window.location = "result/" + id;
    }
    take(id) {
        window.location = "quiztake/" + id;
    }

    render() {
        return (
            <div className="content">
                <div className="subject-container">
                    <h1>Attempted Quizzes</h1>
                    <div className="list-container">
                        <div className="list">
                            {this.state.attemptedQuizzes.map(attempted => (
                                <div className="box">
                                    <p>
                                        <i>
                                            {attempted.subject_name},{" "}
                                            {attempted.category_name}
                                        </i>
                                    </p>
                                    <h3>{attempted.name}</h3>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            this.take(attempted.quiz_id);
                                        }}
                                    >
                                        Try Again
                                    </div>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            this.result(attempted.id);
                                        }}
                                    >
                                        View Result
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
