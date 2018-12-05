import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewSubject from "./NewSubject";
import Token from '../Auth/token';
import MaterialByCategory from "../Materials/MaterialByCategory";
import NewCategory from "../Category/NewCategory";
import Modal from "../Modal/Modal";
import Loading from "../Styles/Loading";


export default class Subjects extends Component {
    constructor() {
        if (!Token) {
            window.location = "/login";
        }
        super();
        this.get = this.get.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
        this.initCalcForShadow = this.initCalcForShadow.bind(this);
        this.generateForm =this.generateForm.bind(this);
        this.scrollhandler = this.scrollhandler.bind(this);
        this.state = {
            subjects: [],
            show: false,
            modalData: {
                type: '',
                subjectid: '',
                subjectname: '',
            },
            onload: false,
        };
        this.openModal = (type, subject = {subjectid: '', subjectname: ''} ) => {
            this.setState( {
                modalData : { 
                    type: type, 
                    subjectid: subject.subjectid,
                    subjectname: subject.subjectname  
                }
            });
            this.showModal();
        };
        this.showModal = e => {
            this.setState({ show: !this.state.show }); 
        }
        window.addEventListener('click', e => {
            if(e.target.id === 'addnewsubject') {
                this.openModal('subject');
            }
        });
    }
    mouseEnter(e, category) {
        const el = e.target;
        const material = `material/${category.id}`;
        const quiz = `quiz/${category.id}`;
        el.innerHTML = `<div class="categoryhover">
                            <div><h6 class="headerhover">${category.name}</h6></div>
                            <div><a href=${material}>Study</a></div>
                            <div><a href=${quiz}>Quiz</a></div>
                        </div>`;

    }
    mouseExit(e, category) {
        const el = e.target;
        el.innerHTML = category.name;
    }
    generateForm() {
        const { type, subjectid, subjectname } = this.state.modalData;
        if(type === 'category') {
            return <NewCategory subjectid={subjectid} subjectname={subjectname} modal={true} />
        }
        if(type === 'subject') {
            return <NewSubject modal={true}/>
        }
    }
    initCalcForShadow() {
        const el = document.getElementsByClassName('category-container');
        for(const item of el) {
            if(item.scrollWidth > item.clientWidth) {
                item.classList.add('right');
            }
        }
    }
    componentDidMount() {      
        this.get(); 
    }
    componentDidUpdate() {
        this.initCalcForShadow();
    }
    get() {
        axios
            .get("http://localhost:4000/subjects", {
                headers: { authorization: Token }
            })
            .then(res => {
                res.data['Create new!'] = {
                    isempty: false,
                    subjectid: -1,
                    category: [],
                    subjectname: 'Create new!'
                }
                this.setState({ subjects: res.data });
            });
    }
    scrollhandler(e, key) {
        const element = e.target,
                node = document.getElementById(key),
                hiddenwidth = element.scrollWidth,
                visiblewidth = element.clientWidth,
                howmuchisscrolled = element.scrollLeft;
                console.log(node);
        setTimeout(() => {
            if (hiddenwidth - howmuchisscrolled === visiblewidth) {
                node.classList.add('left');
                node.classList.remove('right');
                node.classList.remove('both');
            }
            if(howmuchisscrolled === 0) {
                node.classList.add('right');
                node.classList.remove('left');
                node.classList.remove('both');
            }
            if(howmuchisscrolled > 0 && (hiddenwidth - howmuchisscrolled !== visiblewidth))  {
                node.classList.add('both');
                node.classList.remove('left');
                node.classList.remove('right');
            } 
        }, 600);
    }
    render() {
        const subject = this.state.subjects;
        const self = this;
        const insertCategories = (subject, category) => {
            if(subject.isempty) {
                return(<div className="category-box addcategory-box" onClick={ () => { this.openModal('category', subject)}}>
                            <div ref="nocat" className="no-cat inner" id={subject.subjectname}>{category.name}</div> 
                        </div>)
            }
            else {
                if(category.name === 'Add new!') {
                    return (
                            <div className="category-box addcategory-box" onClick={ () => { this.openModal('category', subject)}}>
                                <div>{category.name}</div>
                            </div>
                    )
                }
                return(
                        <div>
                                <div className="category-box hoverable" onMouseLeave={e => {this.mouseExit(e, category)}} onMouseEnter={ e => {this.mouseEnter(e, category)}} id={`${category.id}`}>
                                    <div>{category.name}</div>
                                </div>
                        </div>
                )
            }
        }
        return (
            <div className="subject-container subject-route">
                <div className="all-material">
                    <div className="list">
                        {Object.keys(subject).map(function(key) {
                            return(
                                <div key={key} className="collection">
                                    <div className="items">
                                        <div className="subject-box" id={subject[key].subjectid === -1 ? 'addnewsubject' : ''}>                                            
                                            <div>
                                                {subject[key].subjectname}
                                            </div>
                                        </div>
                                        <div className='category-container' id={key} key={key} onScroll={(e) => {self.scrollhandler(e, key)}}>
                                            {subject[key].category.map(category => (
                                                <div>
                                                    {insertCategories(subject[key], category)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Modal
                    data={this.generateForm()}
                    onClose= {this.showModal}
                    show= {this.state.show}
                />
            </div>
        );

    }
}

