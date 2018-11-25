import React, { Component } from "react";
import "./Styles/subjects.scss";
import "./NavBar/navbar.scss";
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
import Quiz_landing from "./Quiz_Landing/Quiz_landing";
import Token from "./Auth/token"

class App extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);

        this.state = {
          user: {
            username: "",
            id: "",
            picture: "",
            admin: 0
        },
        loaded:0
      }    
    }
    componentDidMount() {
       const logout = document.getElementById('logout')
        logout.style.display = 'none';
        if(Token) {
            logout.style.display = '';
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            axios.get('http://localhost:4000/user_profile', {headers: {'authorization' : Token}}).then(res => {
                this.setState({user:res.data[0], loaded:1});
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
                    <NavLink to="/logout" onClick={() => {this.logout()}} exact id="logout">
                        Logout
                    </NavLink>
                    <NavLink to="/subjects" exact>
                        Subjects
                    </NavLink>
                    <NavLink to="/category" exact>
                        Categories
                    </NavLink>
                    
                    <NavLink to="/quiz_landing" exact>
                        Quiz Home
                    </NavLink>
                </div>
                { this.state && this.state.loaded &&
                <div>
                <Route path="/" render={(props) => <Profile {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/subjects" render={(props) => <Subjects {...props} userData={this.state.user} /> } className="navbar"/>
                <Route path="/category" render={(props) => <Category {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/newcategory" render={(props) => <NewCategory {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/newsubject" render={(props) => <NewSubject {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/quiz_landing" render={(props) => <Quiz_landing {...props} userData={this.state.user} />} className="navbar" />
                </div>
                }
                <Route path="/register" exact component={Register} className="navbar"/>
                <Route path="/login" exact component={Login} className="navbar"/>           
                <SearchBox />
          
            </div>
        );
    }
}

export default App;
