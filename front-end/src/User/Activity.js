import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";
import CountScrolling from '../CountScrolling';
import SearchBox from "../Search/SearchBox";

export default class Activity extends Component {
    constructor() {
        super();
        this.initCalcForShadow = this.initCalcForShadow.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            instance: [],
            quizzes: [],
            quizCopy: [],
            instanceCopy: [],
        };
        this.mouseEnter = (e, instance) => {
            const   el = e.target,
                    quiztake = `quiztake/${instance.quizid}`,
                    result = `result/${instance.id}` ,
                    input = instance.result < 100 ? 
                                    `<a href=${quiztake}>Complete quiz!</a><br /><a href=${result}>See result!</a>`: 
                                    `<a href=${result}>See result!</a>`;

            el.innerHTML = `<div class="acn-box-hover">
                            <div>${instance.quizname}</div>
                            <br />
                            <div>${input}</div>
                            </div>`;
        }
        this.mouseExit = (e, instance) => {
            const el = e.target;
            el.innerHTML = instance.quizname;
        }
    }
    componentWillMount() {
        axios
            .get("http://localhost:4000/user_profile/i", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ instance: res.data, instanceCopy: res.data });
                setTimeout(() => {
                    this.initCalcForShadow();
                }, 100)
                
            });
        axios
            .get("http://localhost:4000/user_profile/q", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ quizzes: res.data, quizCopy: res.data });
            });
    }
    initCalcForShadow() {
        const el = document.getElementsByClassName('ownquiz-container');

        for(const item of el) {
            if(item.scrollWidth > item.clientWidth) {
                item.classList.add('right');
            }
        }
    }
    search(data, type) {
        if(type === 'q') {
            const  quizArr = this.state.quizCopy;
            const searchArr = quizArr.filter(quiz => quiz.name.includes(data));
            this.setState({quizzes: searchArr});
        } 
        if(type === 'i') {
            const instArr = this.state.instanceCopy;
            
            const search = instArr.filter(instance => instance.quizname.includes(data));
            console.log(search);
            this.setState({instance: search});
        }
        
    }
    render() {
        const infodata = type => {
            let text;
            if(type === 'o') {
                const {quizCopy, quizzes} = this.state;
                text = quizCopy.length === quizzes.length ? `You have created ${quizzes.length} quiz(zes) this week!`: `${quizzes.length} search results`;
            }
            if(type === 'a') {
                const {instanceCopy, instance} = this.state;
                text =  instanceCopy.length === instance.length ? `You have answered, ${instance.length} this week!` : `${instance.length} search results`;
            }
            
            return (<p><i>{text}</i></p>);
        }
        return (
            <div className="container activity">
                <div className="box">
                        <h1>Quizzes you have created</h1>
                        <div className="infobox">
                            {/* <p><i>You have created, {this.state.quizzes.length} quiz(zes) this week!</i></p> */}
                            {infodata('o')}
                            <SearchBox data={this.state.quizzes} type={'quiz'} search={this.search}/>
                        </div>
                        <div className="ownquiz-container" id="ownquiz" onScroll={e => CountScrolling(e, 'ownquiz') }>
                            {this.state.quizzes.map(quiz => (
                                <div className="ownquiz-item" key={quiz.id}>
                                    {quiz.name}
                                </div>
                            ))}
                        </div>
                </div>
                <br />
                <hr />
                <h1>Your recent activity</h1>
                {this.state.instance ? (
                    <div>
                    <div className="box">
                        <p><i>Attempted quizzes, hover over for actions</i></p>
                        <div className="infobox">
                            {infodata('a')}
                            <SearchBox data={this.state.instance} type={'instance'} search={this.search}/>
                        </div>
                        <div className="att-container">
                            {this.state.instance.map(instance => (
                                <div 
                                    className="activity-item" key={instance.id} 
                                    onMouseEnter={e =>  this.mouseEnter(e, instance) }
                                    onMouseLeave={e => this.mouseExit(e, instance) }
                                >
                                    <div>
                                        {instance.quizname}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}
