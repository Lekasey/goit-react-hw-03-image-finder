import React, { Component } from 'react';
import './App.css';
import ImageGallery from './Components/ImageGallery';
import Searchbar from './Components/Searchbar';
import Button from './Components/Button';
import pixabayApi from './Components/Service';
import Loader from './Components/Loader';
import Modal from './Components/Modal';

const bodyRef = document.querySelector('body');
class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    error: null,
    isLoading: false,
    modal: false,
    modalIndex: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (prevState.images.length > 12) {
      this.onFetchImages();
    }
  }

  toggleModal = id => {
    const { images } = this.state;
    const search = images.find(image => image.id === id);
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalIndex: images.indexOf(search),
    }));
  };

  onFetchImages = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onChangeQuery = query => {
    this.setState({ searchQuery: query, images: [], currentPage: 1 });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };
    this.setState({ isLoading: true });

    pixabayApi
      .fetchImages(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  modalImageBackHandler = () => {
    if (this.state.modalIndex === 0) {
      this.toggleModal();
    }
    this.setState(prevState => ({
      modalIndex: prevState.modalIndex - 1,
    }));
  };

  modalImageForwardHandler = () => {
    const { images, modalIndex } = this.state;
    if (modalIndex >= images.length - 2) {
      this.fetchImages();
    }
    this.setState(prevState => ({
      modalIndex: prevState.modalIndex + 1,
    }));
  };

  render() {
    const { modal, modalIndex, images, isLoading } = this.state;

    return (
      <div>
        {modal
          ? bodyRef.classList.add('modal-open')
          : bodyRef.classList.remove('modal-open')}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onModalToggle={this.toggleModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button fetchImages={this.fetchImages} />
        )}
        {modal && (
          <Modal
            toggleModal={this.toggleModal}
            modalImage={images[modalIndex]}
            back={this.modalImageBackHandler}
            forward={this.modalImageForwardHandler}
          />
        )}
      </div>
    );
  }
}

export default App;
