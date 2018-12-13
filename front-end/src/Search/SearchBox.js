import React, { Component } from 'react'
import './searchbox.scss';
import Token from '../Auth/token';

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            data: this.props.data,
        }
    }
    componentDidMount() {
        window.addEventListener('mouseover', e => {
            if(e.target.className === 'glyphicon glyphicon-search') {
                const target = document.getElementById(e.target.id),
                    el = document.getElementById(target.nextSibling.id);
                el.classList.remove('close');
                el.classList.add('open');
                
            }
        });
        window.addEventListener('mouseup', e => {
            if(!(e.target.classList.value.includes('searchbox-container')) && !(e.target.classList.value.includes('glyphicon glyphicon-search')) && !(e.target.classList.value.includes('searchbox' ) ) ){
                const el = document.getElementsByClassName('searchboxinput');
                for(const item of el) {
                    item.classList.remove('open');
                    item.classList.add('close');
                }
            }
        });
    }
    onChange(e) {
        const val = e.target.value;
        const type = this.props.type === 'instance' ? 'i' : 'q';
        this.props.search(val, type);
    }
  render() {
    return (
      <div className="searchbox-container" >
        <span className="glyphicon glyphicon-search" id={`search-icon-${Math.floor(Math.random() * 1000)}`} ref="icon"></span>
        <input type="text" className="searchbox searchboxinput close" id={`search-box-${Math.floor(Math.random() * 1000)}`} ref="searchbox" onChange={this.onChange} />
      </div>
    )
  }
}
