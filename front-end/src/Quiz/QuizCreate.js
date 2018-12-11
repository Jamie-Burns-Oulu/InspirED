import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

export default class Quiz_create extends Component {
    constructor() {
        if (!Token) {
            window.location = "/login";
        }
        super();
        this.onChange = this.onChange.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            category: [],
            name: "",
            category_id: "",
            difficulty: ""
        };
    }

    componentDidMount() {
        this.getSubjects();
    }

    getSubjects() {
        axios
            .get("http://localhost:4000/category", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ category: res.data });
            });
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        const user_id = localStorage.getItem("user_id");
        const { category_id, name, difficulty } = this.state;
        axios
            .get(
                "http://localhost:4000/quiz_create/checkQuizName/" +
                    category_id,
                {
                    headers: { authorization: Token }
                }
            )
            .then(res => {
                var nameCheck = 0;
                for (let i = 0; i < res.data.length; i++) {
                    if (name === res.data[i].name) {
                        nameCheck = 1;
                    }
                }
                if (nameCheck) {
                    //What should this actually do?
                    alert("This quiz name is in use");
                    nameCheck = 0;
                } else {
                    axios
                        .post("http://localhost:4000/quiz_create", {
                            headers: { authorization: Token },
                            category_id,
                            name,
                            user_id,
                            difficulty
                        })
                        .then(res => {
                            axios
                                .get("http://localhost:4000/quiz_create", {
                                    headers: { authorization: Token }
                                })
                                .then(res => {
                                    window.location =
                                        "/questioncreate/" + res.data[0].id;
                                });
                        });
                }
            });
    };

    render() {
        return (
            <div className="container">
                <h1>Create quiz</h1>
                <div className="quizCreateBox">
                    <label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter quiz name"
                            onChange={this.onChange}
                        />
                    </label>
                    <br/>
                    <label>
                        <select name="category_id" onChange={this.onChange}>
                            <option value="-" defaultChecked>
                                Select category
                            </option>
                            {this.state.category.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                    name="category"
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        <select name="difficulty" onChange={this.onChange}>
                            <option selected value="0">
                                Select difficulty
                            </option>
                            <option value="1">Easy</option>
                            <option value="2">Normal</option>
                            <option value="3">Hard</option>
                        </select>
                    </label>
                    <br />
                    {this.state.category_id &&
                    this.state.difficulty &&
                    this.state.name ? (
                        <div className="button" onClick={this.handleSubmit}>
                            Create quiz and add questions
                        </div>
                    ) : (
                        <div>
                            <i>please complete all fields</i>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
