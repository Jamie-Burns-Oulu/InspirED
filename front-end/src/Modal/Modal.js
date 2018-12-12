import React, { Component } from 'react';
import QuestionCreate from '../Question/QuestionCreate';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.generateData = this.generateData.bind(this);
        this.state = {
            quizDone: false,
            typeQuiz: this.props.typeQuiz === undefined ? false : true,
        }
        window.addEventListener('mouseup', e => {
            if(e.target.classList.value === 'modal-container') {
                this.onClose(e);
            }
        });
    }
    componentWillReceiveProps(newProps) {
        if(this.state.typeQuiz) {
            setTimeout(()=> {
                if(newProps.quizId.length) {
                    this.setState({quizId: newProps.quizId[0], quizDone: true});
                    this.generateData();
                    this.setState(this.state);
                }   
            }, 100);
        }
    }
    onClose(e) {
        this.props.onClose && this.props.onClose(e)
    }
    generateData() {
        const data = this.state.quizDone ?  <QuestionCreate quizId={this.state.quizId}/>  : this.props.data;
        return data;
    }
    render() {
        if(!this.props.show) return null;
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <span className="modal-close-x" onClick={e => {this.onClose(e)}}>&times;</span>
                    <div className="modal-content-container">
                        {this.generateData()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;