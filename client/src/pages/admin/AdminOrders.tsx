import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

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
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

// Моковые данные для тестирования
const mockOrders: Order[] = [
  {
    _id: '1',
    orderNumber: '000123',
    user: {
      _id: 'u1',
      name: 'Иванов Иван Иванович',
      email: 'ivanov@example.com'
    },
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
      country: 'Россия',
      phone: '+7 (900) 123-45-67'
    },
    paymentMethod: 'card',
    paymentResult: {
      id: 'pi_123456',
      status: 'succeeded',
      update_time: '2023-05-15T12:00:00Z',
      email_address: 'ivanov@example.com'
    },
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
    user: {
      _id: 'u2',
      name: 'Петров Петр Петрович',
      email: 'petrov@example.com'
    },
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
      country: 'Россия',
      phone: '+7 (900) 234-56-78'
    },
    paymentMethod: 'card',
    paymentResult: {
      id: 'pi_234567',
      status: 'succeeded',
      update_time: '2023-06-01T15:30:00Z',
      email_address: 'petrov@example.com'
    },
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
    user: {
      _id: 'u3',
      name: 'Сидоров Алексей Петрович',
      email: 'sidorov@example.com'
    },
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
      country: 'Россия',
      phone: '+7 (900) 345-67-89'
    },
    paymentMethod: 'card',
    totalPrice: 31800,
    isPaid: false,
    isDelivered: false,
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    orderNumber: '000126',
    user: {
      _id: 'u4',
      name: 'Козлова Мария Ивановна',
      email: 'kozlova@example.com'
    },
    orderItems: [
      {
        product: {
          _id: 'p5',
          name: 'АИР90L4 2.2кВт 1500об/мин',
          price: 7350
        },
        quantity: 3
      }
    ],
    shippingAddress: {
      address: 'ул. Кирова, 15',
      city: 'Казань',
      postalCode: '420000',
      country: 'Россия',
      phone: '+7 (900) 456-78-90'
    },
    paymentMethod: 'card',
    paymentResult: {
      id: 'pi_345678',
      status: 'succeeded',
      update_time: '2023-06-05T09:15:00Z',
      email_address: 'kozlova@example.com'
    },
    totalPrice: 22050,
    isPaid: true,
    paidAt: new Date('2023-06-05'),
    isDelivered: false,
    status: 'processing',
    createdAt: new Date('2023-06-04').toISOString()
  },
  {
    _id: '5',
    orderNumber: '000127',
    user: {
      _id: 'u5',
      name: 'Смирнов Андрей Сергеевич',
      email: 'smirnov@example.com'
    },
    orderItems: [
      {
        product: {
          _id: 'p1',
          name: 'АИР80А2 1.5кВт 3000об/мин',
          price: 5490
        },
        quantity: 1
      },
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
      address: 'ул. Советская, 22',
      city: 'Новосибирск',
      postalCode: '630000',
      country: 'Россия',
      phone: '+7 (900) 567-89-01'
    },
    paymentMethod: 'card',
    totalPrice: 15380,
    isPaid: false,
    isDelivered: false,
    status: 'cancelled',
    createdAt: new Date('2023-06-02').toISOString()
  }
];

