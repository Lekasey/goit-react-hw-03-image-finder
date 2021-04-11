import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
class ImageGallery extends Component {
  render() {
    const { images, onModalToggle } = this.props;
    return (
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL, tag }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            alt={tag}
            onModalToggle={() => onModalToggle(id)}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
