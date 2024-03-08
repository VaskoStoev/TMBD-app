const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIES_FROM_LIST':
      return {
        ...state,
        movieList: action.item,
      };
    case 'UPLOADED_MOVIES_LIST':
      return {
        ...state,
        uploadedList: action.item,
      };
    case 'ADD_MOVIE_TO_LIST':
      return {
        ...state,
        movieList: [...state.movieList, action.item],
      };
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: action.item,
      };
    case 'REMOVE_MOVIE_BY_ID':
      return {
        ...state,
        movieList: state.movieList.filter((movie) => movie.id !== action.item),
      };

    default:
      return state;
  }
};
export default AppReducer;
