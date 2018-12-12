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
            completedQuizzes: []
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:4000/quiz_landing/complete", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ completedQuizzes: res.data });
            });
    }
    mouseEnter(e, completed) {
        const el = e.target;
        const result = `result/${completed.quiz_instance_id}`;
        el.innerHTML = `<div class="acn-box-hover">
                        <div><h3>${completed.name}</h3></div>
                        <div><a href=${result}>Result</a></div>
                        </div>`;
    }
    mouseExit(e, completed) {
        const el = e.target;
        el.innerHTML = `<h4>${completed.name}</h4>`;
    }

    render() {
        return (
            <div className="content">
                <div className="acn-container">
                    <h1>Completed Quizzes</h1>
                    <div className="acn-inner-container">
                            {this.state.completedQuizzes.map(completed => (
                                <div
                                    className="acn-box"
                                    onMouseEnter={e => {
                                        this.mouseEnter(e, completed);
                                    }}
                                    onMouseLeave={e => {
                                        this.mouseExit(e, completed);
                                    }}                                  
                                >                              
                                    <h4>{completed.name}</h4>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}
