import React, { Component } from "react";
import axios from "axios";

class NewCategory extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            subject_id: "",
            name: "",
            subject:[]
        };
    }
    componentDidMount() {
       this.getSubjects();
    }

    getSubjects(){
      axios.get("http://localhost:4000/subjects").then(res => {
         this.setState({ subject: res.data });     
     });
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        console.log(e.target.value);
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        const { subject_id, name } = this.state;
        axios
            .post("http://localhost:4000/category", { subject_id, name })
            .then(res => {
                console.log(res);
            });
    };

    render() {
        return (
            <div className="content">
                <h2>Create a new category</h2>
                <form onSubmit={this.handleSubmit}>
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
                        <option value="0" defaultChecked>Select subject</option>
                        {this.state.subject.map(subject => (
                            <option key={subject.id} value={subject.id} name="subject_id">
                                {subject.name}
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
