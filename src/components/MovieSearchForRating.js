import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSearchResults, addSearchHistory } from '../utils/movieSlice'; // Adjust import path as necessary
import MovieCard from './MovieCard';

const MovieSearchForRating = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchSelector = useSelector((state) => state.movies.searchResults);
  const searchHistories = useSelector((state) => state.movies.searchHistory);
  const [visibleHistory, setVisibleHistory] = useState(false);

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
      dispatch(addSearchHistory(query));
      setQuery(''); // Clear the input field after search
      setVisibleHistory(false);
    }
  };

  const searchHandle = (history) => {
    setQuery(history);
    searchMovies(history); // Trigger search when history item is clicked
    setVisibleHistory(false);
  };

  const handleFocus = () => {
    setVisibleHistory(true);
  };

 

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        <input
          type="text"
          value={query}
          onFocus={handleFocus}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Search History */}
      {visibleHistory && searchHistories.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-lg">
          <ul className="space-y-2">
            {searchHistories.map((history, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:scale-110 text-blue-700 transition-colors"
                onClick={() => searchHandle(history)}
              >
                {history}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Movie Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {searchSelector.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      
    </div>
  );
};

export default MovieSearchForRating;
