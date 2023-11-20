import axios from 'axios';

export async function serviceSearch(searchrequest, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: '39917571-28ef3a52fe9a456424b2da7ea',
    q: searchrequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data;
}
