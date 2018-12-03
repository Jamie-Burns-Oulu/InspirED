import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";
import token from "../Auth/token";

export default class QuizTake extends Component {
    constructor(props) {
        if (!Token) {
            window.location = "/Login";
        }
        super(props);
        this.state = {
            quizName: "",
            questions: [],
            answers: [],
            instance: ""
        };
        this.quiz_id = this.props.match.params.id;
        this.user_id = localStorage.getItem("user_id");
    }

    componentDidMount() {
        this.getQuizInfo();
        this.createInstance();
    }

    createInstance() {
      //   let user_id = this.user_id;
      //   let quiz_id = this.quiz_id;
      //   axios
      //       .post("http://localhost:4000/quiz_take/instance", {
      //           headers: { authorization: Token },
      //           user_id,
      //           quiz_id
      //       })
      //       .then(a => {
      //           axios
      //               .get("http://localhost:4000/quiz_take/instance", {
      //                   headers: { authorization: Token }
      //               })
      //               .then(res => {
      //                   this.setState({instance : res.data[0].id});
      //               });
      //       });
    }

    getQuizInfo() {
        axios
            .get("http://localhost:4000/quiz/" + this.quiz_id, {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ quizName: res.data[0].name });
               //  axios
               //      .get(
               //          "http://localhost:4000/quiz_take/questions/" +
               //              this.quiz_id,
               //          {
               //              headers: { authorization: Token }
               //          }
               //      )
               //      .then(res => {
               //          this.setState({ questions: res.data });
               //          // for (let i in res.data) {
               //          //     axios
               //          //         .get(
               //          //             "http://localhost:4000/quiz_take/answers/" +
               //          //                 res.data[i].id,
               //          //             {
               //          //                 headers: { authorization: Token }
               //          //             }
               //          //         )
               //          //         .then(response => {
               //          //             this.setState({
               //          //                 answers: this.state.answers.concat([
               //          //                     response.data
               //          //                 ])
               //          //             });
               //          //         });
               //          // }
               //      });
            });
    }

    render() {
        return (
            <div className="subject-container">
                <div className="list-container">
                    <div className="list">
                        <div className="box">
                            <button>
                                {" "}
                                <h1> Start : {this.state.quizName}</h1>
                            </button>
                        </div>
                    </div>
                    {/* <div className="list">
                        {this.state.questions.map((questions) => (
                            <div className="box">{questions.question}  <br/>
                               
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        );
    }
}
