import React, { Component } from "react";
import "./Styles/subjects.scss";
import "./NavBar/navbar.scss";
import { NavLink, Route } from "react-router-dom";
import Register from "./User/Register";
import Login from "./User/Login";
import Subjects from "./Subject/Subjects";
import Category from "./Category/Category";
import SearchBox from "./Search/SearchBox";
import Profile from "./User/Profile";
import NewCategory from "./Category/NewCategory";
import NewSubject from "./Subject/NewSubject";

class App extends Component {
    componentDidMount() {
        const isSession = localStorage.getItem('loggedUserToken');
        if(isSession) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
        }
    }
    render() {
        return (
            <div className="App">
                <div className="navigationbar">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>                    
                    <NavLink to="/Login" exact id="login">
                        Login
                    </NavLink>
                    <NavLink to="/Register" exact id="register">
                        Register
                    </NavLink>
                    <NavLink to="/Subjects" exact>
                        Subjects
                    </NavLink>
                    <NavLink to="/Category" exact>
                        Categories
                    </NavLink>
                </div>
                <Route path="/" exact component={Profile} className="navbar"/>
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
