import React, { Component } from 'react'
import axios from 'axios';
//import Loading from '../Styles/Loading';
import Token from '../Auth/token';

export default class NewMaterialItem extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            materialid: this.props.materialid,
        };
    }
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    handleSubmit = e => {
        e.preventDefault();
        const { content, materialid } = this.state;
        axios
            .post("http://localhost:4000/study/", {  headers: { authorization: Token }, materialid, content}).then(res => {
                window.location = `/study/material/${materialid}`;
            });
    }
    render() {
        return (
            <div className="container">
                <h1>Create new material item</h1>
                <form onSubmit={this.handleSubmit} className="form" onChange={this.onChange}>
                    <textarea name="content" className="textarea" type="text" placeholder="content" maxLength="255" onChange={this.onChange}/>
                    <br />
                    <input type="submit" className="btn btn-default" value="Save" />
                </form>
            </div>
        )
    }
}