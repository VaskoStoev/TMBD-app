import React, { useState, useEffect, useContext } from 'react';

import { Box, MenuItem, Select, Typography } from '@mui/material';
import { GlobalContext } from './context/GlobalProvider';

function Header() {
  const [language, setLanguage] = useState('en-US');
  const { changeLanguage } = useContext(GlobalContext);
  useEffect(() => {
    changeLanguage(language);
  }, [language]);
  return (
    <Box sx={{ display: 'flex', p: 1, justifyContent: 'end' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>language:</Typography>
        <Select
          sx={{ height: 30, ml: 1 }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="en-US">English</MenuItem>
          <MenuItem value="es-ES">Español</MenuItem>
          <MenuItem value="fr-FR">Français</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}

export default Header;
