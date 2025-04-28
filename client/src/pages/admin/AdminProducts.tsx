import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
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
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Chip,
  Alert,
  Snackbar,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';

// Типы данных
interface Motor {
  _id: string;
  name: string;
  manufacturer: string;
  model: string;
  power: number;
  voltage: number;
  price: number;
  countInStock: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  isActive: boolean;
}

const defaultMotor: Motor = {
  _id: '',
  name: '',
  manufacturer: '',
  model: '',
  power: 0,
  voltage: 0,
  price: 0,
  countInStock: 0,
  image: '',
  category: '',
  description: '',
  features: [],
  isActive: true,
};

// Моковые данные для тестирования
const mockMotors: Motor[] = [
  {
    _id: '1',
    name: 'АИР80А2 1.5кВт 3000об/мин',
    manufacturer: 'Элдин',
    model: 'АИР80А2',
    power: 1.5,
    voltage: 380,
    price: 5490,
    countInStock: 15,
    image: '/images/motors/air80a2.jpg',
    category: 'Асинхронные',
    description: 'Трехфазный асинхронный электродвигатель общепромышленного назначения',
    features: ['IP54', 'F класс изоляции', 'чугунный корпус'],
    isActive: true,
  },
  {
    _id: '2',
    name: 'АИР100S4 3кВт 1500об/мин',
    manufacturer: 'ВЭМЗ',
    model: 'АИР100S4',
    power: 3,
    voltage: 380,
    price: 9890,
    countInStock: 8,
    image: '/images/motors/air100s4.jpg',
    category: 'Асинхронные',
    description: 'Трехфазный асинхронный электродвигатель для промышленного применения',
    features: ['IP54', 'F класс изоляции', 'алюминиевый корпус'],
    isActive: true,
  },
  {
    _id: '3',
    name: 'АИР132М4 11кВт 1500об/мин',
    manufacturer: 'Элдин',
    model: 'АИР132М4',
    power: 11,
    voltage: 380,
    price: 25400,
    countInStock: 4,
    image: '/images/motors/air132m4.jpg',
    category: 'Асинхронные',
    description: 'Мощный трехфазный асинхронный электродвигатель',
    features: ['IP54', 'F класс изоляции', 'чугунный корпус'],
    isActive: true,
  },
  {
    _id: '4',
    name: 'АИР56В4 0.18кВт 1500об/мин',
    manufacturer: 'ВЭМЗ',
    model: 'АИР56В4',
    power: 0.18,
    voltage: 220,
    price: 3200,
    countInStock: 22,
    image: '/images/motors/air56b4.jpg',
    category: 'Асинхронные',
    description: 'Компактный асинхронный электродвигатель для небольших нагрузок',
    features: ['IP44', 'B класс изоляции', 'алюминиевый корпус'],
    isActive: true,
  },
  {
    _id: '5',
    name: 'АИР90L4 2.2кВт 1500об/мин',
    manufacturer: 'Элдин',
    model: 'АИР90L4',
    power: 2.2,
    voltage: 380,
    price: 7350,
    countInStock: 10,
    image: '/images/motors/air90l4.jpg',
    category: 'Асинхронные',
    description: 'Трехфазный асинхронный электродвигатель средней мощности',
    features: ['IP54', 'F класс изоляции', 'чугунный корпус'],
    isActive: true,
  },
];