const AdminOrders: React.FC = () => {
  // Состояния
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Состояния для модальных окон
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<Order['status']>('pending');
  const [statusNote, setStatusNote] = useState('');
  
  // Состояние для уведомлений
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  
  // Загрузка данных
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Имитация API-запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Обработчики пагинации
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Обработчики модальных окон
  const handleOpenDetailsDialog = (order: Order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };
  
  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };
  
  const handleOpenStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusNote('');
    setOpenStatusDialog(true);
  };
  
  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };
  
  const handleOpenDeleteDialog = (order: Order) => {
    setSelectedOrder(order);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  // Обработчик изменения статуса заказа
  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    
    setLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновление статуса заказа
      setOrders(prev => 
        prev.map(order => 
          order._id === selectedOrder._id 
            ? { 
                ...order, 
                status: newStatus,
                isDelivered: newStatus === 'delivered' ? true : order.isDelivered,
                deliveredAt: newStatus === 'delivered' ? new Date() : order.deliveredAt
              } 
            : order
        )
      );
      
      setSnackbar({
        open: true,
        message: 'Статус заказа успешно обновлен',
        severity: 'success',
      });
      
      handleCloseStatusDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при обновлении статуса заказа',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Обработчик удаления заказа
  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;
    
    setLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Удаление заказа
      setOrders(prev => prev.filter(order => order._id !== selectedOrder._id));
      
      setSnackbar({
        open: true,
        message: 'Заказ успешно удален',
        severity: 'success',
      });
      
      handleCloseDeleteDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при удалении заказа',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Закрытие уведомления
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  
  // Получение чипа статуса заказа
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
      return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: ru });
    } catch (e) {
      return 'Неизвестная дата';
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Управление заказами
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 2, mb: 3 }}>
        {loading && !orders.length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>№ заказа</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Клиент</TableCell>
                    <TableCell>Сумма</TableCell>
                    <TableCell>Статус оплаты</TableCell>
                    <TableCell>Статус заказа</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow key={order._id} hover>
                        <TableCell>#{order.orderNumber}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>{order.user.name}</TableCell>
                        <TableCell>{order.totalPrice.toLocaleString()} ₽</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.isPaid ? 'Оплачен' : 'Не оплачен'} 
                            color={order.isPaid ? 'success' : 'warning'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>{getStatusChip(order.status)}</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            color="primary"
                            onClick={() => handleOpenDetailsDialog(order)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton 
                            color="error"
                            onClick={() => handleOpenDeleteDialog(order)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Строк на странице"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
            />
          </>
        )}
      </Paper>
      
      {/* Модальное окно с деталями заказа */}
      {selectedOrder && (
        <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            Детали заказа №{selectedOrder.orderNumber}
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Общая информация
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="body1">
                  <strong>Дата создания:</strong> {formatDate(selectedOrder.createdAt)}
                </Typography>
                <Typography variant="body1">
                  <strong>Статус:</strong> {getStatusChip(selectedOrder.status)}
                </Typography>
                <Typography variant="body1">
                  <strong>Оплата:</strong> {selectedOrder.isPaid ? `Оплачен ${selectedOrder.paidAt && formatDate(selectedOrder.paidAt.toString())}` : 'Не оплачен'}
                </Typography>
                <Typography variant="body1">
                  <strong>Доставка:</strong> {selectedOrder.isDelivered ? `Доставлен ${selectedOrder.deliveredAt && formatDate(selectedOrder.deliveredAt.toString())}` : 'Не доставлен'}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Информация о клиенте
              </Typography>
              <Typography variant="body1">
                <strong>Имя:</strong> {selectedOrder.user.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedOrder.user.email}
              </Typography>
              <Typography variant="body1">
                <strong>Телефон:</strong> {selectedOrder.shippingAddress.phone}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Адрес доставки
              </Typography>
              <Typography variant="body1">
                {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Товары
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Товар</TableCell>
                      <TableCell align="right">Цена</TableCell>
                      <TableCell align="right">Кол-во</TableCell>
                      <TableCell align="right">Сумма</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell align="right">{item.product.price.toLocaleString()} ₽</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {(item.product.price * item.quantity).toLocaleString()} ₽
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}><strong>Итого</strong></TableCell>
                      <TableCell align="right"><strong>{selectedOrder.totalPrice.toLocaleString()} ₽</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => {
                handleCloseDetailsDialog();
                handleOpenStatusDialog(selectedOrder);
              }} 
              color="primary"
            >
              Изменить статус
            </Button>
            <Button onClick={handleCloseDetailsDialog} color="inherit">
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
      {/* Модальное окно изменения статуса */}
      {selectedOrder && (
        <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
          <DialogTitle>
            Изменение статуса заказа №{selectedOrder.orderNumber}
          </DialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Статус заказа</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                label="Статус заказа"
              >
                <MenuItem value="pending">Ожидает оплаты</MenuItem>
                <MenuItem value="processing">Обрабатывается</MenuItem>
                <MenuItem value="shipped">Отправлен</MenuItem>
                <MenuItem value="delivered">Доставлен</MenuItem>
                <MenuItem value="cancelled">Отменен</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Примечание (необязательно)"
              multiline
              rows={3}
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStatusDialog} color="inherit">
              Отмена
            </Button>
            <Button 
              onClick={handleUpdateStatus} 
              variant="contained" 
              color="primary"
              disabled={loading || newStatus === selectedOrder.status}
            >
              {loading ? <CircularProgress size={24} /> : 'Сохранить'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
      {/* Модальное окно подтверждения удаления */}
      {selectedOrder && (
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogContent>
            <Typography>
              Вы действительно хотите удалить заказ №{selectedOrder.orderNumber}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="inherit">
              Отмена
            </Button>
            <Button 
              onClick={handleDeleteOrder} 
              variant="contained" 
              color="error"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Удалить'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
      {/* Уведомление */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminOrders; 