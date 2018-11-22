import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewSubject from "./NewSubject";
import Token from '../Auth/token';

export default class Subjects extends Component {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.state = {
            subjects: []
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        axios
            .get("http://localhost:4000/subjects", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ subjects: res.data });
            });
    }
    render() {
        return (
            <div className="subject-container">
                <h1>Subjects</h1>
                <Route path="/NewSubject" exact component={NewSubject} />
                <NavLink to="/NewSubject" exact>
                    <span className="glyphicon glyphicon-plus" />
                </NavLink>
                <div className="list-container">
                    <div className="list">
                        {this.state.subjects.map(subject => (
                            <div key={subject.id} className="box">
                                {subject.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="arrow-container">
                    <span
                        className="glyphicon glyphicon-menu-right"
                        id="next-icon"
                    />
                </div>
            </div>
        );
    }
}
