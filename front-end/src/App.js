import React, { Component } from "react";
import './index.scss';
import { NavLink, Route, Switch, } from "react-router-dom";
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
import ShowQuiz from "./Quiz/ShowQuiz";
import Completed from "./Quiz/Completed";
import Attempted from "./Quiz/Attempted";
import New from "./Quiz/New";
import Leaderboard from "./Stats/Leaderboard";

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
            
        }            
        else {
            this.refs.navBar.style.display = 'none';
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
                        <img className="smallprofile" id="pic" alt="profilePic" src={localStorage.getItem('user_pic')}/> 
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
                        <input type="button" value="Start Learning" />
                    </NavLink>                   
                    <NavLink to="/quizLanding" exact activeClassName="active">
                        <input type="button" value="My Quiz Home" />  
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
                    <Route path="/completed" component={Completed} />
                    <Route path="/attempted" component={Attempted} />
                    <Route path="/new" component={New} />
                    <Route path="/settings" exact component={Settings} /> 
                    <Route path="/register" exact component={Register} />
                    <Route path="/leaderboard" exact component={Leaderboard} />
                    <Route path="/material/:category?" component={MaterialByCategory} />   
                    <Route path="/study/material/:material" component={ShowMaterial} />   
                    <Route path="/quiz/:id?" exact component={ShowQuiz}/>
                    <Route path="/login" exact component={Login} className="navbar"/>  
                    <Route path="/logout"/>  
                    <Route component={Profile} />
                    </Switch>   
                  </div>
            </div>
        );
    }
}

export default App;
