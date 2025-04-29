import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import CartProvider from './contexts/CartContext';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

// Protected route component
interface ProtectedRouteProps {
  element: React.ReactNode;
  adminRequired?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, adminRequired = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  // Check for admin directly from localStorage
  const localIsAdmin = localStorage.getItem('isAdmin') === 'true';

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>Loading...</Box>;
  }

  if (!isAuthenticated && !localIsAdmin) {
    return <Navigate to="/login" />;
  }

  if (adminRequired && !isAdmin && !localIsAdmin) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected user routes */}
        <Route path="checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
        <Route path="profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="orders" element={<ProtectedRoute element={<OrdersPage />} />} />
      </Route>
      
      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute element={<AdminLayout />} adminRequired={true} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
      
      {/* Not found page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App; 