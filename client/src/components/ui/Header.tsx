import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setMobileMenuOpen(open);
  };

  const menuItems = [
    { title: 'Главная', path: '/' },
    { title: 'Каталог', path: '/catalog' },
    { title: 'О нас', path: '/about' },
    { title: 'Контакты', path: '/contacts' },
  ];

  const mobileMenuDrawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          МоторПрайм
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            component={RouterLink} 
            to={item.path} 
            key={item.title}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem button component={RouterLink} to="/profile">
              <ListItemText primary="Профиль" />
            </ListItem>
            <ListItem button component={RouterLink} to="/orders">
              <ListItemText primary="Мои заказы" />
            </ListItem>
            {isAdmin && (
              <ListItem button component={RouterLink} to="/admin">
                <ListItemText primary="Админ-панель" />
              </ListItem>
            )}
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Выйти" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={RouterLink} to="/login">
              <ListItemText primary="Войти" />
            </ListItem>
            <ListItem button component={RouterLink} to="/register">
              <ListItemText primary="Регистрация" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: '#0066cc', zIndex: 1300, boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: '64px' }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={handleMobileMenuToggle}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex' },
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              МоторПрайм
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>

            {/* Телефон для десктопа */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body1" component="span" fontWeight="500">
                8 (800) 123-45-67
              </Typography>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <IconButton
                size="large"
                aria-label="search"
                color="inherit"
                onClick={handleSearchToggle}
              >
                <SearchIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="show cart items"
                color="inherit"
                component={RouterLink}
                to="/cart"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isAuthenticated ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {user?.name ? (
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: 'secondary.main',
                        fontSize: '1rem'
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
              ) : (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Войти
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Выпадающее меню пользователя */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
          Профиль
        </MenuItem>
        <MenuItem component={RouterLink} to="/orders" onClick={handleMenuClose}>
          Мои заказы
        </MenuItem>
        {isAdmin && (
          <MenuItem component={RouterLink} to="/admin/dashboard" onClick={handleMenuClose}>
            Админ-панель
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>

      {/* Мобильное меню */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleDrawer(false)}
      >
        {mobileMenuDrawer}
      </Drawer>

      {/* Строка поиска */}
      {searchOpen && (
        <Box sx={{ width: '100%', padding: '1rem', bgcolor: 'background.paper', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <SearchBar onClose={handleSearchToggle} />
        </Box>
      )}
    </>
  );
};

export default Header; 