import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaStar, FaFilm, FaClock, FaRegCalendarAlt, FaLanguage, FaAward } from 'react-icons/fa';

const MovieDetails = () => {
  const { movieId } = useParams();
  const API_KEY = '4856a2a4';
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`);
      if (response.data.Response === "True") {
        setMovieDetails(response.data);
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movieDetails) return <div>No movie details found.</div>;

  const {
    Title,
    Poster,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Ratings,
    imdbRating,
    BoxOffice,
  } = movieDetails;

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${Poster !== "N/A" ? Poster : 'https://via.placeholder.com/400'})`, filter: 'blur(30px)' }}
      ></div>

      <h1 className="text-4xl font-bold mb-4 relative z-10 text-center text-gray-900">{Title}</h1>
      <div className="flex justify-center mb-4">
        <img
          src={Poster !== "N/A" ? Poster : 'https://via.placeholder.com/400'}
          alt={Title}
          className="w-64 h-auto rounded-lg shadow-lg relative z-10 border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative z-10">
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <FaFilm className="text-gray-700 mr-2" />
          <p><strong>Genre:</strong> {Genre}</p>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <FaRegCalendarAlt className="text-gray-700 mr-2" />
          <p><strong>Released:</strong> {Released}</p>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <FaClock className="text-gray-700 mr-2" />
          <p><strong>Runtime:</strong> {Runtime}</p>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <FaLanguage className="text-gray-700 mr-2" />
          <p><strong>Language:</strong> {Language}</p>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <FaAward className="text-gray-700 mr-2" />
          <p><strong>Awards:</strong> {Awards}</p>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <FaStar className="text-yellow-500 mr-2" />
          <p><strong>IMDb Rating:</strong> {imdbRating}</p>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <p><strong>Rated:</strong> {Rated}</p>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded shadow-md">
          <p><strong>Box Office:</strong> {BoxOffice !== "N/A" ? BoxOffice : 'N/A'}</p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-2 relative z-10">Plot</h2>
      <p className="text-gray-700 mb-4 relative z-10">{Plot}</p>
      <h2 className="text-2xl font-semibold mb-2 relative z-10">Director</h2>
      <p className="text-gray-700 mb-4 relative z-10">{Director}</p>
      <h2 className="text-2xl font-semibold mb-2 relative z-10">Writers</h2>
      <p className="text-gray-700 mb-4 relative z-10">{Writer}</p>
      <h2 className="text-2xl font-semibold mb-2 relative z-10">Actors</h2>
      <p className="text-gray-700 mb-4 relative z-10">{Actors}</p>
      <h2 className="text-2xl font-semibold mb-2 relative z-10">Ratings</h2>
      <ul className="list-disc pl-5 relative z-10">
        {Ratings.map((rating, index) => (
          <li key={index} className="text-gray-700">{rating.Source}: {rating.Value}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
