import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const initialState = {
    movieList: [],
    uploadedList: [],
    language: 'en-US',
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addMoviesFromList = (array) => {
    dispatch({ type: 'ADD_MOVIES_FROM_LIST', item: array });
  };
  const uploadedMovieList = (array) => {
    dispatch({ type: 'UPLOADED_MOVIES_LIST', item: array });
  };
  const addMovieToList = (movie) => {
    dispatch({ type: 'ADD_MOVIE_TO_LIST', item: movie });
  };
  const changeLanguage = (language) => {
    dispatch({ type: 'CHANGE_LANGUAGE', item: language });
  };
  const removeMovieById = (id) => {
    dispatch({ type: 'REMOVE_MOVIE_BY_ID', item: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        movieList: state.movieList,
        uploadedList: state.uploadedList,
        language: state.language,
        addMoviesFromList,
        removeMovieById,
        uploadedMovieList,
        addMovieToList,
        changeLanguage,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
