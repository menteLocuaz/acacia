import { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../constants/menuData';

export const useOrdersLogic = () => {
  const [activeCat, setActiveCat] = useState('lunch');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{id:number, qty:number}[]>([]);

  const filtered = useMemo(() =>
    MENU_ITEMS.filter(i =>
      i.cat === activeCat &&
      i.name.toLowerCase().includes(search.toLowerCase())
    ), [activeCat, search]);

  const getItem = (id: number) => MENU_ITEMS.find(i => i.id === id);

  const addToCart = (id: number) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === id);
      if (ex) return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, qty: 1 }];
    });
  };

  const changeQty = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  };

  const subtotal = cart.reduce((s, c) => {
    const item = getItem(c.id);
    return s + (item ? item.price * c.qty : 0);
  }, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return {
    activeCat,
    setActiveCat,
    search,
    setSearch,
    cart,
    filtered,
    getItem,
    addToCart,
    changeQty,
    subtotal,
    tax,
    total,
  };
};
