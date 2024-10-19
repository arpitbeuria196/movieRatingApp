import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name:'movies',
    initialState:{
        searchResults: [],
        favorites: [],
        watchlist: [],
        movieDetails: {},
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

    }
});

export const{
    setSearchResults,
    addFavorite,
    removeFavorite,
    addToWatchlist,
    removeFromWatchlist,
    setMovieDetails,
} = movieSlice.actions;

export default movieSlice.reducer;