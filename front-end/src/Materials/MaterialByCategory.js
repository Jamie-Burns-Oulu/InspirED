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
        this.getURL = this.getURL.bind(this);
        this.generateData = this.generateData.bind(this);
        this.state = {
            material: [],
            category: '',
            categoryInfo: {},
            displayCategory: '',
            show: false,
        }
        this.showModal = e => {
            this.setState({ show: !this.state.show }); 
        }
    }
    componentDidMount() {
        this.getURL();
        this.get();
    }
    generateData() {
        return  (<NewMaterial modal={true} category={this.state.categoryInfo}/>);
    }
    getURL() {
        /**
         * Made for getting # value to the database
         * Subsituted with %&%
         */
        const { category } = this.props.match.params,
            windowURL = window.location.href;
        if(windowURL.includes('#')) {
            const name = windowURL.split('http://localhost:3000/material/')[1],
            url =   name.replace(/#/g, ';;');

            this.setState({category: url, displayCategory: name});
            return;
        }
        this.setState({category: category, displayCategory: category});
    }
    get() {
        const promise = new Promise( resolve => {
            resolve(this.state);
        }).then(ans => {
            const { category } = this.state,
                    HEADERS = {headers: {authorization: Token}};  
                
            axios.get(`http://localhost:4000/materials/${category}`, HEADERS ).then(res => {
                this.setState({material: res.data});
            });
            axios.get(`http://localhost:4000/category/category/${category}`, HEADERS).then( res =>{
                this.setState({categoryInfo: res.data.rows});
            });
        });
    }
  render() {
    const self = this,
        addMaterial = function () {
            return(
                <div>
                    <p><button onClick={self.showModal}>add?</button></p>
                    <Modal
                        data={self.generateData()}
                        onClose= {self.showModal}
                        show= {self.state.show} 
                    />
                </div>
            )
    };
    if(!this.state.material.length) {
        return (
            <div>
                <h1>No material found for {this.state.displayCategory}</h1>
                {addMaterial()}
            </div>
            )
    }
    return (
      <div className="material-bycategory">
          {this.state.material.map( mat => (
              <div>
                   <div className="all-material">
                        <div className="items">
                        <NavLink to={`/study/material/${mat.id}`} >
                            <div className="box material-parent">
                                {mat.material_name}
                            </div>
                        </NavLink>
                        <Route path={`/study/material/${mat.id}`} />
                        </div>
                  </div>
              </div>
          ))}
          {addMaterial()}
      </div>
    )
  }
}
