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
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    getSubjects() {
        axios
            .get("http://localhost:4000/category", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ category: res.data });
            });
    }
    handleSubmit = event => {
        event.preventDefault();
        const user_id = localStorage.getItem("user_id");
        const { category_id, name, difficulty } = this.state;

        axios
            .post("http://localhost:4000/quiz_create", {
                headers: { authorization: Token },
                category_id,
                name,
                user_id,
                difficulty
            })
            .then(res => {
                axios.get("http://localhost:4000/quiz_create", {
                    headers: { authorization: Token }   
                }).then(res => {
                    localStorage.setItem('quizCreatedId',  res.data[0].id);
                    localStorage.setItem('quizCreatedName',  res.data[0].name);
                    window.location = "/questioncreate";
                });
            });
    };

    render() {
        return (
            <div className="subject-container">
                <h1>Create quiz</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="box">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Quiz name
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter quiz name"
                                        onChange={this.onChange}
                                    />
                                </label>
                                <br />
                                <label>
                                    Category
                                    <select
                                        name="category_id"
                                        onChange={this.onChange}
                                    >
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
                                    Difficulty
                                    <select
                                        name="difficulty"
                                        onChange={this.onChange}
                                    >
                                        <option selected value="0">
                                            Select difficulty
                                        </option>
                                        <option value="1">Easy</option>
                                        <option value="2">Normal</option>
                                        <option value="3">Difficult</option>
                                    </select>
                                </label>
                                <br />
                                <button className="button" type="submit">
                                    Create quiz and add questions
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
