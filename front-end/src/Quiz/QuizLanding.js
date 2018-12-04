import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

export default class Category extends Component {
    constructor() {
        if (!Token) {
            window.location = "/Login";
        }
        super();
        this.get = this.get.bind(this);
        this.completedQuizzes = this.completedQuizzes.bind(this);
        this.state = {
            new: "",
            attempted: "",
            completed: ""
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const user_id = localStorage.getItem("user_id");
        axios.get("http://localhost:4000/quiz").then(res => {
            var allQuizzes = [];
            for (let i in res.data) {
                allQuizzes.push(res.data[i].id);
            }
            axios
                .post("http://localhost:4000/quiz_landing/attempted", {
                    headers: { authorization: Token },
                    user_id
                })
                .then(res => {
                    var complete = 0;
                    var completed_ids = [];
                    var idsInstance = [];
                    for (let i in res.data) {
                        if (res.data[i].result === 100) {
                            complete++;
                            completed_ids.push(res.data[i].quiz_id);
                        }
                        idsInstance.push(res.data[i].quiz_id);
                    }
                    for (let i in allQuizzes) {
                        allQuizzes = allQuizzes.filter(
                            item => item !== idsInstance[i]
                        );
                    }
                    idsInstance = idsInstance.filter(
                        (x, i, a) => a.indexOf(x) === i
                    );

                    for (let i in completed_ids) {
                        idsInstance = idsInstance.filter(
                            item => item !== completed_ids[i]
                        );
                    }
                    var attempted = idsInstance.length;
                    var newQuizzes = allQuizzes.length;
                    this.setState({
                        completed: complete,
                        attempted: attempted,
                        new: newQuizzes
                    });
                });
        });
    }
    completedQuizzes(){
        window.location = "/completed"
    }


    render() {
        return (
            <div className="subject-container">
                <h1>{localStorage.getItem("user_name")}'s Quiz Home</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="box">
                            <h4>Try something new!</h4>
                            <p>New : {this.state.new}</p>
                        </div>
                        <div className="box">
                            <h4>You can do better!</h4>
                            <p>To be finished : {this.state.attempted}</p>
                        </div>
                        <div className="box" onClick={this.completedQuizzes}>
                            <h4>Nailed it!</h4>
                            <p>Completed : {this.state.completed}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
