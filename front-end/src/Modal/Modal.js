import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        window.addEventListener('mouseup', e => {
            if(e.target.classList.value === 'modal-container') {
                this.onClose(e);
            }
        });
        console.log('in');
    }
    onClose(e) {
        this.props.onClose && this.props.onClose(e)
    }
    render() {
        if(!this.props.show) return null;
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <span className="modal-close-x" onClick={e => {this.onClose(e)}}>&times;</span>
                    <div className="modal-content-container">
                        {this.props.data}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;