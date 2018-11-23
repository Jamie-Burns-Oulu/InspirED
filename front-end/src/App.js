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
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        const isSession = localStorage.getItem('loggedUserToken'),
            logout = document.getElementById('logout')
            logout.style.display = 'none';
        if(isSession) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            logout.style.display = 'initial';
        }
        else {
            this.refs.navBar.style.display = 'none';
        }

    }
    logout() {
        localStorage.removeItem('loggedUserToken');
        window.location = '/login';
    }
    render() {
        return (
            <div className="App">
                <div className="navigationbar" ref="navBar">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>                    
                    <NavLink to="/login" exact id="login">
                        Login
                    </NavLink>
                    <NavLink to="/register" exact id="register">
                        Register
                    </NavLink>
                    <NavLink to="/subjects" exact>
                        Subjects
                    </NavLink>
                    <NavLink to="/categories" exact>
                        Categories
                    </NavLink>
                    <NavLink to="/logout" onClick={() => {this.logout()}} exact id="logout">
                        Logout
                    </NavLink>
                </div>
                <Route path="/" exact component={Profile} className="navbar"/>
                <Route path="/register" exact component={Register} className="navbar"/>
                <Route path="/login" exact component={Login} className="navbar"/>
                <Route path="/subjects" exact component={Subjects} className="navbar"/>
                <Route path="/category" exact component={Category} className="navbar" />
                {/* <Route path="/NewCategory" exact component={NewCategory} className="navbar" />
                <Route path="/NewSubject" exact component={NewSubject} className="navbar" /> */}
                <SearchBox />
            </div>
        );
    }
}

export default App;
