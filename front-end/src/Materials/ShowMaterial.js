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
        return  (<NewMaterialItem modal={true} materialid={this.props.match.params.material} category={this.state.categoryInfo}/>);
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
            console.log(this.state);
        });
    }
    render() {
        while(!this.state.content.length) return <Loading />
        return (
            <div className="materialitem-container">
            <h1>All material items</h1>
            <button className="btn btn-default add" onClick={this.showModal}>Add new!</button>
                <div className="materialitem-all">
                    {this.state.content.map(item => (
                        <div key={item.id} className="materialitem-box">
                            {item.content}
                        </div>
                    ))}
                </div>
                <div className="materialitem-quizzes">
                <h1>These quizzes are related</h1>
                    {this.state.quizzes.map( quiz => (
                        <p><a href={`/quiztake/${quiz.quizid}`}>{quiz.quizname}</a></p>
                        ))  
                    }
                </div>
                <Modal 
                    data={this.generateData()}
                    onClose= {this.showModal}
                    show= {this.state.show} 
                />
            </div>
        )
  }
}
