import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewCategory from "./NewCategory";
import Token from '../Auth/token';

export default class Category extends Component {
    constructor() {
        if(!Token){
            window.location = "/Login"
        }
        super();
        this.get = this.get.bind(this);
        this.state = {
            category: []
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const currentSubject = localStorage.getItem('currentSubject');
        (currentSubject) ? 
        axios.get("http://localhost:4000/category/"+currentSubject,{  headers: { authorization: Token }}).then(res => {
            this.setState({ category: res.data });
            localStorage.removeItem('currentSubject');
        })
        :
        axios.get("http://localhost:4000/category",{  headers: { authorization: Token }}).then(res => {
            this.setState({ category: res.data });
        });
    }
    render() {
        return (
            <div className="subject-container">
                <h1>Categories</h1>
                <Route path="/NewCategory/" exact component={NewCategory} />
                <NavLink to="/NewCategory" exact>
                    <span className="glyphicon glyphicon-plus" />
                </NavLink>
                <div className="list-container">
                    <div className="list">
                        {this.state.category.map(category => (
                            <div key={category.id} className="box">
                                {category.name}
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
