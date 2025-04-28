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
  TextField,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
  Snackbar,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Типы для пользователей
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  orders?: number;
}

// Моковые данные для тестирования
const mockUsers: User[] = [
  {
    _id: '1',
    name: 'Иванов Иван Иванович',
    email: 'ivanov@example.com',
    isAdmin: true,
    createdAt: new Date('2023-01-15').toISOString(),
    orders: 5
  },
  {
    _id: '2',
    name: 'Петров Петр Петрович',
    email: 'petrov@example.com',
    isAdmin: false,
    createdAt: new Date('2023-02-20').toISOString(),
    orders: 3
  },
  {
    _id: '3',
    name: 'Сидоров Алексей Петрович',
    email: 'sidorov@example.com',
    isAdmin: false,
    createdAt: new Date('2023-03-10').toISOString(),
    orders: 2
  },
  {
    _id: '4',
    name: 'Козлова Мария Ивановна',
    email: 'kozlova@example.com',
    isAdmin: false,
    createdAt: new Date('2023-04-05').toISOString(),
    orders: 7
  },
  {
    _id: '5',
    name: 'Смирнов Андрей Сергеевич',
    email: 'smirnov@example.com',
    isAdmin: false,
    createdAt: new Date('2023-05-15').toISOString(),
    orders: 1
  },
  {
    _id: '6',
    name: 'Новикова Елена Александровна',
    email: 'novikova@example.com',
    isAdmin: false,
    createdAt: new Date('2023-05-25').toISOString(),
    orders: 0
  }
];

const AdminUsers: React.FC = () => {
  // Состояния
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  
  // Состояния для модальных окон
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  // Состояния для редактирования пользователя
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editIsAdmin, setEditIsAdmin] = useState(false);
  
  // Состояние для уведомлений
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  
  // Загрузка данных
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Имитация API-запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Фильтрация по поиску
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  
  // Обработчики пагинации
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Обработчики модальных окон
  const handleOpenEditDialog = (user: User) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditIsAdmin(user.isAdmin);
    setOpenEditDialog(true);
  };
  
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  
  const handleOpenDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  // Обработчик обновления пользователя
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновление пользователя
      setUsers(prev => 
        prev.map(user => 
          user._id === selectedUser._id 
            ? { ...user, name: editName, email: editEmail, isAdmin: editIsAdmin } 
            : user
        )
      );
      
      setSnackbar({
        open: true,
        message: 'Пользователь успешно обновлен',
        severity: 'success',
      });
      
      handleCloseEditDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при обновлении пользователя',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Обработчик удаления пользователя
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Удаление пользователя
      setUsers(prev => prev.filter(user => user._id !== selectedUser._id));
      
      setSnackbar({
        open: true,
        message: 'Пользователь успешно удален',
        severity: 'success',
      });
      
      handleCloseDeleteDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при удалении пользователя',
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
  
  // Форматирование даты
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
    } catch (e) {
      return 'Неизвестная дата';
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Управление пользователями
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по имени или email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        {loading && !users.length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Имя</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Дата регистрации</TableCell>
                    <TableCell>Роль</TableCell>
                    <TableCell>Заказы</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow key={user._id} hover>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.isAdmin ? 'Администратор' : 'Пользователь'} 
                            color={user.isAdmin ? 'primary' : 'default'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            color="primary"
                            onClick={() => handleOpenEditDialog(user)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error"
                            onClick={() => handleOpenDeleteDialog(user)}
                            disabled={user.isAdmin}
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
              count={filteredUsers.length}
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
      
      {/* Модальное окно редактирования пользователя */}
      {selectedUser && (
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>
            Редактирование пользователя
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              fullWidth
              label="Имя"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              margin="normal"
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={editIsAdmin}
                  onChange={(e) => setEditIsAdmin(e.target.checked)}
                  color="primary"
                />
              }
              label="Администратор"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="inherit">
              Отмена
            </Button>
            <Button 
              onClick={handleUpdateUser} 
              variant="contained" 
              color="primary"
              disabled={loading || !editName || !editEmail}
            >
              {loading ? <CircularProgress size={24} /> : 'Сохранить'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
      {/* Модальное окно подтверждения удаления */}
      {selectedUser && (
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogContent>
            <Typography>
              Вы действительно хотите удалить пользователя "{selectedUser.name}"?
            </Typography>
            {selectedUser.orders && selectedUser.orders > 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                У пользователя есть {selectedUser.orders} заказов. При удалении пользователя заказы останутся в системе.
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="inherit">
              Отмена
            </Button>
            <Button 
              onClick={handleDeleteUser} 
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

export default AdminUsers; 