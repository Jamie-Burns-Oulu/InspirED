import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';
import Activity from './Activity';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        if(!Token) {
          window.location = '/login';
        }
    }
  render() {
    return (
      <div className="profile container">
        <div className="info">
          <img className="profilePicture pro" src={this.props.userData.picture}></img>
          <ul className="userinfo">
            <li className="username">{this.props.userData.username}</li>
            <li>{this.props.userData.email}</li>
          </ul>
        </div>
        <div className="container-settings">
          <div className="stats box" id="stats">
          Stats
          </div>
          <div className="leaderboard box" id="leaderboard">
          Leaders
          </div>
          <div className="settings box" id="settings">
            <span className="glyphicon glyphicon-cog"></span>
          </div>
        </div>
        <Activity /> 
      </div>
    )
  }
}
