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
            attempted: '',
            completed: ''
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const user_id = this.props.userData.id;
        axios
            .post("http://localhost:4000/quiz_landing/attempted", {
                headers: { authorization: Token },
                user_id
            })
            .then(
                res => {
                    this.setState({ attempted: res.data[0]['COUNT (*)'] });                    
                },
                axios
                    .post("http://localhost:4000/quiz_landing/completed", {
                        headers: { authorization: Token },
                        user_id
                    })
                    .then(res => {
                        this.setState({ completed: res.data[0]['COUNT (*)'] });
                    })
            );
    }
    render() {
        return (
            <div className="subject-container">
                <h1>Attempted</h1>
                <p>{this.state.attempted}</p>
                <h1>Completed</h1>
                <p>{this.state.completed}</p>
            </div>
        );
    }
}
