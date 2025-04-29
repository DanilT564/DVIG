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
  ListItemIcon,
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
  Home as HomeIcon,
  Category as CategoryIcon,
  Info as InfoIcon,
  ContactPhone as ContactPhoneIcon,
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
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
    { title: 'Главная', path: '/', icon: <HomeIcon /> },
    { title: 'Каталог', path: '/catalog', icon: <CategoryIcon /> },
    { title: 'О нас', path: '/about', icon: <InfoIcon /> },
    { title: 'Контакты', path: '/contacts', icon: <ContactPhoneIcon /> },
  ];

  const mobileMenuDrawer = (
    <Box
      sx={{ 
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          МоторПрайм
        </Typography>
      </Box>
      
      <List sx={{ flexGrow: 1, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            component={RouterLink} 
            to={item.path} 
            key={item.title}
            sx={{ py: 1.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.title} 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          8 (800) 123-45-67
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ py: 0 }}>
        {isAuthenticated ? (
          <>
            <ListItem button component={RouterLink} to="/profile" sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Профиль" 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItem>
            <ListItem button component={RouterLink} to="/orders" sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Мои заказы" 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItem>
            {isAdmin && (
              <ListItem button component={RouterLink} to="/admin" sx={{ py: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                  <AdminIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Админ-панель" 
                  primaryTypographyProps={{ fontWeight: 500 }} 
                />
              </ListItem>
            )}
            <ListItem button onClick={handleLogout} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Выйти" 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={RouterLink} to="/login" sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Войти" 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItem>
            <ListItem button component={RouterLink} to="/register" sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Регистрация" 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main', boxShadow: (theme) => theme.shadows[1] }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ px: { xs: 0, sm: 2 }, minHeight: { xs: '56px', sm: '64px' } }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="Открыть меню"
                onClick={handleMobileMenuToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                mr: { xs: 1, md: 4 },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.03rem',
                  color: 'white',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                МоторПрайм
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    mx: 1,
                    py: 1,
                    px: 2,
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>

            {/* Телефон для десктопа */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                alignItems: 'center', 
                mr: 3,
                px: 2,
                py: 0.5,
                borderRadius: 1,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" fontWeight="500" whiteSpace="nowrap">
                8 (800) 123-45-67
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="Поиск"
                onClick={handleSearchToggle}
                sx={{ mx: 0.5 }}
              >
                <SearchIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="Корзина"
                component={RouterLink}
                to="/cart"
                sx={{ mx: 0.5 }}
              >
                <Badge badgeContent={totalItems} color="secondary" overlap="circular">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isAuthenticated ? (
                <IconButton
                  edge="end"
                  aria-label="Аккаунт"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ ml: 0.5 }}
                >
                  {user?.name ? (
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: 'secondary.main',
                        fontSize: '0.875rem',
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
                  variant="outlined"
                  size="small"
                  sx={{ 
                    display: { xs: 'none', sm: 'flex' },
                    ml: 1,
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
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
        PaperProps={{
          elevation: 2,
          sx: { minWidth: 200, mt: 1 }
        }}
      >
        <Box sx={{ py: 1, px: 2, bgcolor: 'grey.100' }}>
          <Typography variant="subtitle2" color="text.primary">
            {user?.name || 'Пользователь'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email || ''}
          </Typography>
        </Box>
        <Divider />
        <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Профиль" />
        </MenuItem>
        <MenuItem component={RouterLink} to="/orders" onClick={handleMenuClose}>
          <ListItemIcon>
            <ShoppingBagIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Мои заказы" />
        </MenuItem>
        {isAdmin && (
          <MenuItem component={RouterLink} to="/admin" onClick={handleMenuClose}>
            <ListItemIcon>
              <AdminIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Админ-панель" />
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </MenuItem>
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
        <Box 
          sx={{ 
            width: '100%', 
            padding: { xs: '1rem', md: '1.5rem' }, 
            bgcolor: 'background.paper', 
            boxShadow: (theme) => theme.shadows[3],
            position: 'absolute',
            zIndex: 1200,
          }}
        >
          <SearchBar onClose={handleSearchToggle} />
        </Box>
      )}
    </>
  );
};

export default Header; 