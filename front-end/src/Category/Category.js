import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewCategory from "./NewCategory";
import Token from '../Auth/token';
import Material from "../Materials/Material";


export default class Category extends Component {
    constructor() {
        if(!Token){
            window.location = "/Login"
        }
        super();
        this.get = this.get.bind(this);
        this.state = {
            category: [],
        };
        this.currentCategory = "";
    }
    componentDidMount() {
        this.get();
    }
    get() {
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
                        {this.state.category.map(cat => (
                            <div key={cat.id} className="box">
                                {cat.name}
                                <br />
                                <div className="study">
                                    <NavLink to="/material" exact >
                                        Study!
                                    </NavLink> 
                                    <Route path="/material" exact />
                                </div>
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
