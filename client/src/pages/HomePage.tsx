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
  const categories = [
    {
      id: 'zmz',
      name: 'Двигатели ЗМЗ',
      image: 'https://images.unsplash.com/photo-1581092921461-7d6ffb54e4c2?auto=format&fit=crop&w=500&q=60',
      description: 'Восстановленные двигатели ЗМЗ для автомобилей ГАЗ',
    },
    {
      id: 'umz',
      name: 'Двигатели УМЗ',
      image: 'https://images.unsplash.com/photo-1485045634160-a5bc41221d5f?auto=format&fit=crop&w=500&q=60',
      description: 'Восстановленные двигатели УМЗ для автомобилей УАЗ',
    },
    {
      id: 'refurbished',
      name: 'Восстановленные двигатели',
      image: 'https://images.unsplash.com/photo-1519752594763-2633e2e0a50a?auto=format&fit=crop&w=500&q=60',
      description: 'Полностью восстановленные двигатели с гарантией',
    },
    {
      id: 'parts',
      name: 'Запчасти для двигателей',
      image: 'https://images.unsplash.com/photo-1581092874345-526dbd3bf440?auto=format&fit=crop&w=500&q=60',
      description: 'Оригинальные запчасти для двигателей ЗМЗ/УМЗ',
    },
  ];

  // Преимущества
  const advantages = [
    {
      icon: <SettingsIcon fontSize="large" color="primary" />,
      title: 'Гибкие варианты',
      description: 'Сдайте старый - получите восстановленный',
    },
    {
      icon: <ShippingIcon fontSize="large" color="primary" />,
      title: 'Сокращение времени',
      description: 'Избегайте простоя, двигатели всегда в наличии',
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Под ключ',
      description: 'Через 24 часа автомобиль уже будет в строю',
    },
    {
      icon: <SupportIcon fontSize="large" color="primary" />,
      title: 'Надежность',
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
          mb: 4,
          overflow: 'hidden',
          height: { xs: 400, md: 500 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
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
              maxWidth: { sm: '80%', md: '60%' },
            }}
          >
            Собственная сборка двигателей ЗМЗ/УМЗ
          </Typography>
          <Typography
            variant="h5"
            color="inherit"
            paragraph
            sx={{
              maxWidth: { sm: '80%', md: '50%' },
              mb: 4,
              fontSize: { xs: '1rem', md: '1.5rem' },
            }}
          >
            Коммерческое предложение по восстановленным двигателям для организаций с автопарком ГАЗ/УАЗ
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/catalog"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                mr: 2,
                display: { xs: 'inline-block', sm: 'inline-block' },
                mb: { xs: 2, sm: 0 },
              }}
            >
              Каталог
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={RouterLink}
              to="/about"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                borderColor: 'white',
                display: { xs: 'inline-block', sm: 'inline-block' },
              }}
            >
              О компании
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* О компании */}
      <Container sx={{ mb: 6 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          О КОМПАНИИ
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              — Мы узконаправленная организация, которая работает в нише «Обслуживания коммерческого 
              транспорта» предлагая ассортимент восстановленных ЗМЗ/УМЗ двигателей.
            </Typography>
            <Typography variant="body1" paragraph>
              — С 2017 года мы успешно занимаемся восстановлением и сборкой двигателей, обретая 
              репутацию надежного партнера в отрасли. В 2024 году 366 клиентов убедились в этом.
            </Typography>
            <Typography variant="body1" paragraph>
              ООО «Спектр» — это надежный партнер для всех, кто ценит качество, прозрачность и 
              индивидуальный подход в обслуживании своих автомобилей. Мы всегда готовы предложить 
              лучшие решения для наших клиентов!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: '#f5f5f5', p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                ООО "СПЕКТР"
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                ОГРН: 1217400012840<br />
                ИНН/КПП: 7456047921/745601001<br />
                Фактический адрес: Московская область, г. Подольск, Проезд авиаторов 12с2
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Категории */}
      <Container sx={{ mb: 6 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          Наши двигатели
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
                component={RouterLink}
                to={`/catalog?category=${category.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  height={180}
                  image={category.image}
                  alt={category.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" color="primary">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Преимущества сотрудничества */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Преимущества сотрудничества
          </Typography>
          <Grid container spacing={4}>
            {advantages.map((advantage, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ mb: 2 }}>{advantage.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                    {advantage.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {advantage.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Выгоды для вас */}
      <Container sx={{ my: 6 }}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          Выгоды для вас
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, textAlign: 'center', height: '100%', bgcolor: '#f8f8f8', borderRadius: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                УДОБСТВО
              </Typography>
              <Typography variant="body1">
                Мы - ваш цех по обслуживанию моторов
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, textAlign: 'center', height: '100%', bgcolor: '#f8f8f8', borderRadius: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                ЭКОНОМИЯ ВРЕМЕНИ
              </Typography>
              <Typography variant="body1">
                Сокращаем время простоя автомобиля
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, textAlign: 'center', height: '100%', bgcolor: '#f8f8f8', borderRadius: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                НАДЕЖНОСТЬ
              </Typography>
              <Typography variant="body1">
                Предоставляем гарантию на двигатели
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Готовы подобрать идеальный мотор? */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 6 }}>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                Готовы подобрать идеальный двигатель?
              </Typography>
              <Typography variant="body1">
                Наши специалисты помогут вам выбрать оптимальный двигатель под ваши задачи.
                Широкий выбор, профессиональная консультация и быстрая доставка!
              </Typography>
            </Box>
            <Button 
              component={RouterLink}
              to="/catalog"
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontWeight: 'bold',
                '&:hover': { bgcolor: 'secondary.dark' }
              }}
            >
              Перейти в каталог
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Футер */}
      <Box sx={{ bgcolor: '#0a4b8e', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                СПЕКТР
              </Typography>
              <Typography variant="body2" paragraph>
                Узконаправленная организация, которая работает в нише «Обслуживания коммерческого транспорта»,
                предлагая ассортимент восстановленных ЗМЗ/УМЗ двигателей.
              </Typography>
              <Typography variant="body2">
                Телефон: +7 (999) 123-45-67
              </Typography>
              <Typography variant="body2">
                Email: info@spectr-motors.ru
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Информация
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/about" style={{ color: 'white', textDecoration: 'none' }}>
                    О компании
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/delivery" style={{ color: 'white', textDecoration: 'none' }}>
                    Доставка
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/payment" style={{ color: 'white', textDecoration: 'none' }}>
                    Оплата
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/warranty" style={{ color: 'white', textDecoration: 'none' }}>
                    Гарантия
                  </RouterLink>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Каталог
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/catalog" style={{ color: 'white', textDecoration: 'none' }}>
                    Все двигатели
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/catalog?type=zmz" style={{ color: 'white', textDecoration: 'none' }}>
                    Двигатели ЗМЗ
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/catalog?type=umz" style={{ color: 'white', textDecoration: 'none' }}>
                    Двигатели УМЗ
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/catalog?type=refurbished" style={{ color: 'white', textDecoration: 'none' }}>
                    Восстановленные
                  </RouterLink>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Клиентам
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/account" style={{ color: 'white', textDecoration: 'none' }}>
                    Личный кабинет
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/track-order" style={{ color: 'white', textDecoration: 'none' }}>
                    Отследить заказ
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/contacts" style={{ color: 'white', textDecoration: 'none' }}>
                    Контакты
                  </RouterLink>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <RouterLink to="/blog" style={{ color: 'white', textDecoration: 'none' }}>
                    Блог
                  </RouterLink>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
              © 2025 ООО "СПЕКТР". Все права защищены.
            </Typography>
            <Box>
              <RouterLink to="/privacy" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                Политика конфиденциальности
              </RouterLink>
              <RouterLink to="/terms" style={{ color: 'white', textDecoration: 'none' }}>
                Условия использования
              </RouterLink>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 