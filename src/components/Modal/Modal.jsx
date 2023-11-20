import { Component } from 'react';
import { Overlay, ModalWrapper } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  backdropCloseHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  closeEscapeHandler = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeEscapeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeEscapeHandler);
  }

  render() {
    const { item } = this.props;
    return createPortal(
      <Overlay onClick={this.backdropCloseHandler}>
        <ModalWrapper>
          <img src={item.largeImageURL} alt={item.tags} />
        </ModalWrapper>
      </Overlay>,
      modalRoot
    );
  }
}
