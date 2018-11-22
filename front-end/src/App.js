import React, { Component } from "react";
import "./App.css";
import "./subjects.scss";
import "./navbar.scss";
import { NavLink, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Subjects from "./Subjects";
import Category from "./Category";
import SearchBox from "./SearchBox";
import NewCategory from "./NewCategory";
import NewSubject from "./NewSubject";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="navigationbar">
                    
                    <NavLink to="/" exact>
                        Home
                    </NavLink>                    
                    <NavLink to="/Login" exact >
                        Login
                    </NavLink>
                    <NavLink to="/Register" exact>
                        Register
                    </NavLink>
                    <NavLink to="/Subjects" exact>
                        Subjects
                    </NavLink>
                    <NavLink to="/Category" exact>
                        Categories
                    </NavLink>
                </div>
                <Route path="/Register" exact component={Register} className="navbar"/>
                <Route path="/Login" exact component={Login} className="navbar"/>
                <Route path="/Subjects" exact component={Subjects} className="navbar"/>
                <Route path="/Category" exact component={Category} className="navbar" />
                <Route path="/NewCategory" exact component={NewCategory} className="navbar" />
                <Route path="/NewSubject" exact component={NewSubject} className="navbar" />
                <SearchBox />
            </div>
        );
    }
}

export default App;
