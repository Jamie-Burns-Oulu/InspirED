import React, { Component } from "react";
import axios from "axios";
import { NavLink, Route } from "react-router-dom";
import NewSubject from "./NewSubject";
import Token from '../Auth/token';
import Loading from "../Styles/Loading";
import MaterialByCategory from "../Materials/MaterialByCategory";
import NewCategory from "../Category/NewCategory";
import Modal from "../Modal/Modal";


export default class Subjects extends Component {
    constructor() {
        if(!Token) {
            window.location = '/login';
        }
        super();
        this.get = this.get.bind(this);
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
    generateForm() {
        const { type, subjectid, subjectname } = this.state.modalData;
        if(type === 'category') {
            return <NewCategory subjectid={subjectid} subjectname={subjectname} modal={true} />
        }
        if(type === 'subject') {
            return <NewSubject modal={true}/>
        }
    }
    componentDidMount() {      
        this.get(); 
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
                    categoryname: [],
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
                            <div ref="nocat" className="no-cat inner" id={subject.subjectname}>{category}</div> 
                        </div>)
            }
            else {
                if(category === 'Add new!') {
                    return (
                            <div className="category-box addcategory-box" onClick={ () => { this.openModal('category', subject)}}>
                                <div>{category}</div>
                            </div>
                    )
                }
                return(
                        <div>
                            <NavLink to={`/material/${category}`} >
                                <div className="category-box">
                                    <div>{category}</div>
                                </div>
                            </NavLink>
                            <Route path={`/material/${category}`} component={MaterialByCategory} exact/>
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
                                        <div className="subject-box"id={subject[key].subjectid === -1 ? 'addnewsubject' : ''}>                                            
                                            <div>
                                                {subject[key].subjectname}
                                            </div>
                                        </div>
                                        <div className='category-container' ref={key} id={key} onScroll={(e) => {self.scrollhandler(e, key)}}>
                                            {subject[key].categoryname.map(category => (
                                                <div key={category}>
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

