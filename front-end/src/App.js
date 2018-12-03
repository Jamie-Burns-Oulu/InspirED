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
import QuizLanding from "./Quiz/QuizLanding";
import QuizCreate from "./Quiz/QuizCreate";
import QuizTake from "./Quiz/QuizTake";
import QuestionCreate from "./Question/QuestionCreate";
import Result from "./Result/Result";
import Settings from "./User/Settings";
import Token from "./Auth/token";
import MaterialByCategory from "./Materials/MaterialByCategory";
import ShowMaterial from "./Materials/ShowMaterial";

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
            this.refs.search.style.display = 'none';
        }
    }
    logout() {
        localStorage.clear();
        window.location = '/login';
    }
    render() {
        return (
            <div className="App">
                <div className="navigationbar" ref="navBar">
                    <NavLink to="/" >
                        <img className="smallprofile" id="pic" src={localStorage.getItem('user_pic')}/> 
                    </NavLink>     
                    <NavLink to="/" className="profile" exact activeClassName="active">
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
                    <NavLink to="/quizLanding" exact activeClassName="active">
                        <input type="button" value="Quiz Home" />  
                    </NavLink>
                    <NavLink to="/quizcreate" exact>
                        <input type="button" value="Quiz Create" />  
                    </NavLink>
                    <NavLink to="/logout" onClick={() => {this.logout()}} exact id="logout">
                        <input type="button" value="Logout" />  
                    </NavLink>      
                    </div>  
                    <div>     
                    <Switch>                  
                    <Route path="/" exact component={Profile} />
                    <Route path="/subjects" exact component={Subjects} />
                    <Route path="/category" exact component={Category}  />
                    <Route path="/newcategory" exact component={NewCategory}  />
                    <Route path="/newsubject" exact component={NewSubject} />
                    <Route path="/quizLanding" exact component={QuizLanding}  />
                    <Route path="/quizcreate" exact component={QuizCreate} />
                    <Route path="/quiztake/:id" component={QuizTake} />
                    <Route path="/questioncreate/:id" component={QuestionCreate} />
                    <Route path="/result/:id" component={Result} />
                    <Route path="/settings" exact component={Settings} /> 
                    <Route path="/register" exact component={Register} />
                    <Route path="/material/:category?" component={MaterialByCategory} />   
                    <Route path="/study/material/:material" component={ShowMaterial} />   
                    <Route path="/login" exact component={Login} />  
                    <Route component={Profile} />
                    </Switch>        
                    <div ref="search">
                    <SearchBox />
                    </div> 
                  
                  </div>
            </div>
        );
    }
}

export default App;
