import React, { Component } from "react";
import Token from "../Auth/token";
import axios from "axios";

export default class NewQuizzes extends Component {
    constructor() {
        super();
        if (!Token) {
            window.location = "/Login";
        }
        this.state = {
            newQuiz: 0
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:4000/quiz_landing/new", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ newQuiz: res.data.length });
            });
    }
    newQuizzes() {
        window.location = "/new";
    }
    create() {
        window.location = "/subjects";
    }

    render() {
        return (
            <div>
                {this.state.newQuiz === 1 ? (
                    <div onClick={this.newQuizzes}>
                     {this.state.newQuiz} New quiz
                    </div>
                ) : this.state.newQuiz > 1 ? (
                    <div onClick={this.newQuizzes}>
                        {this.state.newQuiz} New quizzes
                    </div>
                ) : (
                    <div onClick={this.create}>
                       Learn
                    </div>
                )}
            </div>
        );
    }
}
