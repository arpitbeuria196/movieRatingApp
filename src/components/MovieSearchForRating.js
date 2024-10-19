import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSearchResults } from '../utils/movieSlice'; // Adjust import path as necessary
import MovieCard from './MovieCard';

const MovieSearchForRating = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchSelector = useSelector((state)=> state.movies.searchResults);

  const API_KEY = '4856a2a4';

  const searchMovies = async (query) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const movieData = response.data.Search || [];
      dispatch(setSearchResults(movieData)); // Dispatch only the movie data
    } catch (error) {
      console.error("Error fetching movies: ", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      searchMovies(query);
      setQuery(''); // Clear the input field after search
    }
  };

  return (
    <div >
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchSelector.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSearchForRating;
