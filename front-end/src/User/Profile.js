import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Settings from "./Settings";

export default class Profile extends Component {
    render() {
        return (
            <div>
                <h1>This is {this.props.userData.username}'s profile</h1>
                <NavLink to="/settings" exact>
                    Settings
                </NavLink>
                <Route
                    path="/settings"
                    render={props => (
                        <Settings {...props} userData={this.state.user} />
                    )}
                    className="navbar"
                />
            </div>
        );
    }
}
