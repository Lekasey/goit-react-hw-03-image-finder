// import React from 'react';
import axios from 'axios';

async function fetchImages({ searchQuery = '', currentPage = 1 }) {
  const apiKey = '20410166-62a7784bd988192fa85965390';
  const url = `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
  return await axios.get(url).then(({ data }) => data.hits);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchImages };
