import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

//question - quiz_id(int), question (text of question), difficulty (int), (optional - material_item_id)
//answer - question_id(int), answer (text of answer), correct_answer(tiny-int)

export default class QuestionCreate extends Component {
    constructor() {
        if (!Token) {
            window.location = "/login";
        }
        super();
        this.onChange = this.onChange.bind(this);
        this.getQuiz = this.getQuiz.bind(this);
        this.checkAll = this.checkAll.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            quiz: [],
            question: "",
            answerCheck: "",
            answers: [{ answer: "", correct_answer: "0" }]
        };
    }
    componentWillMount() {
        // need quiz id instead of 1
        axios
            .get("http://localhost:4000/quiz/" + "1", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ quiz: res.data });
            });
        this.getQuiz();
    }

    handleAddAnswer = () => {
        this.setState({
            answers: this.state.answers.concat([
                { answer: "", correct_answer: "0" }
            ])
        });
    };

    handleAnswerChange = idx => evt => {
        let correctRadio = document.getElementsByName("answerCheck");
        for (let i = 0; i < correctRadio.length; i++) {
            if (correctRadio[i].checked) {
                this.setState({ answerCheck: correctRadio[i].id });
            }
        }
        const newAnswer = this.state.answers.map((answer, sidx) => {
            let correct = "0";
            idx == this.state.answerCheck ? (correct = "1") : (correct = "0");
            if (idx !== sidx) return answer;
            return {
                ...answer,
                answer: evt.target.value,
                correct_answer: correct
            };
        });
        this.setState({ answers: newAnswer });
    };

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    getQuiz() {
        axios
            .get("http://localhost:4000/quiz/" + "1", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ quiz: res.data });
            });
        console.log(localStorage);
        localStorage.removeItem("quizCreated");
    }

    checkAll() {
        console.log(this.state);
    }

    //  handleSubmit = event => {
    //      event.preventDefault();
    //      const user_id = get the user id 
    //      const { category_id, name } = this.state;
    //      axios
    //          .post("http://localhost:4000/Question_create", {
    //              headers: { authorization: Token },
    //              category_id,
    //              name,
    //              user_id
    //          })
    //          .then(res => {
    //             // window.location = "/questioncreate";
    //          });
    //  };

    render() {
        return (
            <div className="subject-container">
                <h1>Add questions to your quiz</h1>
                <div className="list-container">
                    <table>
                        <tr>
                            <th>Question</th>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="name"
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
                                        value={answers.answer}
                                        onChange={this.handleAnswerChange(idx)}
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
                <div className="arrow-container">
                    <button>Add another question</button>
                </div>
                <div align="center">
                    <button onClick={this.checkAll}>Submit quiz</button>
                </div>
            </div>
        );
    }
}
