const PIXABAY_API_KEY = '50718626-0f15284cd54e6013b04c57504';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = searchedQuery => {
  const urlParams = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  });
  return fetch(`${BASE_URL}?${urlParams.toString()}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};