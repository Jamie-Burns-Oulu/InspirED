import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';
import { NavLink, Route } from "react-router-dom";
import Category from '../Category/Category';
import Loading from '../Styles/Loading';
import NewMaterial from './NewMaterial';
import MaterialByCategory from './MaterialByCategory';
export default class AllMaterial extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.state = {
            materials: [],
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
        axios.get(`http://localhost:4000/materials/`,{headers: {authorization: Token}}).then( res => {
            this.setState({materials :res.data})
            // console.log(res.data);
        });
    }
    render() {
        // if(!this.state.materials.length) return <Loading />
        const material = this.state.materials;
        const self = this;
        return (
        <div className="container">
            <div className="all-material">
            <h1>All Material</h1>
                <Route path="/newmaterial/" exact component={NewMaterial} />
                <NavLink to="/newmaterial" exact>
                    <span className="glyphicon glyphicon-plus" />
                </NavLink>
            </div>
        </div>
        )
    }
}
{/* {Object.keys(material).map(function(key) {
                    return(
                        <div className="collection">
                            <div className="items">
                                <div className="subject-box">
                                    {material[key].subject_name} <br />
                                </div>
                                
                                <div className='category-container' ref="cat" >
                                    {material[key].category_name.map(m => (
                                        <div>
                                            <NavLink to={`/material/${m}`} >
                                            <div className="category-box">
                                                <div>{m}</div>
                                            </div>
                                            </NavLink>
                                            <Route path={`/material/${m}`} component={MaterialByCategory} exact/>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )
                })} */}