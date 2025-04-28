import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Rating,
  Breadcrumbs,
  Link,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { motorService } from '../services/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const queryClient = useQueryClient();
  const [tabValue, setTabValue] = useState(0);
  const [reviewRating, setReviewRating] = useState<number | null>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Запрос данных о моторе
  const {
    data: motor,
    isLoading,
    error,
  } = useQuery(['motor', id], () => motorService.getMotorById(id as string), {
    enabled: !!id,
  });

  // Мутация для добавления отзыва
  const addReviewMutation = useMutation(
    (review: { rating: number; comment: string }) =>
      motorService.createMotorReview(id as string, review),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['motor', id]);
        setReviewComment('');
        setReviewRating(5);
        setSnackbarMessage('Отзыв успешно добавлен');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      },
      onError: (error: any) => {
        setSnackbarMessage(error.response?.data?.message || 'Ошибка при добавлении отзыва');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      },
    }
  );

  // Обработчик отправки отзыва
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating && reviewComment.trim()) {
      addReviewMutation.mutate({
        rating: reviewRating,
        comment: reviewComment.trim(),
      });
    }
  };

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (motor) {
      addToCart({
        id: motor._id,
        name: motor.name,
        price: motor.price,
        imageUrl: motor.image,
      });
      setSnackbarMessage('Товар добавлен в корзину');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  // Обработчик изменения вкладки
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !motor) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Произошла ошибка при загрузке товара
          </Typography>
          <Button component={RouterLink} to="/catalog" variant="contained" sx={{ mt: 2 }}>
            Вернуться в каталог
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Хлебные крошки */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Link component={RouterLink} to="/catalog" color="inherit">
          Каталог
        </Link>
        {motor.category && (
          <Link
            component={RouterLink}
            to={`/catalog?category=${motor.category}`}
            color="inherit"
          >
            {motor.category === 'electric'
              ? 'Электродвигатели'
              : motor.category === 'diesel'
              ? 'Дизельные двигатели'
              : motor.category === 'gasoline'
              ? 'Бензиновые двигатели'
              : motor.category === 'hydraulic'
              ? 'Гидравлические двигатели'
              : motor.category === 'pneumatic'
              ? 'Пневматические двигатели'
              : 'Другие типы'}
          </Link>
        )}
        <Typography color="text.primary">{motor.name}</Typography>
      </Breadcrumbs>

      {/* Основная информация о товаре */}
      <Grid container spacing={4}>
        {/* Изображение товара */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box
              sx={{
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <img
                src={motor.image || '/placeholder.jpg'}
                alt={motor.name}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Информация о товаре */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {motor.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={motor.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {motor.rating} ({motor.numReviews} отзывов)
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
            {motor.price.toLocaleString()} ₽
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip
              label={motor.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}
              color={motor.countInStock > 0 ? 'success' : 'error'}
              sx={{ mr: 1 }}
            />
            {motor.brand && <Chip label={motor.brand} variant="outlined" sx={{ mr: 1 }} />}
            {motor.manufacturer && <Chip label={motor.manufacturer} variant="outlined" />}
          </Box>

          <Typography variant="body1" paragraph>
            {motor.description}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={motor.countInStock <= 0}
              fullWidth
              sx={{ mb: 2 }}
            >
              Добавить в корзину
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Вкладки с характеристиками и отзывами */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={1}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Характеристики" />
            <Tab label={`Отзывы (${motor.reviews.length})`} />
          </Tabs>

          {/* Вкладка с характеристиками */}
          <TabPanel value={tabValue} index={0}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '40%', fontWeight: 'bold' }}>
                      Мощность
                    </TableCell>
                    <TableCell>{motor.power} л.с.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Тип двигателя
                    </TableCell>
                    <TableCell>
                      {motor.category === 'electric'
                        ? 'Электродвигатель'
                        : motor.category === 'diesel'
                        ? 'Дизельный двигатель'
                        : motor.category === 'gasoline'
                        ? 'Бензиновый двигатель'
                        : motor.category === 'hydraulic'
                        ? 'Гидравлический двигатель'
                        : motor.category === 'pneumatic'
                        ? 'Пневматический двигатель'
                        : 'Другой тип'}
                    </TableCell>
                  </TableRow>
                  {motor.weight && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Вес
                      </TableCell>
                      <TableCell>{motor.weight} кг</TableCell>
                    </TableRow>
                  )}
                  {motor.dimensions && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Размеры (Д×Ш×В)
                      </TableCell>
                      <TableCell>
                        {motor.dimensions.length}×{motor.dimensions.width}×{motor.dimensions.height} мм
                      </TableCell>
                    </TableRow>
                  )}
                  {motor.rpm && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Обороты
                      </TableCell>
                      <TableCell>{motor.rpm} об/мин</TableCell>
                    </TableRow>
                  )}
                  {motor.voltage && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Напряжение
                      </TableCell>
                      <TableCell>{motor.voltage} В</TableCell>
                    </TableRow>
                  )}
                  {motor.efficiency && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        КПД
                      </TableCell>
                      <TableCell>{motor.efficiency}%</TableCell>
                    </TableRow>
                  )}
                  {motor.fuelType && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Тип топлива
                      </TableCell>
                      <TableCell>
                        {motor.fuelType === 'diesel'
                          ? 'Дизельное'
                          : motor.fuelType === 'gasoline'
                          ? 'Бензин'
                          : motor.fuelType === 'natural_gas'
                          ? 'Природный газ'
                          : motor.fuelType === 'lpg'
                          ? 'Сжиженный газ'
                          : 'Не применимо'}
                      </TableCell>
                    </TableRow>
                  )}
                  {motor.yearOfManufacture && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Год выпуска
                      </TableCell>
                      <TableCell>{motor.yearOfManufacture}</TableCell>
                    </TableRow>
                  )}
                  {motor.warranty && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Гарантия
                      </TableCell>
                      <TableCell>{motor.warranty} месяцев</TableCell>
                    </TableRow>
                  )}
                  {motor.features && motor.features.length > 0 && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Особенности
                      </TableCell>
                      <TableCell>
                        <ul style={{ paddingLeft: 16, margin: 0 }}>
                          {motor.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Вкладка с отзывами */}
          <TabPanel value={tabValue} index={1}>
            {motor.reviews.length > 0 ? (
              <Box>
                {motor.reviews.map((review) => (
                  <Card key={review._id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {review.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {review.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
                У этого товара пока нет отзывов
              </Typography>
            )}

            {/* Форма для добавления отзыва */}
            {isAuthenticated ? (
              <Box component="form" onSubmit={handleSubmitReview} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Оставить отзыв
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend">Ваша оценка</Typography>
                  <Rating
                    name="rating"
                    value={reviewRating}
                    onChange={(event, newValue) => {
                      setReviewRating(newValue);
                    }}
                  />
                </Box>
                <TextField
                  label="Ваш отзыв"
                  multiline
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!reviewRating || !reviewComment.trim() || addReviewMutation.isLoading}
                >
                  {addReviewMutation.isLoading ? <CircularProgress size={24} /> : 'Отправить отзыв'}
                </Button>
              </Box>
            ) : (
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography align="center">
                  <Link component={RouterLink} to="/login">
                    Войдите
                  </Link>{' '}
                  или{' '}
                  <Link component={RouterLink} to="/register">
                    зарегистрируйтесь
                  </Link>{' '}
                  чтобы оставить отзыв
                </Typography>
              </Box>
            )}
          </TabPanel>
        </Paper>
      </Box>

      {/* Уведомление */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductPage; 