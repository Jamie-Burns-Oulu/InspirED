import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';

export default class Activity extends Component {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.state = {
            instance: []
        }
    }
    componentWillMount() {
        this.get();
    }
    get() {
        axios.get('http://localhost:4000/user_profile', {headers: {'authorization' : Token}}).then(res => {
            this.setState({instance: res.data});
        });
    }
    render() {
        return (
            <div className="container activity">
            <h1>Your recent activity</h1>
            {this.state.instance.map( quiz => (
                <div className="activity-item" key={quiz.id}>
                    <p>You answered quiz: <a href={"/result/"+quiz.id}>{quiz.name}</a></p>
                </div>
            ))}    
            </div>
        )
    }
}
