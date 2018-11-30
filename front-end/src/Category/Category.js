import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewCategory from "./NewCategory";
import Token from '../Auth/token';
import Material from "../Materials/Material";
import Loading from "../Styles/Loading";
import NewMaterial from "../Materials/NewMaterial";
import MaterialByCategory from "../Materials/MaterialByCategory";


export default class Category extends Component {
    constructor() {
        if(!Token){
            window.location = "/Login"
        }
        super();
        this.get = this.get.bind(this);
        this.openCategory = this.openCategory.bind(this);
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
    openCategory(category) {
        let cat = category;

        // if(category.includes('#')) {
        //     const i = category.indexOf('#');
        //     console.log(category[i]);
        //     // category[i] = ';;hash'
        // }
        window.location = `material/${category}`;
    }
    
    render() { 
        if(!this.state.category.length) return <Loading />
        return (
            <div className="subject-container">
                <h1>Categories</h1>
                <Route path="/NewCategory/" exact component={NewCategory} />
                <NavLink to="/NewCategory" exact>
                    <span className="glyphicon glyphicon-plus" />
                </NavLink>

                <div className="list-container">
                    <div className="list">
                        {this.state.category.map((cat, index) => (
                            <div key={cat.id} className="box">
                                {cat.name}
                                <br />
                                <NavLink to={`/material/${cat.name}`} >
                                <div className="study">
                                    Study!
                                </div>
                                </NavLink>
                                <Route path={`/material/${cat.name}`} component={MaterialByCategory} />
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
