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
        if(Token) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            axios.get('http://localhost:4000/user_profile', {headers: {'authorization' : Token}}).then(res => {
                this.setState({user:res.data[0], loaded:1});
              });
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
                    <NavLink to="/Quiz_landing" exact>
                        Quiz Home
                    </NavLink>
                </div>
                { this.state && this.state.loaded &&
                <div>
                <Route path="/" render={(props) => <Profile {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/Subjects" render={(props) => <Subjects {...props} userData={this.state.user} /> } className="navbar"/>
                <Route path="/Category" render={(props) => <Category {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/NewCategory" render={(props) => <NewCategory {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/NewSubject" render={(props) => <NewSubject {...props} userData={this.state.user} />} className="navbar" />
                <Route path="/Quiz_landing" render={(props) => <Quiz_landing {...props} userData={this.state.user} />} className="navbar" />
                </div>
                }
                <Route path="/Register" exact component={Register} className="navbar"/>
                <Route path="/Login" exact component={Login} className="navbar"/>
           
                <SearchBox />
          
            </div>
        );
    }
}

export default App;
