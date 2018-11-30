import React, { Component } from "react";
import './index.scss';
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
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
import Settings from "./User/Settings";
import Token from "./Auth/token";
import Material from "./Materials/Material";
import AllMaterial from "./Materials/AllMaterial";
import NewMaterial from "./Materials/NewMaterial";
import MaterialByCategory from "./Materials/MaterialByCategory";
import ShowMaterial from "./Materials/ShowMaterial";

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
            axios.get('http://localhost:4000/user_profile/data', {headers: {'authorization' : Token}}).then(res => {
                this.setState({user:res.data[0], loaded:1});
              });
            }            
        else {
            this.refs.navBar.style.display = 'none';
            this.refs.search.style.display = 'none';
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
                    <NavLink to="/profile" >
                        <img className="smallprofile" id="pic" src={this.state.user.picture}/>
                    </NavLink>     
                    <NavLink to="/profile" className="profile" exact activeClassName="active">
                        <input type="button" value="Home" />
                    </NavLink>                    
                    <NavLink to="/login" exact id="login" >
                        Login
                    </NavLink>
                    <NavLink to="/register" exact id="register">
                        Register
                    </NavLink>
                    <NavLink to="/subjects" exact activeClassName="active">
                        <input type="button" value="Subjects" />
                    </NavLink>                   
                    <NavLink to="/quiz_landing" exact activeClassName="active">
                        <input type="button" value="Quiz Home" />  
                    </NavLink>
                    <NavLink to="/logout" onClick={() => {this.logout()}} exact id="logout">
                        <input type="button" value="Logout" id="logoutbtn" /> 
                    </NavLink>
                </div>
                {this.state && this.state.loaded &&
                    <div>
                        <Route path="/profile" render={(props) => <Profile {...props} userData={this.state.user} />} className="navbar" />
                        <Route  path="/subjects" render={(props) => <Subjects {...props} userData={this.state.user} /> } className="navbar"/>
                        <Route path="/category" render={(props) => <Category {...props} userData={this.state.user} />} className="navbar" />
                        <Route path="/newcategory" render={(props) => <NewCategory {...props} userData={this.state.user} />} className="navbar" />
                        <Route path="/newsubject" render={(props) => <NewSubject {...props} userData={this.state.user} />} className="navbar" />
                        <Route path="/quiz_landing" render={(props) => <Quiz_landing {...props} userData={this.state.user} />} className="navbar" />
                        <Route path="/settings" render={(props) => <Settings {...props} userData={this.state.user} />} className="navbar" />
                        <Route path="/material/:category?"  component={MaterialByCategory} />   
                        <Route path="/study/material/:material" component={ShowMaterial} />   
                    </div>
                }
                <Route path="/register" exact component={Register} className="navbar"/>
                <Route path="/login" exact component={Login} className="navbar"/>   
                <Route path="/newmaterial" exact component={NewMaterial} className="navbar"/> 
                <div ref="search">
                    <SearchBox />
                </div>  
          
            </div>
        );
    }
}

export default App;
