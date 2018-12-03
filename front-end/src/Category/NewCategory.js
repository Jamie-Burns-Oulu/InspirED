import React, { Component } from "react";
import axios from "axios";
import Token from '../Auth/token';

class NewCategory extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            subject_id: this.props.subjectid,
            subjectname: this.props.subjectname,
            modal: this.props.modal,
            name: "",
            subject: [],
        };
    }
    componentDidMount() {
        if(!this.state.modal) {
            this.getSubjects();
        }
    }
    getSubjects() {
        axios
            .get("http://localhost:4000/subjects", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ subject: res.data });
            });
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {       
        event.preventDefault();
        const { subject_id, name } = this.state;
        console.log(subject_id, name);
        axios
            .post("http://localhost:4000/category",{  headers: { authorization: Token }, subject_id, name}).then(res => {
                if(this.state.modal) {
                    window.location = '/subjects';
                }  
                else {
                    console.log(res.data);
                }         
            });
    };

    render() {

        if(this.state.modal) {
            return(
                <div>
                    <h2>Create a new category for {this.state.subjectname}</h2>
                    <form onSubmit={this.handleSubmit} className="form">
                        <label>
                            <input
                                type="text"
                                name="name"
                                placeholder="New category name"
                                onChange={this.onChange}
                            />
                        </label>
                        <br />
                        <button className="button" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            )
        }
        return (
            <div className="content">
                <h2>Create a new category</h2>
                <form onSubmit={this.handleSubmit} className="form">
                    <label>
                        <input
                            type="text"
                            name="name"
                            placeholder="New category name"
                            onChange={this.onChange}
                        />
                    </label>
                    <br />
                    <label>
                        <select name="subject_id" onChange={this.onChange}>
                            <option value="0" defaultChecked>
                                Select subject
                            </option>
                            {Object.keys(this.state.subject).map(key => (
                                <option
                                    key={this.state.subject[key].subjectid}
                                    value={this.state.subject[key].subjectid}
                                    name="subject_id"
                                >
                                    {key}
                                </option>
                            ))}
                        </select>
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

export default NewCategory;
