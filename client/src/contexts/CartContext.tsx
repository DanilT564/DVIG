import React, { createContext, useContext, useState, useEffect } from 'react';

// Типы для товаров в корзине
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
      }
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Пересчитываем общую сумму и количество товаров
    const newTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setTotal(newTotal);
    setTotalItems(newTotalItems);
  }, [cart]);

  // Добавление товара в корзину
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = prevCart.findIndex(item => item.product._id === product._id);
      
      if (existingItemIndex !== -1) {
        // Товар уже есть в корзине, обновляем количество
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingItemIndex].quantity + quantity;
        
        // Проверяем, не превышает ли новое количество доступное на складе
        updatedCart[existingItemIndex].quantity = Math.min(newQuantity, product.countInStock);
        
        return updatedCart;
      } else {
        // Товара нет в корзине, добавляем новый
        return [...prevCart, { product, quantity: Math.min(quantity, product.countInStock) }];
      }
    });
  };

  // Удаление товара из корзины
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
  };

  // Обновление количества товара в корзине
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product._id === productId) {
          // Проверяем, не превышает ли новое количество доступное на складе
          const newQuantity = Math.min(quantity, item.product.countInStock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // Очистка корзины
  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 