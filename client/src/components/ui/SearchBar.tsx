import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, InputBase, IconButton, Box, Dialog, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      // В реальном приложении здесь будет запрос к API
      setTimeout(() => {
        setIsSearching(false);
        navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
        onClose();
      }, 500);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={true}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          p: 2,
          position: 'absolute',
          top: { xs: 0, sm: 10 },
          borderRadius: { xs: 0, sm: 2 },
          borderTop: { xs: `4px solid ${theme.palette.primary.main}`, sm: 'none' },
        },
      }}
    >
      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton disabled>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ flex: 1, fontSize: '1.1rem' }}
          placeholder="Поиск моторов..."
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && <CircularProgress size={24} sx={{ mr: 1 }} />}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default SearchBar; 