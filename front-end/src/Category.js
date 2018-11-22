import React, { Component } from 'react';
import axios from 'axios';
import Token from './token';

export default class Category extends Component {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.state = {
          category: []
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
        axios.get('http://localhost:4000/category').then( res => {
            this.setState({category: res.data});
        });
    }
    render() {
        return (
        <div className="subject-container">
        <h1>Categories</h1>
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
            <span className="glyphicon glyphicon-menu-right" id="next-icon"></span>
            </div>
        </div>
        )
    }
}