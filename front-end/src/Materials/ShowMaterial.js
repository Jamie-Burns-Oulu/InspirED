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
        this.state = {
            content: [],
            show: false,
            quizzes: [],
        }
        this.showModal = e => {
            this.setState({ show: !this.state.show }); 
        }
    }
    componentDidMount() {
        this.get();
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
            this.setState({content: res.data.rows, quizzes: res.data.quiz});
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
                        {this.state.quizzes.map( quiz => (
                            <p><a href={`/quiztake/${quiz.quizid}`}>{quiz.quizname}</a></p>
                            ))  
                        }
                    </div>
                )
        }
        return (
            <div className="materialitem-container">
            <h1>{materialname}</h1>
            <button className="btn btn-default add" onClick={this.showModal}>Add new!</button>
                <div className="materialitem-all">
                    {this.state.content.map(item => (
                        <div key={item.id} className="materialitem-box">
                            {item.content}
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
