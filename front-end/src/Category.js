import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewCategory from "./NewCategory";

export default class Category extends Component {
    constructor() {
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
        const token = localStorage.getItem("loggedUserToken");
        axios.get("http://localhost:4000/category",{  headers: { authorization: token }}).then(res => {
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
