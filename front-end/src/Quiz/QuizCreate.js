import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";
import Modal from "../Modal/Modal";

export default class Quiz_create extends Component {
    constructor(props) {
        if (!Token) {
            window.location = "/login";
        }
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMaterial = this.getMaterial.bind(this);
        this.state = {
            category: [],
            material: [],
            name: "",
            category_id: "",
            difficulty: "",
            modalCatId: this.props.modalCategoryId,
        };
    }

    componentDidMount() {
        this.getSubjects();
        if(this.state.modalCatId !== undefined) {
            this.state.category_id = this.state.modalCatId;
            this.getMaterial();
        }
    }

    getSubjects() {
        axios
            .get("http://localhost:4000/category", {
                headers: { authorization: Token }
            })
            .then(res => {
                this.setState({ category: res.data });
                
            });
    }

    onChange = e => {
        const state = this.state;
                     
        state[e.target.name] = e.target.value;
        this.setState(state);
        if(e.target.name === 'category_id') {
            this.getMaterial();
        }
        
    };
    getMaterial() {
        const HEADERS = {headers: {authorization: Token}};
        axios.get(`http://localhost:4000/materials/${this.state.category_id}`, HEADERS).then( res => {
            this.setState({material: res.data});
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const user_id = localStorage.getItem("user_id");
        const { name, difficulty, material_id } = this.state,
            category_id = this.state.modalCatId === undefined ? this.state.category_id : this.state.modalCatId;
        axios
            .get(
                "http://localhost:4000/quiz_create/checkQuizName/" +
                    category_id,
                {
                    headers: { authorization: Token }
                }
            )
            .then(res => {
                var nameCheck = 0;
                for (let i = 0; i < res.data.length; i++) {
                    if (name === res.data[i].name) {
                        nameCheck = 1;
                    }
                }
                if (nameCheck) {
                    document.getElementById('quiznametaken').innerHTML = 'This quiz name is in use.'
                    nameCheck = 0;
                } else {
                    axios
                        .post("http://localhost:4000/quiz_create", {
                            headers: { authorization: Token },
                            category_id,
                            name,
                            user_id,
                            material_id,
                            difficulty
                        })
                        .then(res => {
                            axios
                                .get("http://localhost:4000/quiz_create", {
                                    headers: { authorization: Token }
                                })
                                .then(res => {
                                    this.setState({newQuizid: res.data[0].id});
                                    window.location = `/questioncreate/${res.data[0].id}`;
                                });
                        });
                }
            });
    };

    render() {
        const checkModal = () => {
            const modal = this.state.modalCatId === undefined ? false : true;
            if(!modal) {
                return (
                    <div>
                            <select
                                name="category_id"
                                onChange={this.onChange}
                            >
                                <option value="-" defaultChecked>
                                    Select category
                                </option>
                                {this.state.category.map(category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                        name="category"
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        <br />
                    </div>
                )
            }
            return(<div></div>);
        }
        return (
            <div className="container">
                <h1>Create quiz</h1>
                <div className="list-container">
                    <div className="list">
                        <div className="box">
                            <form onSubmit={this.handleSubmit} className="createform">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter quiz name"
                                        onChange={this.onChange}
                                        required
                                    />
                                {checkModal()}
                                    <select
                                        name="material_id"
                                        onChange={this.onChange}
                                    >
                                    <option value="-" defaultChecked>
                                            Select material
                                        </option>
                                        {this.state.material.map(material => (
                                            <option
                                                key={material.id}
                                                value={material.id}
                                                name="material"
                                            >
                                                {material.name}
                                            </option>
                                        ))}
                                    </select>
                                <br />
                                    <select
                                        name="difficulty"
                                        onChange={this.onChange}
                                    >
                                        <option selected value="0">
                                            Select difficulty
                                        </option>
                                        <option value="1">Easy</option>
                                        <option value="2">Normal</option>
                                        <option value="3">Difficult</option>
                                    </select>
                                <br />
                                <button className="button" type="submit" onClick={this.handleSubmit}>
                                    Create quiz and add questions
                                </button>
                            </form>
                        </div>
                        {/* {this.state.category_id &&
                        this.state.difficulty &&
                        this.state.name ? (  */}
                            {/* <div className="button" onClick={this.handleSubmit}>
                                Create quiz and add questions

                            </div> */}
                        {/* ) : (
                            <div>
                                <i>please complete all fields</i>
                            </div>
                        )} */}
                        <p className="error" id="quiznametaken"></p>

                </div>
                
                </div>
            </div>
        );
    }
}
