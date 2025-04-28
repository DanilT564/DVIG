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
      id: 'electric',
      name: 'Электрические моторы',
      image: 'https://images.unsplash.com/photo-1581092921461-7d6ffb54e4c2?auto=format&fit=crop&w=500&q=60',
      description: 'Эффективные и экологичные решения для различных применений',
    },
    {
      id: 'petrol',
      name: 'Бензиновые моторы',
      image: 'https://images.unsplash.com/photo-1485045634160-a5bc41221d5f?auto=format&fit=crop&w=500&q=60',
      description: 'Мощные двигатели для решения сложных задач',
    },
    {
      id: 'diesel',
      name: 'Дизельные моторы',
      image: 'https://images.unsplash.com/photo-1519752594763-2633e2e0a50a?auto=format&fit=crop&w=500&q=60',
      description: 'Надежные и экономичные моторы для длительной эксплуатации',
    },
    {
      id: 'industrial',
      name: 'Промышленные моторы',
      image: 'https://images.unsplash.com/photo-1581092874345-526dbd3bf440?auto=format&fit=crop&w=500&q=60',
      description: 'Высокопроизводительные решения для промышленного применения',
    },
  ];

  // Преимущества
  const advantages = [
    {
      icon: <SettingsIcon fontSize="large" color="primary" />,
      title: 'Качественные запчасти',
      description: 'Моторы от проверенных производителей с гарантией качества',
    },
    {
      icon: <ShippingIcon fontSize="large" color="primary" />,
      title: 'Быстрая доставка',
      description: 'Доставка по всей России в кратчайшие сроки',
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Гарантия и сервис',
      description: 'Расширенная гарантия и постпродажное обслуживание',
    },
    {
      icon: <SupportIcon fontSize="large" color="primary" />,
      title: 'Техническая поддержка',
      description: 'Консультации специалистов и помощь в подборе',
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
            Качественные моторы для любых задач
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
            Широкий выбор моторов различных типов и мощностей для промышленного и бытового использования
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
          Категории моторов
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

      {/* Преимущества */}
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
            Почему выбирают нас
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
                  <Typography variant="h6" gutterBottom fontWeight="bold">
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

      {/* Призыв к действию */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 6 }}>
        <Container>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={7}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Готовы подобрать идеальный мотор?
              </Typography>
              <Typography variant="body1" paragraph>
                Наши специалисты помогут вам выбрать оптимальный мотор под ваши задачи.
                Широкий выбор, профессиональная консультация и быстрая доставка!
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/catalog"
                sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
              >
                Перейти в каталог
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 