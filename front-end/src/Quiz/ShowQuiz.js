import React, { Component } from 'react';
import axios from 'axios';
import Token from '../Auth/token';
import { timingSafeEqual } from 'crypto';

class ShowQuiz extends Component {
    constructor(props){
        super(props);
        this.get = this.get.bind(this);
        this.state = {
            quiz: [],
            category: '',
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const   params = this.props.match.params.id,
                HEADERS = {headers: {authorization: Token}},
                PATH = params !== undefined ? 
                        `http://localhost:4000/showquiz/${params}` :
                        `http://localhost:4000/showquiz/`;

        axios.get(PATH, HEADERS).then( res => {
            res.data.push({id: -1, quizname: 'Add new'});
            console.log(res);
            this.setState({quiz: res.data});
        });
    }
    render() {
        return (
            <div className="container">
                <div className="material-bycategory">
                    {this.state.quiz.map( q => (
                        <div>
                             <div className="all-material">
                                <div className="items">
                                    <div className={`box material-parent ${q.instanceresult === 100 ? 'quizdone' : '' }`} id={q.id === -1 ? 'addnew' : ''}> 
                                        {q.quizname}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ShowQuiz;