import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useCart } from '../../hooks/useCart';
import { Motor } from '../../services/api';

interface ProductCardProps {
  product: Motor;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      _id: product._id,
      name: product.name,
      image: product.images[0] || '/placeholder.jpg',
      price: product.price,
      countInStock: product.countInStock
    }, 1);
  };

  const isNew = () => {
    const productDate = new Date(product.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return productDate >= thirtyDaysAgo;
  };

  // Определение типа двигателя для отметки
  const getMotorType = () => {
    if (product.isRefurbished) return 'Восстановленный';
    if (product.isNew) return 'Новый';
    return 'Контрактный';
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
        overflow: 'visible',
        position: 'relative',
      }}
    >
      {/* Метка типа двигателя в верхнем левом углу */}
      <Chip
        label={getMotorType()}
        color={product.isRefurbished ? "secondary" : product.isNew ? "primary" : "default"}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 1,
          fontWeight: 'bold',
        }}
      />

      <CardActionArea
        component={RouterLink}
        to={`/product/${product._id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            sx={{ objectFit: 'contain', bgcolor: '#f8f8f8', p: 2 }}
          />
          
          {/* В наличии/нет в наличии */}
          <Chip
            label={product.countInStock > 0 ? "В наличии" : "Нет в наличии"}
            color={product.countInStock > 0 ? "success" : "error"}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontWeight: 'bold',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              mb: 1, 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              height: '2.8rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.name}
          </Typography>
          
          <Divider sx={{ my: 1 }} />
          
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Марка:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {product.manufacturer}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Модель:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {product.model || 'Все модели'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Объем:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {product.volume ? `${product.volume} л` : '-'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Мощность:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {product.power} л.с.
              </Typography>
            </Box>
          </Stack>
          
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Typography 
              variant="h6" 
              color="primary.main" 
              fontWeight="bold"
              sx={{ fontSize: '1.25rem' }}
            >
              {product.price.toLocaleString()} ₽
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          fullWidth
          disabled={product.countInStock <= 0}
          sx={{
            fontWeight: 'medium',
          }}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 