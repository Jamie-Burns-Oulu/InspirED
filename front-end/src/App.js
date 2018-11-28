import React, { Component } from "react";
import './main.scss';
import "./Styles/subjects.scss";
import "./NavBar/navbar.scss";
import './User/profile.scss';
import './User/activity.scss';
import { NavLink, Route } from "react-router-dom";
import axios from "axios";
import Register from "./User/Register";
import Login from "./User/Login";
import Subjects from "./Subject/Subjects";
import Category from "./Category/Category";
import SearchBox from "./Search/SearchBox";
import Profile from "./User/Profile";
import NewCategory from "./Category/NewCategory";
import NewSubject from "./Subject/NewSubject";
import QuizLanding from "./Quiz/QuizLanding";
import QuizCreate from "./Quiz/QuizCreate";
import QuestionCreate from "./Question/QuestionCreate"
import Settings from "./User/Settings";
import Token from "./Auth/token";

class App extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
       const logout = document.getElementById('logout')
        logout.style.display = 'none';
        if(Token) {
            logout.style.display = '';
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            axios.get('http://localhost:4000/user_profile/data', {headers: {'authorization' : Token}}).then(res => {
            localStorage.setItem('user_id', res.data[0].id);   
            localStorage.setItem('user_name', res.data[0].username);
            localStorage.setItem('user_pic', res.data[0].picture);
            localStorage.setItem('user_email', res.data[0].email);
            });
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
                    <NavLink to="/category" exact>
                        Categories
                    </NavLink>                    
                    <NavLink to="/quizlanding" exact>
                        Quiz Home
                    </NavLink>
                    <NavLink to="/quizcreate" exact>
                        Quiz Create
                    </NavLink>
                    <NavLink to="/logout" onClick={() => {this.logout()}} exact id="logout">
                        Logout
                    </NavLink>      
                    </div>  
                    <div>                   
                    <Route path="/" exact component={Profile} className="navbar" />
                    <Route path="/subjects" exact component={Subjects} className="navbar"/>
                    <Route path="/category" exact component={Category} className="navbar" />
                    <Route path="/newcategory" exact component={NewCategory} className="navbar" />
                    <Route path="/newsubject" exact component={NewSubject} className="navbar" />
                    <Route path="/quizLanding" exact component={QuizLanding} className="navbar" />
                    <Route path="/quizcreate" exact component={QuizCreate}  className="navbar" />
                    <Route path="/questioncreate" exact component={QuestionCreate} className="navbar" />
                    <Route path="/settings" exact component={Settings} className="navbar" /> 
                    <Route path="/register" exact component={Register} className="navbar"/>
                    <Route path="/login" exact component={Login} className="navbar"/>           
                    <SearchBox />
                  </div>
            </div>
        );
    }
}

export default App;
