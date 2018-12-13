import React, { Component } from 'react'
import Loading from '../Styles/Loading';
import { NavLink, Route } from "react-router-dom";
import axios from 'axios';
import Token from '../Auth/token';
import Modal from '../Modal/Modal';
import NewMaterial from './NewMaterial';


export default class MaterialByCategory extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.generateData = this.generateData.bind(this);
        this.state = {
            material: [],
            categoryid: this.props.match.params.category,
            categoryInfo: {},
            show: false,
            data: false
        }
        this.showModal = e => {
            this.setState({ show: !this.state.show }); 
        }
    }
    componentDidMount() {
        this.get();
    }
    generateData() {
        return  (<NewMaterial modal={true} category={this.state.categoryInfo}/>);
    }
    get() {
        const promise = new Promise( resolve => {
            resolve(this.state);
        }).then(ans => {
            const { categoryid } = this.state,
                    HEADERS = {headers: {authorization: Token}};  
                
            axios.get(`http://localhost:4000/materials/${categoryid}`, HEADERS ).then(res => {
                this.setState({material: res.data, data: true});
                
                if(res.data.length) {
                    this.state.material.push({id: -1, name: 'Add new!'});
                }
            });
            axios.get(`http://localhost:4000/category/category/${categoryid}`, HEADERS).then( res =>{
                if(res.data.rows) {
                    this.setState({categoryInfo: res.data.rows});
                    console.log(res.data.rows);
                }
                else {
                    window.location = '/subjects';
                }
            });
        });
    }
  render() {
    const self = this,
        fillContent = material => {
            if(material.id === -2 || material.id === -1) {
                return(
                    <div className="box material-parent" id='addnew' onClick={this.showModal}>
                        {material.name}
                    </div>
                )
            }
            return(
                <div>
                    <NavLink to={`/study/material/${material.id}`}>
                        <div className="box material-parent">
                            {material.name}
                        </div>
                    </NavLink>
                    <Route path={`/study/material/${material.id}`} />
                </div>
            )
        };
    if(!this.state.material.length) {
        return (
            <div className="container">
                <h1>No material found for {this.state.categoryInfo.name}</h1>
                <div className="material-bycategory">
                    <div className="all-material">
                            <div className="items">
                                {fillContent({id:-2, name:'Add new!'})}
                            </div>
                    </div>
                </div>
                <Modal
                    data={self.generateData()}
                    onClose= {self.showModal}
                    show= {self.state.show} 
                />
            </div>
        )
    }
    while(!this.state.data) return <Loading />
    return (
        <div className="container">
            <h1>All material for {this.state.categoryInfo.name}</h1>
            <div className="material-bycategory">
                {this.state.material.map( mat => (
                    <div>
                        <div className="all-material">
                                <div className="items">
                                    {fillContent(mat)}
                                </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                data={self.generateData()}
                onClose= {self.showModal}
                show= {self.state.show} 
            />
        </div>
        )
    }
}
