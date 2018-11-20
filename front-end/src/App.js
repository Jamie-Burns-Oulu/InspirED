import React, { Component } from "react";
import "./App.css";
import { NavLink, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavLink to="/" exact>
                    Home
                </NavLink>
                |
                <NavLink to="/Login" exact>
                    Login
                </NavLink>
                <Route path="/Login" exact component={Login} />
                |
                <NavLink to="/Register" exact>
                    Register
                </NavLink>
                <hr />
                <Route path="/Register" exact component={Register} />
            </div>
        );
    }
}

export default App;
