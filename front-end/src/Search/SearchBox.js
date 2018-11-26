import React, { Component } from 'react'
import './searchbox.scss';
import Token from '../Auth/token';

export default class SearchBox extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        const searchIcon = this.refs.icon,
            searchBox = this.refs.searchbox;
        window.addEventListener('mouseover', e => {
            if(e.target.className === 'glyphicon glyphicon-search') {
                searchBox.classList.add('open');
            }
        });
    }
  render() {
    return (
      <div className="searchbox-container" >
        <span className="glyphicon glyphicon-search" id="search-icon" ref="icon"></span>
        <input type="text" className="searchbox" ref="searchbox" />
      </div>
    )
  }
}
