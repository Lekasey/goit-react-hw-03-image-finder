import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './App.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Service from './Components/Service';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    modal: false,
    isLoading: false,
    error: null,
    modalImage: null,
  };

  componentDidUpdate(prevState) {
    const { query, page } = this.state;
    if (page === prevState.page) {
      Service(query, page)
        .then(images =>
          this.setState(prevState => ({
            images: [...prevState.images, images],
          })),
        )
        .catch(error => this.setState({ error }));
    }

    // if (prevState.page !== this.state.page) {
    // }
    // if (prevState.page !== this.state.page) {
    //   Service();
    // }
    // const images = localStorage.getItem('images');
    // const parsedImages = JSON.parse(images);
    // if (images) {
    //   this.setState({
    //     images: parsedImages,
    //   });
    // }
  }

  // submitHandler = text => {
  //   this.setState({
  //     query: text,
  //   });
  // };

  // serviceHandler = () => {
  //   const { query, page } = this.state;
  //   if (query) {
  //     Service(query, page)
  //       .then(images =>
  //         this.setState({
  //           images: images,
  //         }),
  //       )
  //       .catch(error => this.setState({ error }));
  //   }
  // };

  // this.setState(prevState => ({
  //   images: [...prevState.images, ...images],
  // })),

  serviceHandler = text => {
    this.setState({
      query: text,
    });
    const { page } = this.state;
    this.setState({
      isLoading: true,
    });
    console.log(text, page);
    if (text) {
      Service(text, page)
        .then(images =>
          this.setState({
            images,
          }),
        )
        .catch(error => this.setState({ error }))
        .finally(
          this.setState({
            isLoading: false,
          }),
        );
    }
  };

  loadMoreButtonClickHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log(this.state.page);
  };

  toggleModal = image => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    if (image) {
      this.setState({
        modalImage: image,
      });
    }
  };

  render() {
    const { images, modal, isLoading, modalImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.serviceHandler} />

        {images.length > 0 ? (
          <>
            <ImageGallery images={images} onModalToggle={this.toggleModal} />
            <Button
              isLoading={isLoading}
              onClick={this.loadMoreButtonClickHandler}
            />
          </>
        ) : (
          <p>Nothing found</p>
        )}
        {modal && (
          <Modal toggleModal={this.toggleModal} modalImage={modalImage} />
        )}
      </div>
    );
  }
}
App.defaultProps = {};

App.propTypes = {};

export default App;
