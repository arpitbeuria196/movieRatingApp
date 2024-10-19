import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4">
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
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Watchlist
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
