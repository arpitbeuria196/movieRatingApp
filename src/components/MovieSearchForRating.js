import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSearchResults, addSearchHistory, removeSearchHistory } from '../utils/movieSlice'; // Adjust import path as necessary
import MovieCard from './MovieCard';
import Pagination from './Pagination';  // Import the new Pagination component
import { IoMdCloseCircle } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaSortAlphaDown,FaSortAlphaDownAlt } from "react-icons/fa";

const MovieSearchForRating = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchSelector = useSelector((state) => state.movies.searchResults);
  const searchHistories = useSelector((state) => state.movies.searchHistory);
  const [visibleHistory, setVisibleHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favCount,setFavCount]=useState(0);
  const[watchCount,setWatchCount] = useState(0);
  const[isSortedAsc,setIsSortedAsc]  = useState(true);
  const[displayedItems,setDisplayedItems] = useState('movie');
  const navigate = useNavigate();

 


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

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(searchSelector.length / ITEMS_PER_PAGE);
  const firstIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const lastIndex = firstIndex + ITEMS_PER_PAGE;
  

  const sortedHistories = [...searchSelector].sort((a,b)=>
  {
    const nameA = a.Title.toLowerCase();
    const nameB = b.Title.toLowerCase();

    if(isSortedAsc)
      return nameA<nameB ? -1:1;
    return nameA>nameB ? -1 : 1;

  })

 
  const slicedSearch = sortedHistories.slice(firstIndex, lastIndex);

  const movies  = slicedSearch.filter(history=> history.Type == 'movie');
  const series  = slicedSearch.filter(history=> history.Type == 'series');

  console.log(displayedItems);
  const itemsToDisplay = () => {
    if (displayedItems === 'movie') return movies;
    if (displayedItems === 'series') return series;
    return slicedSearch;
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

  const handleClose = (history) => {
    dispatch(removeSearchHistory(history));
  };

  // Function to handle page change from Pagination component
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const updateFavoriteCount = (newCount) => {
    setFavCount(newCount); 
  };

  const updateWatchCount =  (isAdded) =>
  {
    setWatchCount(count => isAdded ? count+1 : count-1);
  }
  const moreDetailsNavigationHandle = (movieId)=>
  {
    navigate(`/details/${movieId}`);
  }
  const toggleSortOrder = ()=>
  {
    setIsSortedAsc(!isSortedAsc);
  }

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
  {/* Favorite Count Section */}
  <div className="flex items-center ml-4">
    <MdFavorite className="text-red-500 text-xl" />
    <h3 className="ml-2 font-semibold">{watchCount}</h3>
    <FaCartPlus className="ml-2 text-green-500 text-xl" />
    <h3 className="ml-2 font-semibold">{favCount}</h3> {/* Display favorite count */}
  </div>
</form>

      {/* Search History */}
      {visibleHistory && searchHistories.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-lg">
          <ul className="space-y-2">
            {searchHistories.map((history, index) => (
              <li
                key={index}
                className="flex justify-between items-center cursor-pointer text-blue-500 hover: text-blue-700 transition-colors"
              >
                {/* Search history item */}
                <span onClick={() => searchHandle(history)}>
                  {history}
                </span>
                {/* Close button to remove item */}
                <div onClick={() => handleClose(history)} className="text-red-500 cursor-pointer hover:text-red-700">
                  <IoMdCloseCircle size={24} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <button
          onClick={toggleSortOrder}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
        >
          {isSortedAsc ? (<FaSortAlphaDown />) : (<FaSortAlphaDownAlt />)}
        </button>
      </div>
      {/* Option Selection for Movies and Series */}
      <div className="mb-4">
        <select
          value={displayedItems}
          onChange={(e) => setDisplayedItems(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
      </div>

      {/* Movie Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {itemsToDisplay().map((movie) => (
          <MovieCard 
          key={movie.imdbID}
           movie={movie}
           updateFavoriteCount={updateFavoriteCount} 
           updateWatchCount = {updateWatchCount}
           moreDetailsNavigationHandle={moreDetailsNavigationHandle}

           />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieSearchForRating;
