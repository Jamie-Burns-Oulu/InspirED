import React, { Component } from "react";
import axios from "axios";
import Token from '../Auth/token';

class Settings extends Component {
    constructor() {
        if(!Token){
            window.location = "/Login"
        }
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            subject_id: "",
            name: "",
            subject: []
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
                console.log(res);                
            });
    };

    render() {
        return (
            <div className="content">
                <h2>Create a new subject</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            type="text"
                            name="name"
                            placeholder="New subject name"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
               
                    <button className="button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default Settings;
