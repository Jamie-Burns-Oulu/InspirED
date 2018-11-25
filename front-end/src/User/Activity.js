import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';

export default class Activity extends Component {
    constructor(props) {
        super(props);
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
            this.setState({instance: res.data.instances});
            console.log(this.state.instance);
        });
    }
    render() {
        return (
            <div className="container activity">
            <h1>Your recent activity</h1>
            {this.state.instance.map( quiz => (
                <div className="activity-item">
                    <p>You answered quiz: <a href="#">{quiz.name}</a></p>
                </div>
            ))}    
            </div>
        )
  }
}
