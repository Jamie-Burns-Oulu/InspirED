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

    render() {
        return (
            <div>
                {this.state.newQuiz === 1 ? (
                    <div onClick="#">
                        You have {this.state.newQuiz} new quiz to try! Click
                        here to view them.
                    </div>
                ) : this.state.newQuiz > 1 ? (
                    <div onClick="#">
                        You have {this.state.newQuiz} new quizzes to try! Click
                        here to view them.
                    </div>
                ) : (
                    <div onClick="#">
                        You have no new quizzes to try, why not create some?
                    </div>
                )}
            </div>
        );
    }
}
