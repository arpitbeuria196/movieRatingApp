import React, { useState } from 'react';
import { FaPlus, FaMinus, FaEye } from 'react-icons/fa'; // Importing icons from react-icons

const MovieCard = ({ movie, updateFavoriteCount,updateWatchCount }) => {
  const [addToFavList, setAddToFavList] = useState(0);
  const [inWatchlist, setInWatchlist] = useState(false); // State to track if the movie is in the watchlist

  const onHandleFavList = () => {
    const newCount = addToFavList + 1;
    setAddToFavList(newCount);
    updateFavoriteCount(newCount); // Update the parent's favorite count
  };

  const onRemoveFavList = () => {
    if (addToFavList > 0) {
      const newCount = addToFavList - 1;
      setAddToFavList(newCount);
      updateFavoriteCount(newCount); // Decrease parent's favorite count
    }
  };

  const toggleWatchlist = () => {
    const newStatus = !inWatchlist;
    setInWatchlist(newStatus); // Toggle watchlist status
    updateWatchCount(newStatus);

  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-1">
      <img
        className="w-full h-64 object-cover"
        src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400'}
        alt={movie.Title}
      />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{movie.Title}</h3>
        <p className="text-gray-700 text-base">
          <strong>Year:</strong> {movie.Year}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Type:</strong> {movie.Type}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        {/* Watchlist Button */}
        <button
          onClick={toggleWatchlist}
          className={`flex items-center py-2 px-4 rounded transition-colors 
            ${inWatchlist ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} 
            text-white font-bold`}
        >
          <FaEye className="mr-2" />
          {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </button>
        
        {/* Favorites Button */}
        <button
          className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          <div onClick={onRemoveFavList}>
            <FaMinus className="mr-1" />
          </div>
          Add to Favorites
          <div onClick={onHandleFavList} className="ml-2">
            <FaPlus className="ml-1" /> {addToFavList}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
