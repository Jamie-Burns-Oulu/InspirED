import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";


export default class QuizTake extends Component {
    constructor(props) {
        if (!Token) {
            window.location = "/Login";
        }
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.state = {
            quizName: "",
            questions: [],
            answers: [],
            quiz_instance: "",
            questionNumber: 0,
            answer_id: 0,
            question_id: 0
        };
        this.quiz_id = this.props.match.params.id;
        this.user_id = localStorage.getItem("user_id");
    }

    componentDidMount() {
        this.getQuizInfo();
        this.createInstance();
    }

    createInstance() {
          let user_id = this.user_id;
          let quiz_id = this.quiz_id;
          axios
              .post("http://localhost:4000/quiz_take/instance", {
                  headers: { authorization: Token },
                  user_id,
                  quiz_id
              })
              .then(a => {
                  axios
                      .get("http://localhost:4000/quiz_take/instance", {
                          headers: { authorization: Token }
                      })
                      .then(res => {
                          this.setState({quiz_instance : res.data[0].id});
                      });
              });
    }

    getQuizInfo() {
        axios
            .get("http://localhost:4000/quiz/" + this.quiz_id, {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ quizName: res.data[0].name });
                axios
                    .get(
                        "http://localhost:4000/quiz_take/questions/" +
                            this.quiz_id,
                        {
                            headers: { authorization: Token }
                        }
                    )
                    .then(res => {
                        this.setState({ questions: res.data });
                        console.log(res.data);
                        this.getAnswers();
                    });
            });
    }

    getAnswers(next) {
        if (typeof next === "undefined") {
            next = 0;
        }
        axios
            .get(
                "http://localhost:4000/quiz_take/answers/" +
                    this.state.questions[next].id,
                {
                    headers: { authorization: Token }
                }
            )
            .then(response => {
                this.setState({
                    answers: response.data
                });
            });
    }

    nextQuestion() {
        this.submitAnswer();
        var {quiz_instance} = this.state
        var next = 0 || this.state.questionNumber + 1;
        if (this.state.questions.length === next) {
            // alert("Complete");
            window.location = "/result/"+ quiz_instance;
        }
        let answerGiven = document.getElementsByName("answerGiven");
        for (let i = 0; i < answerGiven.length; i++) {
            if (answerGiven[i].checked) {
                answerGiven[i].checked = false;
            }
        }
        this.setState({ questionNumber: next });
        this.getAnswers(next);
    }

    submitAnswer(){
        var {quiz_instance, answer_id, question_id} = this.state
        axios.post("http://localhost:4000/quiz_take/answer_given", {
            headers: {authorization : Token},
            quiz_instance,
            answer_id,
            question_id
        })
    }

    onChange () {
        let answerGiven = document.getElementsByName("answerGiven");
        for (let i = 0; i < answerGiven.length; i++) {
            if (answerGiven[i].checked) {
                this.setState({ answer_id: answerGiven[i].id });
            }
        }
        var question = this.state.questions[this.state.questionNumber].id
        this.setState({question_id: question})
    };

    render() {
        const addButton = () => {
            const text = this.state.questionNumber === this.state.questions.length -1 ? {cls: 'submit', text: 'Submit'} : {cls: '', text:'Next'};
            return(<button onClick={this.nextQuestion} className={`btn btn-default ${text.cls}`}>{text.text}</button>)
        }
        return (
            <div className="quiztake-container">
                <div className="inner-container">
                    <div className="list">
                        {this.state.questions.length > 0 && (
                            <div className="box">
                                <h1>
                                    {this.state.questions
                                        ? this.state.questions[
                                                this.state.questionNumber
                                            ].question
                                        : "null"}
                                </h1>
                                <br />
                                <div className="content">
                                    <div className="ans">
                                        {this.state.answers.map(answer => (
                                            <div className="rows">
                                                <div className="answerheading">
                                                    <label for={answer.id}>{answer.answer}</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id={answer.id}
                                                        name="answerGiven"
                                                        className="answergiven"
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="arrow-container"
                >
                {addButton()}
                </div>
            </div>
        );
    }
}
