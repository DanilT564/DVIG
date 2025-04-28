import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
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
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

import ProductGrid from '../components/products/ProductGrid';
import ProductFilter from '../components/products/ProductFilter';
import { motorService } from '../services/api';

const CatalogPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Параметры фильтров из URL
  const categoryParam = queryParams.get('category') || '';
  const manufacturerParam = queryParams.get('manufacturer') || '';
  const searchQuery = queryParams.get('search') || '';
  const minPriceParam = parseInt(queryParams.get('minPrice') || '0');
  const maxPriceParam = parseInt(queryParams.get('maxPrice') || '1000000');
  const minPowerParam = parseInt(queryParams.get('minPower') || '0');
  const maxPowerParam = parseInt(queryParams.get('maxPower') || '1000');
  const sortParam = queryParams.get('sort') || 'price_asc';
  const pageParam = parseInt(queryParams.get('page') || '1');

  // Состояние для фильтров
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [sortBy, setSortBy] = useState(sortParam);
  
  // Запрос категорий
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery(
    'categories',
    motorService.getMotorCategories
  );

  // Запрос производителей
  const { data: manufacturersData, isLoading: manufacturersLoading } = useQuery(
    'manufacturers',
    motorService.getMotorManufacturers
  );

  // Формирование параметров запроса моторов
  const getQueryVariables = () => {
    return {
      page: currentPage,
      keyword: searchQuery || undefined,
      category: categoryParam || undefined,
      manufacturer: manufacturerParam || undefined,
      minPrice: minPriceParam || undefined,
      maxPrice: maxPriceParam !== 1000000 ? maxPriceParam : undefined,
      minPower: minPowerParam || undefined,
      maxPower: maxPowerParam !== 1000 ? maxPowerParam : undefined,
      sortBy: sortBy
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
    
    if (categoryParam) params.set('category', categoryParam);
    if (manufacturerParam) params.set('manufacturer', manufacturerParam);
    if (searchQuery) params.set('search', searchQuery);
    if (minPriceParam > 0) params.set('minPrice', minPriceParam.toString());
    if (maxPriceParam < 1000000) params.set('maxPrice', maxPriceParam.toString());
    if (minPowerParam > 0) params.set('minPower', minPowerParam.toString());
    if (maxPowerParam < 1000) params.set('maxPower', maxPowerParam.toString());
    params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    navigate(`/catalog?${params.toString()}`, { replace: true });
  }, [
    categoryParam,
    manufacturerParam,
    minPriceParam,
    maxPriceParam,
    minPowerParam,
    maxPowerParam,
    sortBy,
    currentPage,
    searchQuery,
  ]);

  // Обработчик изменения сортировки
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Сброс на первую страницу при изменении сортировки
  };

  // Обработчик применения фильтров
  const handleFilterChange = (filters: any) => {
    const params = new URLSearchParams(location.search);
    
    // Обновление параметров фильтрации
    if (filters.categories.length > 0) {
      params.set('category', filters.categories[0]);
    } else {
      params.delete('category');
    }
    
    if (filters.manufacturers.length > 0) {
      params.set('manufacturer', filters.manufacturers[0]);
    } else {
      params.delete('manufacturer');
    }
    
    params.set('minPrice', filters.priceRange[0].toString());
    params.set('maxPrice', filters.priceRange[1].toString());
    params.set('minPower', filters.power[0].toString());
    params.set('maxPower', filters.power[1].toString());
    
    // Сброс на первую страницу
    params.delete('page');
    setCurrentPage(1);
    
    navigate(`/catalog?${params.toString()}`);
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
        sx={{ mb: 3 }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Typography color="text.primary">Каталог</Typography>
        {categoryParam && !categoriesLoading && categoriesData && (
          <Typography color="text.primary">
            {categoriesData.find((cat: any) => cat._id === categoryParam)?.name || 'Категория'}
          </Typography>
        )}
      </Breadcrumbs>

      {/* Заголовок и сортировка */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {searchQuery
            ? `Результаты поиска: ${searchQuery}`
            : categoryParam && !categoriesLoading && categoriesData
              ? categoriesData.find((cat: any) => cat._id === categoryParam)?.name || 'Каталог моторов'
              : 'Каталог моторов'}
        </Typography>

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

      {/* Фильтры и товары */}
      <Grid container spacing={3}>
        {/* Фильтры */}
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <ProductFilter
              minPrice={0}
              maxPrice={1000000}
              minPower={0}
              maxPower={1000}
              categories={categoriesLoading ? [] : (categoriesData || [])}
              manufacturers={manufacturersLoading ? [] : (manufacturersData || [])}
              onFilterChange={handleFilterChange}
              initialValues={{
                priceRange: [minPriceParam, maxPriceParam],
                power: [minPowerParam, maxPowerParam],
                categories: categoryParam ? [categoryParam] : [],
                manufacturers: manufacturerParam ? [manufacturerParam] : [],
                sortBy: sortBy,
              }}
            />
          </Paper>
        </Grid>

        {/* Товары */}
        <Grid item xs={12} md={9}>
          <ProductGrid
            products={motorsLoading ? [] : (motorsData?.motors || [])}
            loading={motorsLoading}
            error={motorsError}
            totalPages={motorsData?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CatalogPage; 