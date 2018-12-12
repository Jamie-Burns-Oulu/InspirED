import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

export default class Completed extends Component {
    constructor() {
        if (!Token) {
            window.location = "/Login";
        }
        super();
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
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
            });
    }
    mouseEnter(e, newQuizzes) {
        const el = e.target;
        const quiztake = `quiztake/${newQuizzes.quiz_id}`;
        el.innerHTML = `<div class="acn-box-hover">
                        <i>${newQuizzes.subject_name}, ${
                            newQuizzes.category_name}</i>
                        <div><h3>${newQuizzes.quiz_name}</h3></div>
                        <div><a href=${quiztake}>Just do it!</a></div>
                        </div>`;
    }
    mouseExit(e, newQuizzes) {
        const el = e.target;
        el.innerHTML = `<h3>${newQuizzes.quiz_name}</h3>`;
    }    

    render() {
        return (
            <div className="content">
                <div className="acn-container">
                    <h1>New Quizzes</h1>
                    <div className="acn-inner-container">
                            {this.state.newQuizzes.map(newQuizzes => (
                                <div
                                    className="acn-box"
                                    onMouseEnter={e => {
                                        this.mouseEnter(e, newQuizzes);
                                    }}
                                    onMouseLeave={e => {
                                        this.mouseExit(e, newQuizzes);
                                    }}
                                >                    
                                    <h3>{newQuizzes.quiz_name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        );
    }
}
