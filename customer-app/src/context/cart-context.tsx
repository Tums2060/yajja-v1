import React, { createContext, useCallback, useMemo, useState } from 'react';

import type { MenuItem, Restaurant } from '@/data/mock';

export type CartItem = {
  key: string;
  itemId: string;
  restaurantId: string;
  name: string;
  price: number;
  restaurantName: string;
  quantity: number;
  instructions: string;
  imageUrl: string;
};

export type Order = {
  id: string;
  code: string;
  createdAt: string;
  status: string;
  items: CartItem[];
  total: number;
};

type CartContextValue = {
  items: CartItem[];
  orders: Order[];
  itemCount: number;
  total: number;
  addItem: (restaurant: Restaurant, item: MenuItem) => void;
  updateInstructions: (key: string, value: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  confirmOrder: () => Order | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function formatOrderCode() {
  const code = Math.floor(10000 + Math.random() * 90000);
  return `YJ-${code}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addItem = useCallback((restaurant: Restaurant, item: MenuItem) => {
    setItems((prev) => {
      const key = `${restaurant.id}:${item.id}`;
      const existing = prev.find((entry) => entry.key === key);
      if (existing) {
        return prev.map((entry) =>
          entry.key === key
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          restaurantId: restaurant.id,
          name: item.name,
          price: item.price,
          restaurantName: restaurant.name,
          quantity: 1,
          instructions: '',
          imageUrl: item.imageUrl,
        },
      ];
    });
  }, []);

  const updateInstructions = useCallback((key: string, value: string) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.key === key ? { ...entry, instructions: value } : entry
      )
    );
  }, []);

  const updateQuantity = useCallback((key: string, delta: number) => {
    setItems((prev) => {
      const next = prev
        .map((entry) =>
          entry.key === key
            ? { ...entry, quantity: Math.max(1, entry.quantity + delta) }
            : entry
        )
        .filter((entry) => entry.quantity > 0);
      return next;
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((entry) => entry.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const confirmOrder = useCallback(() => {
    if (!items.length) {
      return null;
    }

    const order: Order = {
      id: `${Date.now()}`,
      code: formatOrderCode(),
      createdAt: new Date().toISOString(),
      status: 'Preparing',
      items,
      total,
    };

    setOrders((prev) => [order, ...prev]);
    setItems([]);
    return order;
  }, [items, total]);

  const value = useMemo(
    () => ({
      items,
      orders,
      itemCount,
      total,
      addItem,
      updateInstructions,
      updateQuantity,
      removeItem,
      clearCart,
      confirmOrder,
    }),
    [
      items,
      orders,
      itemCount,
      total,
      addItem,
      updateInstructions,
      updateQuantity,
      removeItem,
      clearCart,
      confirmOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
