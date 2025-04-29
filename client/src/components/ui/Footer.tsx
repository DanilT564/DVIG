import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const footerLinks = {
    'Информация': [
      { title: 'О компании', path: '/about' },
      { title: 'Доставка', path: '/delivery' },
      { title: 'Оплата', path: '/payment' },
      { title: 'Гарантия', path: '/warranty' },
    ],
    'Каталог': [
      { title: 'Все двигатели', path: '/catalog' },
      { title: 'Двигатели ЗМЗ', path: '/catalog?type=zmz' },
      { title: 'Двигатели УМЗ', path: '/catalog?type=umz' },
      { title: 'Восстановленные', path: '/catalog?type=refurbished' },
    ],
    'Клиентам': [
      { title: 'Личный кабинет', path: '/profile' },
      { title: 'Отследить заказ', path: '/orders' },
      { title: 'Контакты', path: '/contacts' },
      { title: 'Блог', path: '/blog' },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: '#0a4b8e', color: 'white', mt: 'auto' }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Информация о компании */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
              СПЕКТР
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Узконаправленная организация, которая работает в нише «Обслуживания коммерческого транспорта»,
              предлагая ассортимент восстановленных ЗМЗ/УМЗ двигателей.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Телефон: +7 (999) 123-45-67
            </Typography>
            <Typography variant="body2">
              Email: info@spectr-motors.ru
            </Typography>
          </Grid>

          {/* Ссылки */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={6} md={2} key={title}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {title}
              </Typography>
              <List dense>
                {links.map((link) => (
                  <ListItem 
                    disableGutters
                    key={link.title}
                    component={RouterLink}
                    to={link.path}
                    sx={{ 
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      '&:hover': { 
                        color: 'secondary.light',
                      }
                    }}
                  >
                    <ListItemText primary={link.title} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}

          {/* Социальные сети */}
          <Grid item xs={12} sm={12} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Мы в соцсетях
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                aria-label="facebook" 
                sx={{ 
                  color: 'white',
                  transition: 'color 0.3s',
                  '&:hover': { color: 'secondary.main' } 
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                aria-label="instagram" 
                sx={{ 
                  color: 'white',
                  transition: 'color 0.3s',
                  '&:hover': { color: 'secondary.main' } 
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                aria-label="youtube" 
                sx={{ 
                  color: 'white',
                  transition: 'color 0.3s',
                  '&:hover': { color: 'secondary.main' } 
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton 
                aria-label="twitter" 
                sx={{ 
                  color: 'white',
                  transition: 'color 0.3s',
                  '&:hover': { color: 'secondary.main' } 
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      
      <Container maxWidth="xl">
        <Box sx={{ py: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 } }}>
            © {currentYear} ООО "СПЕКТР". Все права защищены.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              color="inherit" 
              underline="hover"
              sx={{
                transition: 'color 0.3s',
                '&:hover': { color: 'secondary.light' }
              }}
            >
              Политика конфиденциальности
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              color="inherit" 
              underline="hover"
              sx={{
                transition: 'color 0.3s',
                '&:hover': { color: 'secondary.light' }
              }}
            >
              Условия использования
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 