import React, { useState, useEffect, useContext } from 'react';
import MovieCard from './UI/MovieCard';
import { GlobalContext } from './context/GlobalProvider';
import { Box, Button, MenuItem, Select } from '@mui/material';
import SearchInput from './UI/SearchInput';

const API_KEY = '1cb3fea7d4d4d604cfc856fc51c321f0';

function MovieSearch() {
  const { movieList, addMoviesFromList, uploadedList, language } = useContext(GlobalContext);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`
      );
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, [language]);

  useEffect(() => {
    const fetchMovies = async () => {
      const hasAddedMovies = movieList.length > 0;

      const listToUse = hasAddedMovies ? movieList : uploadedList;
      const details = await Promise.all(
        listToUse
          .filter((movie) => hasAddedMovies || movie.checked)
          .map(async (movie) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                movie.title
              )}&language=${language}`
            );
            const data = await response.json();
            return data.results[0];
          })
      );

      const validDetails = details.filter((detail) => detail != null);

      addMoviesFromList(validDetails);
    };

    fetchMovies();
  }, [language]);

  useEffect(() => {
    if (selectedGenre === 'all') {
      setFilteredMovies(movieList);
    } else {
      setFilteredMovies(movieList.filter((movie) => movie.genre_ids.includes(selectedGenre)));
    }
  }, [selectedGenre, movieList, language]);

  const saveMovies = async () => {
    try {
      const response = await fetch('ENDPOINT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredMovies),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const responseData = await response.json();
    } catch (error) {
      console.error('Failed to save movies:', error);
    }
  };

  return (
    <>
      <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <MenuItem value="all">All Genres</MenuItem>
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
      <SearchInput />
      <Box style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'center' }}>
        {filteredMovies.map((movie) => {
          return movie && <MovieCard movie={movie} />;
        })}
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => saveMovies()}>
          save
        </Button>
      </Box>
    </>
  );
}

export default MovieSearch;
