import React, { useState, useEffect, useContext } from 'react';
import { Box, Input, Typography } from '@mui/material';
import { GlobalContext } from '../context/GlobalProvider';

const API_KEY = '1cb3fea7d4d4d604cfc856fc51c321f0';

function SearchInput() {
  const { addMovieToList, language } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      const fetchSearchResults = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=${language}`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (movie) => {
    addMovieToList(movie);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <Box sx={{ textAlign: '-webkit-center', m: 2 }}>
      <Input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Box sx={{ maxHeight: 500, width: 550, overflow: 'auto', mt: 2 }}>
        {searchResults.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid gray',
              cursor: 'pointer',
              width: 500,
              p: 1,
              m: 1,
              borderRadius: 2,
            }}
            onClick={() => handleSuggestionClick(movie)}
          >
            <img
              style={{ width: 50 }}
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={''}
            />
            <Typography>{movie.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SearchInput;
