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
  Rating,
  Chip,
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
      id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.images[0] || '/placeholder.jpg',
    });
  };

  const isNew = () => {
    const productDate = new Date(product.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return productDate >= thirtyDaysAgo;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/product/${product._id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            sx={{ objectFit: 'contain', bgcolor: '#f5f5f5', p: 2 }}
          />
          {isNew() && (
            <Chip
              label="Новинка"
              color="secondary"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontWeight: 'bold',
              }}
            />
          )}
          {product.stock <= 0 && (
            <Chip
              label="Нет в наличии"
              color="error"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: isNew() ? 88 : 8,
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews.length})
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Мощность: {product.power} л.с.
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Производитель: {product.manufacturer}
          </Typography>
          
          <Box sx={{ mt: 'auto' }}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              {product.price.toLocaleString()} ₽
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <CardActions>
        <Button
          size="small"
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          fullWidth
          disabled={product.stock <= 0}
          sx={{
            bgcolor: 'secondary.main',
            '&:hover': {
              bgcolor: 'secondary.dark',
            },
          }}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 