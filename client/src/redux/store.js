import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import userReducer from './userSlice'; // Import userReducer from userSlice
import movieReducer from './movieSlice'; // Import movieReducer from movieSlice
import searchReducer from './searchSlice'; // Import searchReducer from searchSlice
import savedMoviesReducer from './savedMoviesSlice'; // Import savedMoviesReducer from savedMoviesSlice

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    app: userReducer, // Reducer for user-related state
    movie: movieReducer, // Reducer for movie-related state
    searchMovie: searchReducer, // Reducer for search movie-related state
    savedMovies: savedMoviesReducer, // Reducer for saved movies state
  }
});

export default store; // Export the configured store
