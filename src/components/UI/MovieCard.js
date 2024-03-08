import { Box, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import classes from '../../styles/MovieCard.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function MovieCard({ movie }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { removeMovieById } = useContext(GlobalContext);
  return (
    <Box className={classes.movie}>
      <Box className={classes.actions}>
        <Tooltip title="Details">
          <IconButton onClick={handleOpen}>
            <InfoIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => removeMovieById(movie.id)}>
            <DeleteIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Box>
      {
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      }
      <Box className={classes.details}>
        <Typography>{movie.title}</Typography>
        <Typography>Release Date: {movie.release_date}</Typography>
        <Typography>Rating: {movie.vote_average}</Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {movie.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default MovieCard;
