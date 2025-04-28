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
      { title: 'Все моторы', path: '/catalog' },
      { title: 'Электрические', path: '/catalog?category=electric' },
      { title: 'Бензиновые', path: '/catalog?category=petrol' },
      { title: 'Дизельные', path: '/catalog?category=diesel' },
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
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', mt: 'auto' }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Информация о компании */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
              MOTORS
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Интернет-магазин качественных моторов для различных применений. 
              Широкий выбор моделей по доступным ценам с доставкой по всей России.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Телефон: +7 (999) 123-45-67
            </Typography>
            <Typography variant="body2">
              Email: info@motors-shop.ru
            </Typography>
          </Grid>

          {/* Ссылки */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={6} md={2} key={title}>
              <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
              Мы в соцсетях
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton aria-label="facebook" sx={{ color: 'white' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="instagram" sx={{ color: 'white' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="youtube" sx={{ color: 'white' }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton aria-label="twitter" sx={{ color: 'white' }}>
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
            © {currentYear} Motors Shop. Все права защищены.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link component={RouterLink} to="/privacy" color="inherit" underline="hover">
              Политика конфиденциальности
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" underline="hover">
              Условия использования
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 