const AdminProducts: React.FC = () => {
  // Состояния
  const [motors, setMotors] = useState<Motor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  
  // Состояния для модальных окон
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMotor, setSelectedMotor] = useState<Motor>(defaultMotor);
  const [isEditing, setIsEditing] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  // Состояние для уведомлений
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  
  // Загрузка данных
  useEffect(() => {
    const fetchMotors = async () => {
      setLoading(true);
      try {
        // Имитация API-запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMotors(mockMotors);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMotors();
  }, []);
  
  // Фильтрация по поиску
  const filteredMotors = motors.filter(motor => 
    motor.name.toLowerCase().includes(search.toLowerCase()) || 
    motor.model.toLowerCase().includes(search.toLowerCase()) ||
    motor.manufacturer.toLowerCase().includes(search.toLowerCase())
  );
  
  // Обработчики пагинации
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Обработчики модального окна
  const handleOpenDialog = (motor?: Motor) => {
    if (motor) {
      setSelectedMotor(motor);
      setIsEditing(true);
    } else {
      setSelectedMotor(defaultMotor);
      setIsEditing(false);
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFeatureInput('');
  };
  
  // Обработчик ввода данных
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setSelectedMotor(prev => ({
      ...prev,
      [name as string]: value
    }));
  };
  
  // Обработчик добавления характеристики
  const handleAddFeature = () => {
    if (featureInput.trim() !== '') {
      setSelectedMotor(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };
  
  // Обработчик удаления характеристики
  const handleDeleteFeature = (index: number) => {
    setSelectedMotor(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };
  
  // Обработчик сохранения товара
  const handleSaveMotor = async () => {
    setLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing) {
        // Обновление существующего товара
        setMotors(prev => 
          prev.map(motor => motor._id === selectedMotor._id ? selectedMotor : motor)
        );
        setSnackbar({
          open: true,
          message: 'Товар успешно обновлен',
          severity: 'success',
        });
      } else {
        // Добавление нового товара
        const newMotor = {
          ...selectedMotor,
          _id: Date.now().toString(), // Временный ID
        };
        setMotors(prev => [...prev, newMotor]);
        setSnackbar({
          open: true,
          message: 'Товар успешно добавлен',
          severity: 'success',
        });
      }
      
      handleCloseDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при сохранении товара',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Обработчики удаления товара
  const handleOpenDeleteDialog = (motor: Motor) => {
    setSelectedMotor(motor);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const handleDeleteMotor = async () => {
    setLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMotors(prev => prev.filter(motor => motor._id !== selectedMotor._id));
      setSnackbar({
        open: true,
        message: 'Товар успешно удален',
        severity: 'success',
      });
      
      handleCloseDeleteDialog();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при удалении товара',
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
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Управление товарами</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Добавить товар
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по названию, модели или производителю"
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
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Модель</TableCell>
                    <TableCell>Мощность (кВт)</TableCell>
                    <TableCell>Цена (₽)</TableCell>
                    <TableCell>На складе</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMotors
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((motor) => (
                      <TableRow key={motor._id} hover>
                        <TableCell>{motor.name}</TableCell>
                        <TableCell>{motor.model}</TableCell>
                        <TableCell>{motor.power}</TableCell>
                        <TableCell>{motor.price.toLocaleString()}</TableCell>
                        <TableCell>{motor.countInStock}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(motor)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleOpenDeleteDialog(motor)}
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
              count={filteredMotors.length}
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
      
      {/* Модальное окно для добавления/редактирования товара */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Редактирование товара' : 'Добавление нового товара'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Название"
                name="name"
                value={selectedMotor.name}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Модель"
                name="model"
                value={selectedMotor.model}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Производитель"
                name="manufacturer"
                value={selectedMotor.manufacturer}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Категория</InputLabel>
                <Select
                  name="category"
                  value={selectedMotor.category}
                  onChange={(event: SelectChangeEvent) => {
                    const { name, value } = event.target;
                    setSelectedMotor(prev => ({
                      ...prev,
                      [name as string]: value
                    }));
                  }}
                  label="Категория"
                >
                  <MenuItem value="Асинхронные">Асинхронные</MenuItem>
                  <MenuItem value="Синхронные">Синхронные</MenuItem>
                  <MenuItem value="Коллекторные">Коллекторные</MenuItem>
                  <MenuItem value="Постоянного тока">Постоянного тока</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Мощность (кВт)"
                name="power"
                type="number"
                value={selectedMotor.power}
                onChange={handleInputChange}
                margin="normal"
                required
                inputProps={{ step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Напряжение (В)"
                name="voltage"
                type="number"
                value={selectedMotor.voltage}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Количество на складе"
                name="countInStock"
                type="number"
                value={selectedMotor.countInStock}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Цена (₽)"
                name="price"
                type="number"
                value={selectedMotor.price}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="URL изображения"
                name="image"
                value={selectedMotor.image}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Описание"
                name="description"
                value={selectedMotor.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Особенности и характеристики
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Добавить характеристику"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleAddFeature}
                >
                  Добавить
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedMotor.features.map((feature, index) => (
                  <Chip 
                    key={index}
                    label={feature}
                    onDelete={() => handleDeleteFeature(index)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Отмена
          </Button>
          <Button 
            onClick={handleSaveMotor} 
            variant="contained" 
            disabled={loading || !selectedMotor.name || !selectedMotor.model}
          >
            {loading ? <CircularProgress size={24} /> : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Модальное окно подтверждения удаления */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <Typography>
            Вы действительно хотите удалить товар "{selectedMotor.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="inherit">
            Отмена
          </Button>
          <Button 
            onClick={handleDeleteMotor} 
            variant="contained" 
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
      
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

export default AdminProducts; 