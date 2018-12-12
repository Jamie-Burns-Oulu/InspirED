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
            attemptedQuizzes: []
        };
    }
    componentDidMount() {
        axios
            .get("http://localhost:4000/quiz_landing/attempted", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ attemptedQuizzes: res.data });
            });
    }
    mouseEnter(e, attempted) {
        const el = e.target;
        const result = `result/${attempted.id}`;
        const quiztake = `quiztake/${attempted.id}`;
        el.innerHTML = `<div class="acn-box-hover">
                        <i>${attempted.subject_name}, ${
                        attempted.category_name}</i>
                        <div><h3>${attempted.name}</h3></div>
                        <div><a href=${result}>Result</a></div>
                        <div><a href=${quiztake}>Try again</a></div>
                        </div>`;
    }
    mouseExit(e, attempted) {
        const el = e.target;
        el.innerHTML = `<h3>${attempted.name}</h3>`;
    }

    render() {
        return (
            <div className="content">
                <div className="acn-container">
                    <h1>Attempted Quizzes</h1>
                    <div className="acn-inner-container">                      
                            {this.state.attemptedQuizzes.map(attempted => (
                                <div
                                    className="acn-box"
                                    onMouseEnter={e => {
                                        this.mouseEnter(e, attempted);
                                    }}
                                    onMouseLeave={e => {
                                        this.mouseExit(e, attempted);
                                    }}
                                >
                                    <h3>{attempted.name}</h3>
                                </div>
                            ))}                       
                    </div>
                </div>
            </div>
        );
    }
}
