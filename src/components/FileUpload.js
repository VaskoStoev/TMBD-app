import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { GlobalContext } from './context/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/fileUpload.css';

function FileUpload() {
  const navigate = useNavigate();
  const { uploadedList, uploadedMovieList } = useContext(GlobalContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const titles = content.split('\n').filter(Boolean);
      const moviesWithCheck = titles.map((title) => ({ title, checked: true }));
      uploadedMovieList(moviesWithCheck);
    };

    reader.readAsText(file);
  };

  const handleCheckboxChange = (index) => {
    const newMovies = uploadedList.map((movie, i) => {
      if (i === index) {
        return { ...movie, checked: !movie.checked };
      }
      return movie;
    });
    uploadedMovieList(newMovies);
  };
  const handleSearch = () => {
    navigate('/search');
  };
  return (
    <Box>
      <div className="file-upload-wrapper">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept=".txt"
          style={{ display: 'none' }}
        />
        <button
          onClick={() => document.getElementById('file-input').click()}
          className="file-upload-btn"
        >
          Upload File
        </button>
      </div>
      <Box sx={{ textAlign: 'center' }}>
        {uploadedList.map((movie, index) => (
          <Box key={index}>
            <input
              type="checkbox"
              checked={movie.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            {movie.title}
          </Box>
        ))}
        <Button onClick={handleSearch}>Search</Button>
      </Box>
    </Box>
  );
}

export default FileUpload;
