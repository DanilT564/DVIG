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
          <Typography variant="h5" gutterBottom fontWeight="bold">Собственная сборка двигателей ЗМЗ/УМЗ</Typography>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Коммерческое предложение по восстановленным двигателям для организаций с автопарком ГАЗ/УАЗ.
          </Typography>
          <Typography variant="body2" paragraph>
            000 "СПЕКТР"<br />
            ОГРН: 1217400012840<br />
            ИНН/КПП:7456047921/745601001<br />
            Фактический адрес: Московская область, г. Подольск, Проезд авиаторов 12с2
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight="bold">О КОМПАНИИ</Typography>
          <Typography variant="body1" paragraph>
            — Мы узконаправленная организация, которая работает в нише «Обслуживания коммерческого 
            транспорта» предлагая ассортимент восстановленных ЗМЗ/УМЗ двигателей.<br />
            — С 2017 года мы успешно занимаемся восстановлением и сборкой двигателей, обретая 
            репутацию надежного партнера в отрасли. В 2024 году 366 клиентов убедились в этом.
          </Typography>
          
          <Typography variant="body1" paragraph>
            ООО «Спектр» — это надежный партнер для всех, кто ценит качество, прозрачность и 
            индивидуальный подход в обслуживании своих автомобилей. Мы всегда готовы предложить 
            лучшие решения для наших клиентов!
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight="bold">Преимущества сотрудничества:</Typography>
          <ul>
            <li><strong>ГИБКИЕ ВАРИАНТЫ</strong> - Сдайте старый - получите восстановленный.</li>
            <li><strong>СОКРАЩЕНИЕ ВРЕМЕНИ</strong> - Избегайте простоя, двигателя всегда в наличие.</li>
            <li><strong>ПОД КЛЮЧ</strong> - Через 24 часа автомобиль уже будет в строю.</li>
          </ul>

          <Typography variant="h6" gutterBottom fontWeight="bold">Выгоды для вас:</Typography>
          <ul>
            <li><strong>УДОБСТВО</strong> - Мы - ваш цех по обслуживанию моторов</li>
            <li><strong>ЭКОНОМИЯ ВРЕМЕНИ</strong> - Сокращаем время простоя автомобиля</li>
            <li><strong>НАДЕЖНОСТЬ</strong> - Предоставляем гарантию на двигатели</li>
          </ul>
        </Paper>
      )}
    </Container>
  );
};

export default CatalogPage; 