import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Button, Divider, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Telegram as TelegramIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  NavigateNext as ArrowIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Create styled RouterLink for navigation
const FooterLink = styled(RouterLink)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialButton = styled(IconButton)({
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '0 8px 8px 0',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box sx={{ 
      bgcolor: '#1a202c', 
      color: 'white',
      pt: 6,
      pb: 3,
      mt: 'auto'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Логотип и информация о компании */}
          <Grid item xs={12} md={4}>
            <Box component={RouterLink} to="/" sx={{ display: 'inline-block', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">DVIG</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7, maxWidth: 320 }}>
              Специализируемся на продаже контрактных двигателей и запчастей из Японии, Европы и США с 2010 года. 
              Гарантия качества и надежности.
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <SocialButton aria-label="facebook">
                <FacebookIcon />
              </SocialButton>
              <SocialButton aria-label="instagram">
                <InstagramIcon />
              </SocialButton>
              <SocialButton aria-label="youtube">
                <YouTubeIcon />
              </SocialButton>
              <SocialButton aria-label="telegram">
                <TelegramIcon />
              </SocialButton>
            </Box>
          </Grid>

          {/* Навигация по сайту */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Навигация
            </Typography>
            <FooterLink to="/">
              <ArrowIcon fontSize="small" sx={{ mr: 1, opacity: 0.6 }} />
              Главная
            </FooterLink>
            <FooterLink to="/catalog">
              <ArrowIcon fontSize="small" sx={{ mr: 1, opacity: 0.6 }} />
              Каталог
            </FooterLink>
            <FooterLink to="/reviews">
              <ArrowIcon fontSize="small" sx={{ mr: 1, opacity: 0.6 }} />
              Отзывы
            </FooterLink>
            <FooterLink to="/delivery">
              <ArrowIcon fontSize="small" sx={{ mr: 1, opacity: 0.6 }} />
              Доставка
            </FooterLink>
            <FooterLink to="/about">
              <ArrowIcon fontSize="small" sx={{ mr: 1, opacity: 0.6 }} />
              О компании
            </FooterLink>
            <FooterLink to="/contacts">
              <ArrowIcon fontSize="small" sx={{ mr: 1, opacity: 0.6 }} />
              Контакты
            </FooterLink>
          </Grid>

          {/* Контактная информация */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Контакты
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1, opacity: 0.6 }} />
              <Typography component="a" href="tel:+78005553535" sx={{ color: 'white', textDecoration: 'none' }}>
                8 (800) 555-35-35
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 1, opacity: 0.6 }} />
              <Typography component="a" href="mailto:info@dvig-motors.ru" sx={{ color: 'white', textDecoration: 'none' }}>
                info@dvig-motors.ru
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <LocationIcon sx={{ mr: 1, mt: 0.5, opacity: 0.6, flexShrink: 0 }} />
              <Typography variant="body2">
                Санкт-Петербург, ул. Автомобильная, д. 10, офис 205
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
              Пн-Пт: 9:00-19:00<br />
              Сб: 10:00-17:00<br />
              Вс: выходной
            </Typography>
          </Grid>

          {/* Подписка на рассылку */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Подпишитесь на новости
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Будьте в курсе новых поступлений и специальных предложений
            </Typography>
            <Box component="form" noValidate sx={{ mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ваш email"
                size="small"
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                    opacity: 1,
                  },
                }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Подписаться
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" sx={{ opacity: 0.6, mb: { xs: 1, sm: 0 } }}>
            © {year} DVIG Моторс. Все права защищены.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="inherit" sx={{ opacity: 0.6, fontSize: '0.875rem' }}>Политика конфиденциальности</Link>
            <Link href="#" color="inherit" sx={{ opacity: 0.6, fontSize: '0.875rem' }}>Пользовательское соглашение</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 