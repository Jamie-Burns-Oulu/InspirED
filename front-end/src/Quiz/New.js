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
            newQuizzes: []
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:4000/quiz_landing/new", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ newQuizzes: res.data });
                console.log(res.data);
            });
    }

    take(id) {
        window.location = "quiztake/" + id;
    }

    render() {
        return (
            <div className="content">
                <div className="subject-container">
                    <h1>New Quizzes</h1>
                    <div className="list-container">
                        <div className="list">
                            {this.state.newQuizzes.map(newQuizzes => (
                                <div
                                    className="box"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        this.take(newQuizzes.quiz_id);
                                    }}
                                >
                                    <p>
                                        <i>
                                            {newQuizzes.subject_name},{" "}
                                            {newQuizzes.category_name}
                                        </i>
                                    </p>
                                    <h3>{newQuizzes.quiz_name}</h3>
                                    <p>Just do it!</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
