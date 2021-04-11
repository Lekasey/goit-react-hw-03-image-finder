import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    } else this.props.toggleModal();
  };

  render() {
    const { back, forward } = this.props;
    const { largeImageURL, tags } = this.props.modalImage;
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <button
            type="button"
            className="ModalButtonBack"
            onClick={() => back()}
          >
            {'<'}
          </button>
          <img src={largeImageURL} alt={tags} />
          <button
            type="button"
            className="ModalButtonForward"
            onClick={() => forward()}
          >
            {'>'}
          </button>
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
