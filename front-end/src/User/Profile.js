import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';

export default class Profile extends Component {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.state = {
            username: "",
            id: "",
            profile: "",
            admin: 0,
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
      axios.get('http://localhost:4000/user_profile', {headers: {'authorization' : Token}}).then(res => {
        this.setState(res.data[0]);
      });
    }
  render() {
    return (
      <div>
        <h1>This is {this.state.username}'s profile</h1>
      </div>
    )
  }
}
