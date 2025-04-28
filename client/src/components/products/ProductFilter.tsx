import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface FilterValues {
  categories: string[];
  manufacturers: string[];
  sortBy: string;
}

interface Category {
  _id: string;
  name: string;
  count: number;
}

interface Manufacturer {
  _id: string;
  name: string;
  count: number;
}

interface ProductFilterProps {
  categories: Category[];
  manufacturers: Manufacturer[];
  onFilterChange: (filters: FilterValues) => void;
  initialValues?: Partial<FilterValues>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  manufacturers,
  onFilterChange,
  initialValues,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialValues?.categories ?? []
  );
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    initialValues?.manufacturers ?? []
  );
  const [sortBy, setSortBy] = useState<string>(initialValues?.sortBy ?? 'price_asc');

  // Обновление фильтров при изменении начальных значений
  useEffect(() => {
    if (initialValues) {
      if (initialValues.categories) {
        setSelectedCategories(initialValues.categories);
      }
      if (initialValues.manufacturers) {
        setSelectedManufacturers(initialValues.manufacturers);
      }
      if (initialValues.sortBy) {
        setSortBy(initialValues.sortBy);
      }
    }
  }, [initialValues]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleManufacturerChange = (manufacturerId: string) => {
    setSelectedManufacturers((prev) => {
      if (prev.includes(manufacturerId)) {
        return prev.filter((id) => id !== manufacturerId);
      } else {
        return [...prev, manufacturerId];
      }
    });
  };

  const handleApplyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      manufacturers: selectedManufacturers,
      sortBy,
    });
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedManufacturers([]);
    setSortBy('price_asc');
    
    onFilterChange({
      categories: [],
      manufacturers: [],
      sortBy: 'price_asc',
    });
  };

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  const filterContent = (
    <Box sx={{ p: { xs: 2, md: 0 } }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Фильтры</Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Категории</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categories.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Категории загружаются...
              </Typography>
            ) : (
              categories.map((category) => (
                <FormControlLabel
                  key={category._id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                  }
                  label={`${category.name} (${category.count})`}
                />
              ))
            )}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Производители</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {manufacturers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Производители загружаются...
              </Typography>
            ) : (
              manufacturers.map((manufacturer) => (
                <FormControlLabel
                  key={manufacturer._id}
                  control={
                    <Checkbox
                      checked={selectedManufacturers.includes(manufacturer._id)}
                      onChange={() => handleManufacturerChange(manufacturer._id)}
                    />
                  }
                  label={`${manufacturer.name} (${manufacturer.count})`}
                />
              ))
            )}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleApplyFilters}
          sx={{ flex: 1, mr: 1 }}
        >
          Применить
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleResetFilters}
          sx={{ flex: 1, ml: 1 }}
        >
          Сбросить
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Кнопка открытия фильтров на мобильных устройствах */}
      {isMobile && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={toggleDrawer(true)}
            fullWidth
          >
            Фильтры
          </Button>
          <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 280 }}>{filterContent}</Box>
          </Drawer>
        </Box>
      )}

      {/* Фильтры для десктопа */}
      {!isMobile && filterContent}
    </>
  );
};

export default ProductFilter; 