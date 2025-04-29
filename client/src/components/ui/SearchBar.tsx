import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  InputBase, 
  IconButton, 
  Box, 
  Dialog, 
  CircularProgress, 
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Close as CloseIcon,
  TrendingUp as TrendingIcon,
  History as HistoryIcon,
  Restore as RestoreIcon,
  DirectionsCar as CarIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface SearchBarProps {
  onClose: () => void;
}

// Имитация популярных поисковых запросов
const popularSearches = [
  'Двигатель Mercedes',
  'BMW M5',
  'Toyota Land Cruiser',
  'Volkswagen Passat',
  'Audi A6'
];

// Имитация истории поиска (в реальном приложении хранилась бы в localStorage)
const recentSearches = [
  'Двигатель Honda',
  'Мотор Nissan',
  'Ford Focus',
  'Opel Astra'
];

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (e: React.FormEvent | string) => {
    let searchQuery = typeof e === 'string' ? e : query;
    
    if (typeof e !== 'string') {
      e.preventDefault();
    }
    
    if (searchQuery.trim()) {
      setIsSearching(true);
      // В реальном приложении здесь будет запрос к API
      setTimeout(() => {
        setIsSearching(false);
        navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
        onClose();
      }, 500);
    }
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={true}
      onClose={onClose}
      PaperProps={{
        elevation: 3,
        sx: {
          p: 0,
          position: 'absolute',
          top: { xs: 0, sm: 10 },
          borderRadius: { xs: 0, sm: 2 },
          borderTop: { xs: `4px solid ${theme.palette.primary.main}`, sm: 'none' },
          maxHeight: '80vh',
          overflow: 'hidden'
        },
      }}
    >
      <Box sx={{ p: 2, bgcolor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h6" fontWeight={500} sx={{ mb: 1 }}>
          Поиск моторов и запчастей
        </Typography>
      </Box>
      
      <Box component="form" onSubmit={handleSearch} sx={{ 
        display: 'flex', 
        alignItems: 'center',
        p: 2,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <IconButton disabled sx={{ color: 'primary.main' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ 
            flex: 1, 
            fontSize: '1.1rem',
            '& .MuiInputBase-input': {
              py: 1
            }
          }}
          placeholder="Введите марку, модель или тип мотора..."
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && <CircularProgress size={24} sx={{ mr: 1 }} />}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ 
        maxHeight: '60vh', 
        overflow: 'auto',
        p: 0,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.grey[300],
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.grey[100],
        },
      }}>
        {/* Популярные запросы */}
        <Box sx={{ p: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TrendingIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle2" fontWeight={500}>
              Популярные запросы
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            mt: 1 
          }}>
            {popularSearches.map((term, index) => (
              <Box 
                key={index}
                component="button"
                onClick={() => handlePopularSearch(term)}
                sx={{
                  background: 'none',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '100px',
                  px: 2,
                  py: 1,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(0, 102, 204, 0.04)',
                  }
                }}
              >
                <CarIcon fontSize="small" sx={{ mr: 0.5, color: 'primary.main', fontSize: '1rem' }} />
                {term}
              </Box>
            ))}
          </Box>
        </Box>

        <Divider />

        {/* История поиска */}
        <List sx={{ p: 0 }}>
          <ListItem sx={{ py: 1, px: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HistoryIcon fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="subtitle2" fontWeight={500}>История поиска</Typography>} 
            />
          </ListItem>
          {recentSearches.map((term, index) => (
            <ListItem 
              key={index} 
              button 
              onClick={() => handlePopularSearch(term)}
              sx={{ py: 1, px: 3 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <RestoreIcon fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText 
                primary={term} 
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
};

export default SearchBar; 