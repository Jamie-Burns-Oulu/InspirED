import React, { Component } from "react";
import axios from "axios";
import Token from '../Auth/token';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            subject_id: "",
            name: "",
            subject: [],
            modal: this.props.modal
        };
    }
   
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {       
        event.preventDefault();
        const { name } = this.state; 
        axios
            .post("http://localhost:4000/subjects",{  headers: { authorization: Token }, name}).then(res => {
                if(this.props.modal) {
                    window.location = '/subjects';
                }
            });
    };

    render() {
        return (
            <div className="content">
                <h2>Create a new subject</h2>
                <form onSubmit={this.handleSubmit} className="form">
                    <label>
                        <input
                            type="text"
                            name="name"
                            placeholder="New subject name"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
               
                    <button className="btn btn-default" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default Settings;
