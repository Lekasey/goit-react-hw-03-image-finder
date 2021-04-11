import React from 'react';

const ImageGalleryItem = ({ url, alt, onModalToggle }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={url}
        width="640"
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={onModalToggle}
      />
    </li>
  );
};

export default ImageGalleryItem;
