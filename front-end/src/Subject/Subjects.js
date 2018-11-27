import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewSubject from "./NewSubject";
import Token from "../Auth/token";

export default class Subjects extends Component {
    constructor() {
        if (!Token) {
            window.location = "/login";
        }
        super();
        this.setSubject = this.setSubject.bind(this);
        this.get = this.get.bind(this);
        this.state = {
            subjects: [],
        };
    };
    componentDidMount() {
        this.get();
    };
    setSubject = e => {
        localStorage.setItem('currentSubject', e.target.id);
    };
    get() {
        axios
            .get("http://localhost:4000/subjects", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ subjects: res.data });
            });
    };
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
                            <div id={subject.id} key={subject.id} onMouseOver={this.setSubject} className="box">
                                <NavLink id={subject.id} to="/category" exact>
                                    {subject.name}
                                </NavLink>
                                <Route path="/category" context="hello"/>
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
