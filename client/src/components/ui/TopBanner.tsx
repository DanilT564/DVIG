import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const TopBanner: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ mb: { xs: 1, md: 0 } }}>
            <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 0.5 }}>
              Готовы подобрать идеальный двигатель?
            </Typography>
            <Typography variant="body2">
              Наши специалисты помогут вам выбрать оптимальный двигатель под ваши задачи.
              Широкий выбор, профессиональная консультация и быстрая доставка!
            </Typography>
          </Box>
          <Button 
            component={RouterLink}
            to="/catalog"
            variant="contained" 
            color="secondary" 
            size="medium"
            sx={{ 
              px: 3, 
              py: 1, 
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            Перейти в каталог
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopBanner; 