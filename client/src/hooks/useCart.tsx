import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Типы для состояния корзины
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

// Типы экшенов
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Функции для работы с корзиной
interface CartContextType extends CartState {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Создание контекста
const CartContext = createContext<CartContextType | undefined>(undefined);

// Начальное состояние
const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};

// Редьюсер для изменения состояния корзины
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Если товар уже есть, увеличиваем количество
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        
        return {
          ...state,
          items: updatedItems,
          totalPrice: state.totalPrice + action.payload.price,
          totalItems: state.totalItems + 1,
        };
      } else {
        // Добавляем новый товар
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalPrice: state.totalPrice + action.payload.price,
          totalItems: state.totalItems + 1,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
        totalItems: state.totalItems - itemToRemove.quantity,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      
      if (itemIndex < 0) return state;
      if (quantity <= 0) {
        // Если количество 0 или меньше, удаляем товар
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const item = state.items[itemIndex];
      const quantityDiff = quantity - item.quantity;
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = { ...item, quantity };
      
      return {
        ...state,
        items: updatedItems,
        totalPrice: state.totalPrice + (item.price * quantityDiff),
        totalItems: state.totalItems + quantityDiff,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

// Провайдер для корзины
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Загрузка состояния из localStorage при первом рендеринге
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : initialState;
    } catch (error) {
      console.error('Ошибка загрузки корзины из localStorage:', error);
      return initialState;
    }
  });
  
  // Сохранение состояния в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Функции для работы с корзиной
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Хук для использования корзины в компонентах
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 