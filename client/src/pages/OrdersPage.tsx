import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Link,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useAuth } from '../hooks/useAuth';

// Типы для заказов
interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // В реальном приложении здесь был бы запрос к API
        // const response = await api.orders.getUserOrders();
        // setOrders(response.data);
        
        // Имитация загрузки заказов
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Тестовые данные для демонстрации
        const mockOrders: Order[] = [
          {
            _id: '1',
            orderNumber: '000123',
            user: user._id,
            orderItems: [
              {
                product: {
                  _id: 'p1',
                  name: 'АИР80А2 1.5кВт 3000об/мин',
                  price: 5490
                },
                quantity: 2
              }
            ],
            shippingAddress: {
              address: 'ул. Ленина, 1',
              city: 'Москва',
              postalCode: '101000',
              country: 'Россия'
            },
            paymentMethod: 'card',
            totalPrice: 10980,
            isPaid: true,
            paidAt: new Date('2023-05-15'),
            isDelivered: true,
            deliveredAt: new Date('2023-05-20'),
            status: 'delivered',
            createdAt: new Date('2023-05-14').toISOString()
          },
          {
            _id: '2',
            orderNumber: '000124',
            user: user._id,
            orderItems: [
              {
                product: {
                  _id: 'p2',
                  name: 'АИР100S4 3кВт 1500об/мин',
                  price: 9890
                },
                quantity: 1
              }
            ],
            shippingAddress: {
              address: 'ул. Пушкина, 10',
              city: 'Санкт-Петербург',
              postalCode: '190000',
              country: 'Россия'
            },
            paymentMethod: 'card',
            totalPrice: 9890,
            isPaid: true,
            paidAt: new Date('2023-06-01'),
            isDelivered: false,
            status: 'shipped',
            createdAt: new Date('2023-05-31').toISOString()
          },
          {
            _id: '3',
            orderNumber: '000125',
            user: user._id,
            orderItems: [
              {
                product: {
                  _id: 'p3',
                  name: 'АИР132М4 11кВт 1500об/мин',
                  price: 25400
                },
                quantity: 1
              },
              {
                product: {
                  _id: 'p4',
                  name: 'АИР56В4 0.18кВт 1500об/мин',
                  price: 3200
                },
                quantity: 2
              }
            ],
            shippingAddress: {
              address: 'ул. Гагарина, 5',
              city: 'Екатеринбург',
              postalCode: '620000',
              country: 'Россия'
            },
            paymentMethod: 'card',
            totalPrice: 31800,
            isPaid: false,
            isDelivered: false,
            status: 'pending',
            createdAt: new Date().toISOString()
          }
        ];
        
        setOrders(mockOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке заказов');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Получение статуса заказа
  const getStatusChip = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: 'Ожидает оплаты', color: 'warning' as const },
      processing: { label: 'Обрабатывается', color: 'info' as const },
      shipped: { label: 'Отправлен', color: 'primary' as const },
      delivered: { label: 'Доставлен', color: 'success' as const },
      cancelled: { label: 'Отменен', color: 'error' as const }
    };

    const config = statusConfig[status];
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
    } catch (e) {
      return 'Неизвестная дата';
    }
  };

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning" sx={{ mt: 4 }}>
          Пожалуйста, войдите в систему для просмотра ваших заказов.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h4" gutterBottom sx={{ mt: 4 }}>
        Мои заказы
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            У вас еще нет заказов.
          </Typography>
          <Button 
            component={RouterLink} 
            to="/catalog" 
            variant="contained"
          >
            Перейти в каталог
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <TableRow hover>
                    <TableCell>#{order.orderNumber}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order.totalPrice.toLocaleString()} ₽</TableCell>
                    <TableCell>{getStatusChip(order.status)}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        component={RouterLink}
                        to={`/orders/${order._id}`}
                      >
                        Подробнее
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} colSpan={5}>
                      <Box sx={{ p: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Товары в заказе:
                        </Typography>
                        {order.orderItems.map((item, index) => (
                          <Typography key={index} variant="body2" color="text.secondary">
                            {item.product.name} × {item.quantity}
                          </Typography>
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrdersPage; 