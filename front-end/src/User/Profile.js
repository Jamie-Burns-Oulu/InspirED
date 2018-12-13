import React, { Component } from "react";
import Token from "../Auth/token";
import Activity from "./Activity";
import { NavLink, Route } from "react-router-dom";
import Settings from "./Settings";
import Loading from "../Styles/Loading";
import NewQuizzes from "../Quiz/NewQuizzes";

export default class Profile extends Component {
    constructor() {
        super();
        if (!Token) {
            window.location = "/login";
        }
    }
    stats() {
        window.location = "leaderboard";
    }
    settings(){
        window.location = "settings";
    }
    render() {
        while (!localStorage.getItem("user_pic")) return <Loading />;
        return (
            <div className="profile container">
                <div className="container-settings">
                <div className="info">
                    <img
                        className="profilePicture p-pic pro"
                        src={localStorage.getItem("user_pic")}
                        alt="profile"
                    />
                    <ul className="userinfo">
                        <li className="username">
                            {localStorage.getItem("user_name")}
                        </li>
                        <li className="email">
                            {localStorage.getItem("user_email")}
                        </li>
                    </ul>
                </div>
                    <div className="stats box" id="stats">
                        <NewQuizzes />
                    </div>
                    <div
                        className="leaderboard box"
                        id="leaderboard"
                        onClick={() => {
                            this.stats();
                        }}
                    >
                        Leaderboard
                    </div>
                    <div
                        className="settings box"
                        id="settings"
                        onClick={() => {
                            this.settings();
                        }}
                    >
                        <span className="glyphicon glyphicon-cog" />
                    </div>
                </div>
                <div className="activity-container">
                    <Activity />
                </div>
            </div>
        );
    }
}
