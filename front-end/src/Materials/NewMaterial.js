import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../Styles/Loading';
import Token from '../Auth/token';

export default class NewMaterial extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            modal: this.props.modal,
            propsCat :this.props.category,
            category : []
        }
    }
    componentDidMount() {
        this.get();
    }
    get() {
        axios.get('http://localhost:4000/category', {headers: {authorization: Token}}).then( res => {
            this.setState({category: res.data});
        });
    }
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleSubmit = e => {
        e.preventDefault();
        
        const {name} = this.state;
        const category_id = this.state.modal ? this.state.propsCat.id : this.state.category;
        axios
            .post("http://localhost:4000/materials",{  headers: { authorization: Token }, category_id, name}).then(res => {
                if(this.state.modal) {
                    window.location = `/material/${this.state.propsCat.name}`;
                }
                
        });
    }
  render() {
    if(this.state.modal) {
        return (
        <div className="container">
        <h1>Create new material for {this.state.propsCat.name}</h1>
          <form onSubmit={this.handleSubmit} className="form" onChange={this.onChange}>
            <input name="name" type="text" placeholder="Material name" onChange={this.onChange}/>
            <br />
            <input type="submit" className="btn btn-default" value="Save" />
        </form>
      </div>
        )
    }
    return (
      <div className="container">
          <form onSubmit={this.handleSubmit} className="form" onChange={this.onChange}>
            <input name="name" type="text" placeholder="Material name" onChange={this.onChange}/>
            <br />
            <select name="category_id" onChange={this.onChange}>
                <option value="0">Select category</option>
                {this.state.category.map( cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <br />
            <input type="submit" className="btn btn-default" value="Save" />
        </form>
      </div>
    )
  }
}
