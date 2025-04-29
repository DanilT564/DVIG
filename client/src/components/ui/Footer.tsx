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
    'Разделы сайта': [
      { title: 'Главная', path: '/' },
      { title: 'О компании', path: '/about' },
      { title: 'Каталог двигателей', path: '/catalog' },
      { title: 'Контакты', path: '/contacts' },
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
              ООО "СПЕКТР"
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Узконаправленная организация, которая работает в нише «Обслуживания коммерческого транспорта»,
              предлагая ассортимент восстановленных ЗМЗ/УМЗ двигателей.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ОГРН: 1217400012840
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              ИНН/КПП: 7456047921/745601001
            </Typography>
          </Grid>

          {/* Ссылки */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
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
                      mb: 1,
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

          {/* Контакты */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Контакты
            </Typography>
            <List dense>
              <ListItem disableGutters sx={{ mb: 1 }}>
                <ListItemText primary="8 (800) 123-45-67" />
              </ListItem>
              <ListItem disableGutters sx={{ mb: 1 }}>
                <ListItemText primary="info@spectr-motors.ru" />
              </ListItem>
              <ListItem disableGutters sx={{ mb: 1 }}>
                <ListItemText primary="Московская область, г. Подольск, Проезд авиаторов 12с2" />
              </ListItem>
            </List>
          </Grid>

          {/* Социальные сети */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Мы в сети
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Нас можно найти по запросу через АВИТО:
              <Box component="span" sx={{ display: 'block', fontWeight: 'bold', mt: 1 }}>
                "Двигатель змз 406"
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      
      <Container maxWidth="xl">
        <Box sx={{ py: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: { xs: 'center', sm: 'center' } }}>
          <Typography variant="body2" align="center">
            © {currentYear} ООО "СПЕКТР". Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 