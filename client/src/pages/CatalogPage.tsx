import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useMediaQuery,
  Tab,
  Tabs,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

import ProductGrid from '../components/products/ProductGrid';
import { motorService } from '../services/api';

const CatalogPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Параметры фильтров из URL
  const searchQuery = queryParams.get('search') || '';
  const sortParam = queryParams.get('sort') || 'price_asc';
  const pageParam = parseInt(queryParams.get('page') || '1');
  const typeParam = queryParams.get('type') || 'all';

  // Состояние для фильтров
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [motorType, setMotorType] = useState(typeParam);
  
  // Формирование параметров запроса моторов
  const getQueryVariables = () => {
    return {
      page: currentPage,
      keyword: searchQuery || undefined,
      sortBy: sortBy,
      type: motorType !== 'all' ? motorType : undefined
    };
  };

  // Запрос моторов
  const {
    data: motorsData,
    isLoading: motorsLoading,
    error: motorsError,
    refetch: refetchMotors,
  } = useQuery(['motors', getQueryVariables()], () => 
    motorService.getAllMotors(getQueryVariables())
  );

  // Обновление URL при изменении фильтров
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (motorType !== 'all') params.set('type', motorType);
    
    navigate(`/catalog?${params.toString()}`, { replace: true });
  }, [
    sortBy,
    currentPage,
    searchQuery,
    motorType,
  ]);

  // Обработчик изменения сортировки
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Сброс на первую страницу при изменении сортировки
  };

  // Обработчик изменения типа мотора
  const handleMotorTypeChange = (event: React.SyntheticEvent, newValue: string) => {
    setMotorType(newValue);
    setCurrentPage(1); // Сброс на первую страницу при изменении типа
  };

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="xl">
      {/* Хлебные крошки */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ my: 2 }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Typography color="text.primary">Каталог</Typography>
      </Breadcrumbs>

      {/* Заголовок */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        {searchQuery
          ? `Результаты поиска: ${searchQuery}`
          : 'Каталог двигателей'}
      </Typography>

      {/* Табы для типов двигателей */}
      <Box sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={motorType}
          onChange={handleMotorTypeChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="motor types tabs"
          sx={{ mb: 2 }}
        >
          <Tab value="all" label="Все двигатели" />
          <Tab value="refurbished" label="Восстановленные двигатели" />
          <Tab value="new" label="Новые двигатели" />
          <Tab value="used" label="Контрактные двигатели" />
        </Tabs>
        <Divider />
      </Box>

      {/* Сортировка и товары */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Сортировка</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Сортировка">
              <MenuItem value="price_asc">Сначала дешевле</MenuItem>
              <MenuItem value="price_desc">Сначала дороже</MenuItem>
              <MenuItem value="rating_desc">По рейтингу</MenuItem>
              <MenuItem value="createdAt_desc">Сначала новые</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Товары */}
        <ProductGrid
          products={motorsLoading ? [] : (motorsData?.motors || [])}
          loading={motorsLoading}
          error={motorsError}
          totalPages={motorsData?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Информационный блок */}
      {motorType === 'refurbished' && (
        <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">О восстановленных двигателях</Typography>
          <Typography variant="body1" paragraph>
            Восстановленные двигатели проходят полный цикл капитального ремонта с заменой всех изношенных деталей. 
            Мы предоставляем гарантию на все восстановленные моторы.
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight="bold">Преимущества восстановленных двигателей:</Typography>
          <ul>
            <li>Экономия до 50% по сравнению с новыми</li>
            <li>Гарантия 12 месяцев</li>
            <li>Полная диагностика и тестирование</li>
            <li>Замена всех изношенных компонентов</li>
          </ul>
        </Paper>
      )}
    </Container>
  );
};

export default CatalogPage; 