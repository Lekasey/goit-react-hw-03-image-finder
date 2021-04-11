import React from 'react';
// import Spinner from '../Loader';

const Button = ({ fetchImages }) => {
  return (
    <button type="button" className="Button" onClick={fetchImages}>
      {/* {isLoading && <Spinner />} */}
      Load more
    </button>
  );
};

export default Button;
