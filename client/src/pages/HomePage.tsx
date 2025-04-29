import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Paper,
  useMediaQuery,
  Divider,
  TextField,
  FormControl,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Settings as SettingsIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Категории моторов
  const engines = [
    {
      id: 'bmw-m54b30',
      name: 'Двигатель M54B30 BMW для 5 серии',
      image: 'https://images.unsplash.com/photo-1581092921461-7d6ffb54e4c2?auto=format&fit=crop&w=500&q=60',
      brand: 'BMW',
      model: '5 серия',
      year: '2010',
      volume: '3 л',
      power: '231 л.с.',
      price: '120,000 ₽',
      available: true,
    },
    {
      id: 'toyota-2azfe',
      name: 'Двигатель 2AZ-FE Toyota для Camry',
      image: 'https://images.unsplash.com/photo-1485045634160-a5bc41221d5f?auto=format&fit=crop&w=500&q=60',
      brand: 'Toyota',
      model: 'Camry',
      year: '2012',
      volume: '2.4 л',
      power: '167 л.с.',
      price: '95,000 ₽',
      available: true,
    },
    {
      id: 'vw-1-6tdi',
      name: 'Двигатель 1.6 TDI CAYA Volkswagen для Golf',
      image: 'https://images.unsplash.com/photo-1519752594763-2633e2e0a50a?auto=format&fit=crop&w=500&q=60',
      brand: 'Volkswagen',
      model: 'Golf',
      year: '2015',
      volume: '1.6 л',
      power: '105 л.с.',
      price: '110,000 ₽',
      available: true,
    },
    {
      id: 'nissan-vq35de',
      name: 'Двигатель VQ35DE Nissan для Murano',
      image: 'https://images.unsplash.com/photo-1581092874345-526dbd3bf440?auto=format&fit=crop&w=500&q=60',
      brand: 'Nissan',
      model: 'Murano',
      year: '2013',
      volume: '3.5 л',
      power: '249 л.с.',
      price: '105,000 ₽',
      available: true,
    },
  ];

  // Преимущества
  const advantages = [
    {
      icon: <SettingsIcon fontSize="large" color="primary" />,
      title: 'ГИБКИЕ ВАРИАНТЫ',
      description: 'Сдайте старый двигатель - получите восстановленный. Экономьте до 50% стоимости по сравнению с новыми.',
    },
    {
      icon: <ShippingIcon fontSize="large" color="primary" />,
      title: 'СОКРАЩЕНИЕ ВРЕМЕНИ',
      description: 'Избегайте простоя, двигатели всегда в наличии. Сокращаем время простоя вашего автомобиля.',
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'ПОД КЛЮЧ',
      description: 'Через 24 часа автомобиль уже будет в строю. Мы - ваш цех по обслуживанию моторов.',
    },
  ];

  // Выгоды
  const benefits = [
    {
      title: 'УДОБСТВО',
      description: 'Мы - ваш цех по обслуживанию моторов',
    },
    {
      title: 'ЭКОНОМИЯ ВРЕМЕНИ',
      description: 'Сокращаем время простоя автомобиля',
    },
    {
      title: 'НАДЕЖНОСТЬ',
      description: 'Предоставляем гарантию на двигатели',
    },
  ];

  return (
    <Box>
      {/* Hero секция */}
      <Paper
        sx={{
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1589802527877-f6d75d70abd0?auto=format&fit=crop&w=1500&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          mb: 6,
          overflow: 'hidden',
          height: { xs: 450, md: 550 },
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />
        <Container
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            fontWeight="bold"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
              maxWidth: { sm: '100%', md: '80%' },
            }}
          >
            Восстановленные двигатели ЗМЗ/УМЗ
          </Typography>
          <Typography
            variant="h5"
            color="inherit"
            paragraph
            sx={{
              maxWidth: { sm: '100%', md: '60%' },
              mb: 4,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Собственная сборка двигателей для коммерческого транспорта ГАЗ/УАЗ. Компания "СПЕКТР" - ваш надежный партнер с 2017 года.
          </Typography>
        </Container>
      </Paper>

      {/* Преимущества сотрудничества */}
      <Container sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          Преимущества сотрудничества
        </Typography>
        <Grid container spacing={4}>
          {advantages.map((advantage, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 3,
                  height: '100%',
                }}
              >
                <Box sx={{ mb: 2, color: 'primary.main' }}>{advantage.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  {advantage.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {advantage.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Популярные двигатели */}
      <Container sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            component="h2"
            variant="h4"
            color="text.primary"
            fontWeight="bold"
          >
            Популярные двигатели
          </Typography>
          <Button 
            component={RouterLink}
            to="/catalog"
            color="primary"
          >
            Смотреть все
          </Button>
        </Box>
        <Grid container spacing={4}>
          {engines.map((engine) => (
            <Grid item key={engine.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height={160}
                  image={engine.image}
                  alt={engine.name}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h6" component="h3" color="primary.main" fontWeight="bold">
                    {engine.name}
                  </Typography>
                  <Box sx={{ my: 1 }}>
                    <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span>Марка:</span><span>{engine.brand}</span>
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span>Модель:</span><span>{engine.model}</span>
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span>Год:</span><span>{engine.year}</span>
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span>Объем:</span><span>{engine.volume}</span>
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <span>Мощность:</span><span>{engine.power}</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      {engine.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'success.main' }}>
                      {engine.available ? 'В наличии' : 'Под заказ'}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    component={RouterLink}
                    to={`/product/${engine.id}`}
                    sx={{ mt: 2 }}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* О компании */}
      <Container sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          О компании
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="body1" paragraph>
              ООО "СПЕКТР" (ОГРН: 1217400012840, ИНН/КПП: 7456047921/745601001) — узконаправленная организация, которая работает в нише «Обслуживания коммерческого транспорта», предлагая ассортимент восстановленных ЗМЗ/УМЗ двигателей.
            </Typography>
            <Typography variant="body1" paragraph>
              С 2017 года мы успешно занимаемся восстановлением и сборкой двигателей, обретая 
              репутацию надежного партнера в отрасли. В 2024 году 366 клиентов убедились в этом.
            </Typography>
            <Typography variant="body1" paragraph>
              ООО «Спектр» — это надежный партнер для всех, кто ценит качество, прозрачность и 
              индивидуальный подход в обслуживании своих автомобилей.
            </Typography>
            
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
              Выгоды для вас:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              {benefits.map((benefit, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">{benefit.title}</Box> - {benefit.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            {/* Контактная форма */}
            <Box sx={{ 
              bgcolor: 'background.paper', 
              p: 3, 
              borderRadius: 2, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              height: '100%'
            }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Остались вопросы?
              </Typography>
              <Typography variant="body2" paragraph>
                Заполните форму, и наш специалист свяжется с вами в ближайшее время. Мы подберем для вас оптимальный вариант двигателя и ответим на все вопросы.
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>Ваше имя *</Typography>
                <TextField 
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>Телефон *</Typography>
                <TextField 
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>Email</Typography>
                <TextField 
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>Сообщение *</Typography>
                <TextField 
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              </FormControl>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
              >
                Отправить сообщение
              </Button>
              
              <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
                Или свяжитесь с нами:
              </Typography>
              <Typography variant="body2" paragraph>
                Телефон: 8 (800) 123-45-67
              </Typography>
              <Typography variant="body2" paragraph>
                Email: info@spektr-motors.ru
              </Typography>
              <Typography variant="body2">
                Адрес: Московская область, г. Подольск, Проезд авиаторов 12с2
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Нас можно найти по запросу через АВИТО: "Двигатель змз 406"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage; 