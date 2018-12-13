import React, { Component } from 'react';
import axios from 'axios';
import Token from '../Auth/token';
import Modal from '../Modal/Modal';
import Quiz_create from './QuizCreate';
import QuestionCreate from '../Question/QuestionCreate';

class ShowQuiz extends Component {
    constructor(props){
        super(props);
        this.get = this.get.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.generateData = this.generateData.bind(this);
        this.state = {
            quiz: [],
            category: '',
            catname:"",
            subname:"",
            show: false,
            createQuestion: false,
            quizDone: false,
            currentNewQuiz: []
        }
        this.showModal = e => this.setState({ show: !this.state.show });

        this.quizDone = id => {
            this.setState({quizDone: true});
            this.state.currentNewQuiz.push(id);
        }
        this.getId = () => this.state.currentNewQuiz[0];
        // this.update = () => this.state.currentNewQuizId;
    }
    componentDidMount() {
        this.get();
    }
    generateData() {
        const   id = this.props.match.params.id,
                quizid = this.state.quizid,
                data = this.state.createQuestion ? <QuestionCreate quizid={quizid} /> : <Quiz_create quizDone={this.quizDone} modalCategoryId={id}/>
        return data;
    }
    onMouseEnter(quiz) {
        const merits = ['🥇','🎖', '🎯', '🏆', '💯', '🔥', '⚡️', '💫'];
        const el = document.getElementById(quiz.quizid),
                quizpath = `/quiztake/${quiz.quizid}`,
                result= `/result/${quiz.instanceid}`;
        let content = '';
        if((quiz.instanceresult < 100 && quiz.instanceresult !== null) && quiz.id !== -1) {
                content = `<div class="quizhover difficulty-${quiz.difficulty}">
                                <div><h6 class="headerhover">${quiz.quizname}</h6></div>
                                <div><a href=${quizpath}>Try again</a></div>
                                <div><a href=${result}>See result</a></div>
                                </div>`
            el.innerHTML = content;
        }
        if(quiz.instanceresult === 100) {
            content = `<div class="quizhover">
                            
                            <div><h6 class="headerhover">${quiz.quizname}</h6></div>
                            <div><a href=${result}>See result</a></div>
                            <div class="info">Quiz completed fam! ${merits[Math.floor(Math.random() * merits.length)]}</div>
                            </div>`
            el.innerHTML = content;
        }
        if(quiz.instanceresult === null) {
            content = `<div class="quizhover">
                            <div><h6 class="headerhover">${quiz.quizname}</h6></div>
                            <div><a href=${quizpath}>Just do it! ${merits[4]}</a></div>
                        </div>`
            el.innerHTML =  content;
        }
    }
    onMouseLeave(e, quiz) {
        const el = e.target;
        if((quiz.instanceresult < 100 && quiz.instanceresult !== null) && quiz.id !== -1) {
            el.innerHTML = quiz.quizname;
        }
        if(quiz.instanceresult === 100) {
            el.innerHTML = quiz.quizname;
        }
        else {
            el.innerHTML = quiz.quizname;
        }
        if(this.state.quiz.length){console.log(this.state.quiz)}
        
    }
    get() {
        const   params = this.props.match.params.id,
                HEADERS = {headers: {authorization: Token}},
                PATH = params !== undefined ? 
                        `http://localhost:4000/showquiz/${params}` :
                        `http://localhost:4000/showquiz/`;

        axios.get(PATH, HEADERS).then( res => {
            res.data.push({id: -1, quizname: 'Add new'});
            this.setState({quiz: res.data});
            this.setState({catname: res.data[0].catname, subname:res.data[0].subname});
            
        });
        
        
    }
    
    render() {
        return (
            <div className="container">
            <h1>All quizzes for {this.state.subname}, {this.state.catname}</h1>
                <div className="material-bycategory">
                    {this.state.quiz.map( q => (
                        <div>
                             <div className="all-material">
                                <div className="items">
                                    <div 
                                        className={`box material-parent ${q.instanceresult === 100 ? 'quizdone' : '' }`} 
                                        onMouseEnter={e => {this.onMouseEnter(q)}} 
                                        onMouseLeave={e => {this.onMouseLeave(e, q)}}
                                        id={q.id === -1 ? 'addnew' : q.quizid}
                                        onClick={() => { if(q.id === -1) this.showModal() }}
                                    > 
                                        {q.quizname}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal
                    data={this.generateData()}
                    onClose= {this.showModal}
                    show= {this.state.show} 
                    updateData={this.update}
                    quizId={this.state.currentNewQuiz}
                    getId={this.getId}
                    typeQuiz={true}
                />
            </div>
        );
    }
}

export default ShowQuiz;