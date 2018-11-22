import React, { Component } from 'react';
import axios from 'axios';

export default class Subjects extends Component {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.state = {
            subjects: []
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
        axios.get('http://localhost:4000/subjects').then( res => {
            this.setState({subjects: res.data});
        });
    }
    render() {
        return (
        <div className="subject-container">
        <h1>Subjects</h1>
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
            <span className="glyphicon glyphicon-menu-right" id="next-icon"></span>
            </div>
        </div>
        )   
    }
}
