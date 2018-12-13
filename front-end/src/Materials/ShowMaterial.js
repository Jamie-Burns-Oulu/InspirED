import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';
import Modal from '../Modal/Modal';
import NewMaterialItem from './NewMaterialItem';
import Loading from '../Styles/Loading';

export default class ShowMaterial extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.editContent = this.editContent.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.state = {
            content: [],
            show: false,
            quizzes: [],
            current: '',
            saved: [],
        }
        this.showModal = e => {
            this.setState({ show: !this.state.show }); 
        }
        window.addEventListener('mouseup', e => {
            if(!e.target.classList.value.includes('materialitem-box') && !e.target.classList.value.includes('btn btn-default')) {
                const els = document.getElementsByClassName('update-button');
                for(const item of els) {
                    item.style.visibility = 'hidden';
                }
                const el = document.getElementsByClassName('materialitem-box');
                for(const item of el) {
                    this.state.saved.map(i => {
                        if(i.id === item.id) {
                            item.innerText = i.text;
                        }
                    });
                }
            }
        });
        this.mouseEnter = (e, quiz) => {
            const   el = e.target,
                    quiztake = `quiztake/${quiz.quizid}`,
                    result = `result/${quiz.instanceid}`,
                    instanceresult = quiz.instanceresult;
            let input = '';
            if(instanceresult < 100 && instanceresult !== null) {
                input = `<a href="/${quiztake}">Complete quiz!</a><br /><a href="/${result}">See result!</a>`;
            }   
            if(instanceresult === 100) {
                input = `<a href="/${result}">See result!</a>`;
            }
            if(instanceresult == null) {
                input = `<a href="/${quiztake}">Complete quiz!</a>`;
            }      

            el.innerHTML = `<div class="acn-box-hover">
                            <div id="hover-quizname">${quiz.quizname}</div>
                            <br />
                            <div>${input}</div>
                            </div>`;
        }
        this.mouseExit = (e, quiz) => {
            const el = e.target;
            el.innerHTML = quiz.quizname;
        }
    }
    componentDidMount() {
        this.get();
    }
    checkUser(item) {
        const user = localStorage.getItem('user_id');
        const materialcreator = this.state.content.length && this.state.content[0].userid; 
        if(user == materialcreator) {
            const el = document.getElementsByClassName('materialitem-box');
            for(const item of el) {
                item.contentEditable = true;
            }
        }
    }
    saveCurrent(e) {
        const text = document.getElementById(e.target.id).innerText;
        this.state.saved.push({text, id: e.target.id});
    }
    updateItem() {
        const   HEADERS = {headers: {authorization: {Token}}},
                { current } = this.state;
        axios.put(`http://localhost:4000/study/`, {headers: {authorization: Token}, current }).then( res => {
            document.getElementById(`update-${current.id}`).style.visibility = 'hidden';
        });
    }
    editContent(e) {
        const updatebtn = document.getElementById(`update-${e.target.id}`);
            updatebtn.style.visibility = 'visible';
        const txt = document.getElementById(e.target.id).innerText;
        this.state['current'] =  { txt, id:e.target.id };

        this.state.saved.map(item => {
            if(this.state['current'].txt === item.text) {
                updatebtn.style.visibility = 'hidden';
            }
        })
        
    }
    generateData() {
        const name = this.state.content.length ? this.state.content[0].materialname : '';
        return  (
                    <NewMaterialItem 
                        modal={true} 
                        materialid={this.props.match.params.material} 
                        materialname={name}
                        category={this.state.categoryInfo}
                    />
        );
    }
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    get() {
        const material = this.props.match.params.material,
            HEADERS = {headers: {authorization: Token}};
        
        axios.get(`http://localhost:4000/study/${material}`, HEADERS).then( res => {
            console.log(res);
            this.setState({content: res.data.rows, quizzes: res.data.quiz});
            console.log(res);
            this.checkUser();
        });
    }
    
    render() {
        // while(!this.state.content.length) return <Loading />
        const materialname = this.state.content.length ? this.state.content[0].materialname : 'No material found.'
        const quizzes = e => {
            if(this.state.content[0].quizid)
                return(
                    <div className="materialitem-quizzes">
                        <h1>These quizzes are related</h1>
                        <div className="relatedquizzes">
                            {this.state.quizzes.map( quiz => (
                                <div className="quiz" onMouseEnter={e => this.mouseEnter(e, quiz)} onMouseLeave={e => this.mouseExit(e, quiz)}>
                                        {quiz.quizname}
                                    {/* <p><a href={`/quiztake/${quiz.quizid}`}>{quiz.quizname}</a></p> */}
                                </div>
                                ))  
                            }
                        </div>
                    </div>
                )
        }
        return (
            <div className="materialitem-container">
            <h1>{materialname}</h1>
            <button className="btn btn-default add addnewitem" onClick={this.showModal}>Add new!</button>
                <div className="materialitem-all">
                    {this.state.content.map(item => (
                        <div className="item-container">
                            <div key={item.id} className="materialitem-box" id={item.id} contentEditable="false" onClick={this.saveCurrent} onKeyUp={this.editContent}>
                                {item.content}
                            </div>
                            <div className="update-button" id={`update-${item.id}`}>
                                <button className="btn btn-default"  onClick={this.updateItem}>Update</button>
                            </div>
                        </div>
                    ))}
                </div>
                {this.state.content.length > 0 && quizzes()}
                
                <Modal 
                    data={this.generateData()}
                    onClose= {this.showModal}
                    show= {this.state.show} 
                />
            </div>
        )
  }
}
