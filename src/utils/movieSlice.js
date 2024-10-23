import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name:'movies',
    initialState:{
        searchResults: [],
        favorites: [],
        watchlist: [],
        movieDetails: {},
        searchHistory:[],
    },
    reducers:
    {
        setSearchResults: (state, action) =>
        {
            state.searchResults = action.payload;
        },
        addFavorite: (state,action) =>
        {
            state.favorites.push(action.payload);
        },
        addToWatchlist: (state, action) => 
        {
            state.watchlist.push(action.payload);
        },
        setMovieDetails: (state, action) => 
        {
            state.movieDetails = action.payload;
        },
        removeFavorite:(state,action) =>
        {
            state.favorites = state.favorites.filter((fav)=> fav.imdbID!= action.payload.imdbID);
        },
        removeFromWatchlist: (state, action) => {
            state.watchlist = state.watchlist.filter(movie => movie.imdbID !== action.payload.imdbID);
          },
          addSearchHistory:(state,action) =>
          {
            state.searchHistory = [...state.searchHistory,action.payload]

          },
          removeSearchHistory: (state, action) => {
            state.searchHistory = state.searchHistory.filter((h) => h !== action.payload);
          }
          

    }
});

export const{
    setSearchResults,
    addFavorite,
    removeFavorite,
    addToWatchlist,
    removeFromWatchlist,
    setMovieDetails,
    addSearchHistory,removeSearchHistory
} = movieSlice.actions;

export default movieSlice.reducer;