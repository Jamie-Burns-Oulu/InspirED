import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';

export default class ShowMaterial extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.state = {
            content: []
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const material = this.props.match.params.material,
            HEADERS = {headers: {authorization: Token}};
        
        axios.get(`http://localhost:4000/study/${material}`, HEADERS).then( res => {
            this.setState({content: res.data});
        });
    }
    render() {
        return (
        <div>
            {this.state.content.map(item => (
                <div key={item.id}>
                    {item.content}
                </div>
            ))}
        </div>
        )
  }
}
