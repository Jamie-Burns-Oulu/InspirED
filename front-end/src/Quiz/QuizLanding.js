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
        this.state = {
            new:"",
            attempted: "",
            completed: ""
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const user_id =  localStorage.getItem('user_id');
        axios
            .post("http://localhost:4000/quiz_landing/attempted", {
                headers: { authorization: Token },
                user_id
            })
            .then(
                res => {
                    this.setState({ attempted: res.data[0]["COUNT (*)"] });
                },
                axios
                    .post("http://localhost:4000/quiz_landing/completed", {
                        headers: { authorization: Token },
                        user_id
                    })
                    .then(
                        res => {
                            this.setState({
                                completed: res.data[0]["COUNT (*)"]
                            });
                        },
                        axios
                            .post(
                                "http://localhost:4000/quiz_landing/new",
                                {
                                    headers: { authorization: Token },
                                    user_id
                                }
                            )
                            .then(res => {
                                this.setState({
                                    new: res.data[0]["COUNT (*)"]
                                });
                            })
                    )
            );
    }
    render() {
        return (
            <div className="subject-container">
              <h1>{localStorage.getItem('user_name')}'s Quiz Home</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="box">
                        <h4>Try something new!</h4>
                            <p>New : {this.state.new}</p>
                        </div>
                        <div className="box">
                        <h4>You can do better!</h4>
                            <p>Attempted : {this.state.attempted}</p>
                        </div>
                        <div className="box">
                        <h4>Nailed it!</h4>
                            <p>Completed : {this.state.completed}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
