import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  IconButton,
  TextField,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Breadcrumbs,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  NavigateNext as NavigateNextIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const CartPage: React.FC = () => {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Обработчик изменения количества товара
  const handleQuantityChange = (id: string, newValue: string) => {
    const quantity = parseInt(newValue);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  // Обработчик увеличения количества товара
  const handleIncreaseQuantity = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  // Обработчик уменьшения количества товара
  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  // Обработчик перехода к оформлению заказа
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

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
        <Typography color="text.primary">Корзина</Typography>
      </Breadcrumbs>

      {/* Заголовок */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <ShoppingCartIcon sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Корзина
        </Typography>
      </Box>

      {items.length === 0 ? (
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Ваша корзина пуста
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Добавьте товары в корзину, чтобы продолжить покупки
          </Typography>
          <Button
            component={RouterLink}
            to="/catalog"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Перейти в каталог
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {/* Список товаров */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={1}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Товар</TableCell>
                      <TableCell align="right">Цена</TableCell>
                      <TableCell align="center">Количество</TableCell>
                      <TableCell align="right">Итого</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              component="img"
                              src={item.imageUrl || '/placeholder.jpg'}
                              alt={item.name}
                              sx={{
                                width: 70,
                                height: 70,
                                objectFit: 'contain',
                                bgcolor: '#f5f5f5',
                                borderRadius: 1,
                                mr: 2,
                              }}
                            />
                            <Link
                              component={RouterLink}
                              to={`/product/${item.id}`}
                              color="inherit"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {item.name}
                            </Link>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {item.price.toLocaleString()} ₽
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <TextField
                              size="small"
                              inputProps={{ style: { textAlign: 'center' } }}
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              sx={{ width: 60, mx: 1 }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/catalog"
                >
                  Продолжить покупки
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={clearCart}
                >
                  Очистить корзину
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Итоговая информация */}
          <Grid item xs={12} lg={4}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Итого
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Товары ({items.length}):</Typography>
                <Typography fontWeight="bold">{totalPrice.toLocaleString()} ₽</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Доставка:</Typography>
                <Typography fontWeight="bold">Бесплатно</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">К оплате:</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {totalPrice.toLocaleString()} ₽
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage; 