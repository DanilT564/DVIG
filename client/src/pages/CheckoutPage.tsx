import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';

// Шаги оформления заказа
const steps = ['Информация о доставке', 'Оплата', 'Подтверждение'];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  // Данные доставки
  const [shippingData, setShippingData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  // Данные оплаты
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expDate: '',
    cvv: '',
  });

  useEffect(() => {
    // Если корзина пуста, перенаправляем на страницу корзины
    if (cart.length === 0) {
      navigate('/cart');
    }

    // Предзаполняем данные пользователя, если они есть
    if (user) {
      setShippingData(prevData => ({
        ...prevData,
        name: user.name || prevData.name,
      }));
    }
  }, [cart, navigate, user]);

  // Обработка изменения полей доставки
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  // Обработка изменения полей оплаты
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  // Проверка формы доставки
  const validateShippingForm = () => {
    const { name, address, city, postalCode, country, phone } = shippingData;
    return name && address && city && postalCode && country && phone;
  };

  // Проверка формы оплаты
  const validatePaymentForm = () => {
    const { cardNumber, cardName, expDate, cvv } = paymentData;
    return cardNumber && cardName && expDate && cvv;
  };

  // Обработка перехода к следующему шагу
  const handleNext = () => {
    if (activeStep === 0 && !validateShippingForm()) {
      setError('Пожалуйста, заполните все поля доставки');
      return;
    }
    
    if (activeStep === 1 && !validatePaymentForm()) {
      setError('Пожалуйста, заполните все поля оплаты');
      return;
    }
    
    setError('');
    setActiveStep(prevStep => prevStep + 1);
    
    // Если последний шаг, оформляем заказ
    if (activeStep === 2) {
      handlePlaceOrder();
    }
  };

  // Обработка возврата к предыдущему шагу
  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
    setError('');
  };

  // Оформление заказа
  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Здесь должен быть запрос к API для создания заказа
      // const response = await api.orders.create({ items: cart, shipping: shippingData, payment: paymentData });
      
      // Имитация запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Генерация фиктивного номера заказа
      const randomOrderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      setOrderNumber(randomOrderNumber);
      
      // Очистка корзины после успешного заказа
      clearCart();
      
      setActiveStep(3); // Переход к финальному шагу
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  // Форма доставки
  const renderShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="name"
          label="ФИО получателя"
          value={shippingData.name}
          onChange={handleShippingChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="address"
          label="Адрес"
          value={shippingData.address}
          onChange={handleShippingChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="city"
          label="Город"
          value={shippingData.city}
          onChange={handleShippingChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="postalCode"
          label="Почтовый индекс"
          value={shippingData.postalCode}
          onChange={handleShippingChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="country"
          label="Страна"
          value={shippingData.country}
          onChange={handleShippingChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="phone"
          label="Телефон"
          value={shippingData.phone}
          onChange={handleShippingChange}
        />
      </Grid>
    </Grid>
  );

  // Форма оплаты
  const renderPaymentForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="cardNumber"
          label="Номер карты"
          value={paymentData.cardNumber}
          onChange={handlePaymentChange}
          placeholder="1234 5678 9012 3456"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="cardName"
          label="Имя владельца карты"
          value={paymentData.cardName}
          onChange={handlePaymentChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          name="expDate"
          label="Срок действия (ММ/ГГ)"
          value={paymentData.expDate}
          onChange={handlePaymentChange}
          placeholder="MM/YY"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          name="cvv"
          label="CVV"
          value={paymentData.cvv}
          onChange={handlePaymentChange}
          type="password"
        />
      </Grid>
    </Grid>
  );

  // Подтверждение заказа
  const renderOrderSummary = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Информация о заказе
      </Typography>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.product._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.product.name}
              secondary={`Количество: ${item.quantity}`}
            />
            <Typography variant="body2">
              {(item.product.price * item.quantity).toLocaleString()} ₽
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Итого" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total.toLocaleString()} ₽
          </Typography>
        </ListItem>
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        Информация о доставке
      </Typography>
      <Typography gutterBottom>
        {shippingData.name}
      </Typography>
      <Typography gutterBottom>
        {shippingData.address}
      </Typography>
      <Typography gutterBottom>
        {shippingData.city}, {shippingData.postalCode}
      </Typography>
      <Typography gutterBottom>
        {shippingData.country}
      </Typography>
      <Typography gutterBottom>
        {shippingData.phone}
      </Typography>
    </Box>
  );

  // Успешное оформление заказа
  const renderOrderComplete = () => (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Спасибо за заказ!
      </Typography>
      <Typography variant="subtitle1">
        Номер вашего заказа: #{orderNumber}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Мы отправили подтверждение заказа на вашу электронную почту.
        Вы можете отслеживать статус заказа в личном кабинете.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/orders')}
        sx={{ mt: 3 }}
      >
        Мои заказы
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mt: 3 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Оформление заказа
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {activeStep === steps.length ? (
          renderOrderComplete()
        ) : (
          <>
            {activeStep === 0 && renderShippingForm()}
            {activeStep === 1 && renderPaymentForm()}
            {activeStep === 2 && renderOrderSummary()}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }} disabled={loading}>
                  Назад
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : activeStep === steps.length - 1 ? (
                  'Оформить заказ'
                ) : (
                  'Далее'
                )}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CheckoutPage; 