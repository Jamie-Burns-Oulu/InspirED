import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

export default class QuestionCreate extends Component {
    constructor(props) {
        if (!Token) {
            window.location = "/login";
        }
        super(props);
        this.onChange = this.onChange.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            question: "",
            answerCheck: "",
            questionId: "",
            quizName: "",
            answers: [{ answer: "" }]
        };
        this.quiz_id = this.props.match.params.id;
    }

    componentDidMount() {
        axios
            .get("http://localhost:4000/quiz/" + this.quiz_id, {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ quizName: res.data[0].name });
            });
    }

    handleAddAnswer = () => {
        this.setState({
            answers: this.state.answers.concat([{ answer: "" }])
        });
    };

    handleAnswerChange = idx => evt => {
        const newAnswer = this.state.answers.map((answer, sidx) => {
            if (idx !== sidx) return answer;
            return {
                ...answer,
                answer: evt.target.value
            };
        });
        this.setState({ answers: newAnswer });
    };

    onChange = e => {
        let correctRadio = document.getElementsByName("answerCheck");
        for (let i = 0; i < correctRadio.length; i++) {
            if (correctRadio[i].checked) {
                this.setState({ answerCheck: correctRadio[i].id });
            }
        }
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    checkAll() {
        console.log(this.state);
    }

    handleSubmit = event => {
        event.preventDefault();
        let submit = 0;
        if (event.target.name === "submit") {
            submit = 1;
        }
        const { question } = this.state;
        const quiz_id = this.quiz_id;
        axios
            .post("http://localhost:4000/question_create", {
                headers: { authorization: Token },
                quiz_id,
                question
            })
            .then(res => {
                axios
                    .get("http://localhost:4000/question_create", {
                        headers: { authorization: Token }
                    })
                    .then(res => {
                        this.setState({ questionId: res.data[0].id });
                        if (res) {
                            const {
                                answers,
                                questionId,
                                answerCheck
                            } = this.state;
                            axios
                                .post("http://localhost:4000/answer_create", {
                                    headers: { authorization: Token },
                                    answers,
                                    questionId,
                                    answerCheck
                                })
                                .then(res => {
                                    if (submit) {
                                        window.location = "/quizlanding";
                                    } else {
                                        window.location =
                                            "/questioncreate/" + this.quiz_id;
                                    }
                                });
                        }
                    });
            });
    };

    render() {
        return (
            <div className="subject-container">
                <h1>Add questions to {this.state.quizName}</h1>
                <div className="list-container">
                    <table>
                        <tr>
                            <th>Question</th>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="question"
                                    placeholder="Enter question"
                                    onChange={this.onChange}
                                    size="60"
                                />
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <th>Answer</th>
                            <th> Correct?</th>
                        </tr>
                        {this.state.answers.map((answers, idx) => (
                            <tr key={idx}>
                                <td>
                                    <input
                                        type="text"
                                        name="answer"
                                        placeholder={`Enter answer ${idx + 1}`}
                                        value={answers.answer}
                                        onChange={this.handleAnswerChange(idx)}
                                        size="60"
                                    />
                                </td>
                                <br />
                                <td>
                                    <input
                                        type="radio"
                                        name="answerCheck"
                                        id={idx}
                                        value={idx}
                                        onChange={this.onChange}
                                    />
                                </td>
                            </tr>
                        ))}
                        <br />
                        <button type="button" onClick={this.handleAddAnswer}>
                            Add another answer
                        </button>
                    </table>
                </div>
                <div className="arrow-container" onClick={this.handleSubmit}>
                    <button>Add another question</button>
                </div>
                <div align="center">
                    <button name="submit" onClick={this.handleSubmit}>
                        Submit quiz
                    </button>
                </div>
            </div>
        );
    }
}
