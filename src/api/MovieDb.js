import axios from 'axios';
import {baseUrl, posterImageUrl, apiKey} from '../constants';

// endpoints
const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoint = id => `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id =>
  `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id =>
  `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;

const personDetailsEndpoint = id => `${baseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// image / poster path full url
const image500 = path => (path ? `${posterImageUrl}w500${path}` : null);
const image342 = path => (path ? `${posterImageUrl}w342${path}` : null);
const image185 = path => (path ? `${posterImageUrl}w185${path}` : null);

// fallback images
const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      //alert('no internet connection');
      return {error: true, code: 'ERR_NETWORK'};
    }
    console.log('error:', error);
    return {};
  }
};

const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
const fetchUpcomingMovies = params => {
  return apiCall(upcomingMoviesEndpoint, params);
};
const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};
const fetchMovieDetails = id => {
  return apiCall(movieDetailsEndpoint(id));
};
const fetchMovieCredits = id => {
  return apiCall(movieCreditsEndpoint(id));
};
const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndpoint(id));
};
const fetchPersonDetails = id => {
  return apiCall(personDetailsEndpoint(id));
};
const fetchPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id));
};
const fetchSearchMovies = params => {
  return apiCall(searchMoviesEndpoint, params);
};

export {
  image185,
  image342,
  image500,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchPersonDetails,
  fetchPersonMovies,
  fetchSearchMovies,
  fallbackMoviePoster,
  fallbackPersonImage,
};
