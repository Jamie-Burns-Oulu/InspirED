import React, { Component } from 'react'

export default class Loading extends Component {
    constructor() {
        super();
        this.timer = this.timer.bind(this);
    }
    timer() {
    }
  render() {
    return (
      <div className="loading">
      </div>
    )
  }
}
