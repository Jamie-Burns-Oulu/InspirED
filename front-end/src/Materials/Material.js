import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';
import Category from '../Quiz_Landing/Quiz_landing';
import Loading from '../Styles/Loading';
export default class Material extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.state = {
            materials: []
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const categoryId = this.props.category;
        
        axios.get(`http://localhost:4000/materials/1`,{headers: {authorization: Token}}).then( res => {
            this.setState({materials: res.data});
        });
        
    }
    render() {
        if(!this.state.materials.length) return <Loading />
        return (
        <div className="container">
        <h1>{this.state.materials[0].name}</h1>
           {this.state.materials.map(material => (
               <div key={material.id} >
                   Material {material.name}
               </div>
           ))}
        </div>
        )
    }
}
