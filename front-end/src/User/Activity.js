import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";

export default class Activity extends Component {
    constructor() {
        super();
        this.state = {
            instances: [],
            quizzes: []
        };
    }
    componentWillMount() {
        axios
            .get("http://localhost:4000/user_profile/i", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ instance: res.data });
            });
        axios
            .get("http://localhost:4000/user_profile/q", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ quizzes: res.data });
            });
    }
    render() {
        return (
            <div className="container activity">
                <h1>Your recent activity</h1>
                {this.state.instance ? (
                    <div>
                    <div className="box">
                        <p><i>Attempted quizzes, click to view result</i></p>
                        <p><i>You have answered, {this.state.instance.length} this week!</i></p>
                        {this.state.instance.map(instance => (
                            <span className="activity-item" key={instance.id}>
                                <h3>
                                    <a href={`result/${instance.id}`}>
                                        {instance.name}
                                    </a>
                                </h3>
                            </span>
                        ))}
                    </div>
                      <div className="box">
                    <p><i>Quizzes you have created</i></p>
                    <p><i>You have created, {this.state.quizzes.length} quizzes this week!</i></p>
                      {this.state.quizzes.map(quiz => (
                          <div className="activity-item" key={quiz.id}>
                              <h3>
                                      {quiz.name}
                              </h3>
                          </div>
                      ))}
                  </div>
                  </div>




                ) : (
                    <div />
                )}
            </div>
        );
    }
}
