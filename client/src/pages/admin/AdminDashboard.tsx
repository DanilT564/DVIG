import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Регистрация компонентов для Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Моковые данные для статистики
const summaryData = {
  totalSales: 356900,
  totalOrders: 124,
  totalUsers: 78,
  totalProducts: 45,
};

const recentOrders = [
  { id: '1', orderNumber: '000128', customer: 'Иванов А.П.', total: 12400, date: '2023-07-10', status: 'processing' },
  { id: '2', orderNumber: '000127', customer: 'Смирнова О.В.', total: 34560, date: '2023-07-09', status: 'shipped' },
  { id: '3', orderNumber: '000126', customer: 'Петров И.С.', total: 9870, date: '2023-07-08', status: 'delivered' },
  { id: '4', orderNumber: '000125', customer: 'Козлов Д.А.', total: 31800, date: '2023-07-07', status: 'pending' },
  { id: '5', orderNumber: '000124', customer: 'Морозова Е.В.', total: 9890, date: '2023-07-06', status: 'shipped' },
];

const popularProducts = [
  { id: '1', name: 'АИР80А2 1.5кВт 3000об/мин', sales: 25 },
  { id: '2', name: 'АИР100S4 3кВт 1500об/мин', sales: 18 },
  { id: '3', name: 'АИР132М4 11кВт 1500об/мин', sales: 15 },
  { id: '4', name: 'АИР56В4 0.18кВт 1500об/мин', sales: 12 },
  { id: '5', name: 'АИР90L4 2.2кВт 1500об/мин', sales: 10 },
];

// Данные для графиков
const salesData = {
  labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль'],
  datasets: [
    {
      label: 'Продажи',
      data: [65400, 59000, 80500, 81200, 56000, 55000, 60800],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const ordersData = {
  labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль'],
  datasets: [
    {
      label: 'Заказы',
      data: [21, 19, 27, 28, 18, 20, 22],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, height: '80vh', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Панель управления
      </Typography>
      
      {/* Карточки с основной статистикой */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MoneyIcon sx={{ fontSize: 40, mb: 1, color: theme.palette.primary.main }} />
              <Typography variant="h5" component="div">
                {summaryData.totalSales.toLocaleString()} ₽
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Общие продажи
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CartIcon sx={{ fontSize: 40, mb: 1, color: theme.palette.info.main }} />
              <Typography variant="h5" component="div">
                {summaryData.totalOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Всего заказов
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <PersonIcon sx={{ fontSize: 40, mb: 1, color: theme.palette.success.main }} />
              <Typography variant="h5" component="div">
                {summaryData.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Пользователей
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <InventoryIcon sx={{ fontSize: 40, mb: 1, color: theme.palette.warning.main }} />
              <Typography variant="h5" component="div">
                {summaryData.totalProducts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Товаров
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Графики */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 350 }}>
            <Typography variant="h6" gutterBottom component="div">
              Продажи по месяцам
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 350 }}>
            <Typography variant="h6" gutterBottom component="div">
              Количество заказов
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bar data={ordersData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Последние заказы и популярные товары */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Последние заказы
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              {recentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={`#${order.orderNumber} - ${order.customer}`}
                      secondary={`${new Date(order.date).toLocaleDateString()} • ${order.total.toLocaleString()} ₽`}
                    />
                    <Box>
                      <Typography variant="body2" color={
                        order.status === 'delivered' ? 'success.main' :
                        order.status === 'shipped' ? 'info.main' :
                        order.status === 'processing' ? 'warning.main' : 'error.main'
                      }>
                        {order.status === 'delivered' ? 'Доставлен' : 
                         order.status === 'shipped' ? 'Отправлен' : 
                         order.status === 'processing' ? 'Обрабатывается' : 'Ожидает оплаты'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Популярные товары
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              {popularProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.sales} продаж`}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 