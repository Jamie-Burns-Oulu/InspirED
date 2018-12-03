import React, { Component } from 'react'
import Token from '../Auth/token';
import Activity from './Activity';
import { NavLink, Route } from "react-router-dom";
import Settings from './Settings';
import Loading from '../Styles/Loading';

export default class Profile extends Component {
    constructor() {
        super();
        if(!Token) {
          window.location = '/login';
        }
        // document.getElementById('pic').style.display = 'none';
    }
  render() {
    // if(!this.props.userData.id) return <Loading />
    return (
      <div className="profile container">
        <div className="info">
          <img className="profilePicture pro" src={ localStorage.getItem('user_pic')} alt="profile"></img>
          <ul className="userinfo">
            <li className="username">{localStorage.getItem('user_name')}</li>
            <li className="email">{localStorage.getItem('user_email')}</li>
          </ul>
        </div>
        <div className="container-settings">
          <div className="stats box" id="stats">
          Stats
          </div>
          <div className="leaderboard box" id="leaderboard">
          Leaders
          </div>
          
            <NavLink to="/settings" exact>
            <div className="settings box" id="settings">
              <span className="glyphicon glyphicon-cog"></span>
            </div>
            </NavLink>
            <Route
                path="/settings"
                exact component={Settings}
            />
          
        </div>
        <Activity /> 
      </div>
    )
  }
}
