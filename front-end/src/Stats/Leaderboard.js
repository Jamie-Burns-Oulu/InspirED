import React, { Component } from "react";
import axios from "axios";
import Token from "../Auth/token";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class Leaderboard extends Component {
    constructor() {
        if (!Token) {
            window.location = "/Login";
        }
        super();
        this.state = {
            tableData: []
        };
    }

    componentDidMount() {
        const HEADERS = { headers: { authorization: Token } };
        axios.post("http://localhost:4000/stats/set", HEADERS).then(res => {
            axios.get("http://localhost:4000/stats/get", HEADERS).then(res => {
                this.setState({ tableData: res.data });
            });
        });
    }

    render() {
        const { tableData } = this.state;

        return (
            <div className="content">
                <h2>Leaderboard</h2>
                <ReactTable
                    data={tableData}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "Rank",
                                    id: "row",
                                    Cell: row => {
                                        return <div>{row.index + 1}</div>;
                                    }
                                },
                                {
                                    Header: "Points",
                                    accessor: "points",
                                    style: "text-align : center"
                                },
                                {
                                    Header: "Subject",
                                    accessor: "subject"
                                },
                                {
                                    Header: "User",
                                    accessor: "username"
                                }
                            ]
                        }
                    ]}
                    className="-striped -highlight"
                    defaultPageSize={10}
                    showPagination={false}
                />
            </div>
        );
    }
}
