import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  Drawer,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface FilterValues {
  priceRange: [number, number];
  categories: string[];
  manufacturers: string[];
  power: [number, number];
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
  minPrice: number;
  maxPrice: number;
  minPower: number;
  maxPower: number;
  categories: Category[];
  manufacturers: Manufacturer[];
  onFilterChange: (filters: FilterValues) => void;
  initialValues?: Partial<FilterValues>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  minPrice,
  maxPrice,
  minPower,
  maxPower,
  categories,
  manufacturers,
  onFilterChange,
  initialValues,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialValues?.priceRange?.[0] ?? minPrice,
    initialValues?.priceRange?.[1] ?? maxPrice,
  ]);
  const [powerRange, setPowerRange] = useState<[number, number]>([
    initialValues?.power?.[0] ?? minPower,
    initialValues?.power?.[1] ?? maxPower,
  ]);
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
      if (initialValues.priceRange) {
        setPriceRange(initialValues.priceRange);
      }
      if (initialValues.power) {
        setPowerRange(initialValues.power);
      }
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

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handlePowerChange = (event: Event, newValue: number | number[]) => {
    setPowerRange(newValue as [number, number]);
  };

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
      priceRange,
      categories: selectedCategories,
      manufacturers: selectedManufacturers,
      power: powerRange,
      sortBy,
    });
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleResetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setPowerRange([minPower, maxPower]);
    setSelectedCategories([]);
    setSelectedManufacturers([]);
    setSortBy('price_asc');
    
    onFilterChange({
      priceRange: [minPrice, maxPrice],
      categories: [],
      manufacturers: [],
      power: [minPower, maxPower],
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
          <Typography>Цена (₽)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value.toLocaleString()} ₽`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <TextField
                label="От"
                size="small"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= minPrice) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
                InputProps={{
                  endAdornment: <Typography variant="caption">₽</Typography>,
                }}
                sx={{ width: '45%' }}
              />
              <TextField
                label="До"
                size="small"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value <= maxPrice) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                InputProps={{
                  endAdornment: <Typography variant="caption">₽</Typography>,
                }}
                sx={{ width: '45%' }}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Мощность (л.с.)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Slider
              value={powerRange}
              min={minPower}
              max={maxPower}
              onChange={handlePowerChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} л.с.`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <TextField
                label="От"
                size="small"
                value={powerRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= minPower) {
                    setPowerRange([value, powerRange[1]]);
                  }
                }}
                InputProps={{
                  endAdornment: <Typography variant="caption">л.с.</Typography>,
                }}
                sx={{ width: '45%' }}
              />
              <TextField
                label="До"
                size="small"
                value={powerRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value <= maxPower) {
                    setPowerRange([powerRange[0], value]);
                  }
                }}
                InputProps={{
                  endAdornment: <Typography variant="caption">л.с.</Typography>,
                }}
                sx={{ width: '45%' }}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Категории</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categories.map((category) => (
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
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Производители</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {manufacturers.map((manufacturer) => (
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
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilters}
          fullWidth
        >
          Применить
        </Button>
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          fullWidth
        >
          Сбросить
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={toggleDrawer(true)}
            >
              Фильтры
            </Button>
          </Box>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={toggleDrawer(false)}
          >
            <Box sx={{ width: 300 }}>{filterContent}</Box>
          </Drawer>
        </>
      ) : (
        <Box>{filterContent}</Box>
      )}
    </>
  );
};

export default ProductFilter; 