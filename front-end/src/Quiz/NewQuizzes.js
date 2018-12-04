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
            newQuiz: []
        };
    }
    componentDidMount() {
        const user_id = localStorage.getItem("user_id");
        axios
            .post("http://localhost:4000/quiz_landing/new", {
                headers: { authorization: Token },
                user_id
            })
            .then(res => {
               var number = 0;
               for(let i in res.data){
                  number++
               }               
                this.setState({ newQuiz: number});
            });
    }

    render() {
        return (
            <div onClick="#">
                You have {this.state.newQuiz} new quizzes to try, click
                here to view them.
            </div>
        );
    }
}
