import { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../constants/menuData';
import { useCartStore } from '../store/cartStore';

export const useOrdersLogic = () => {
  const [activeCat, setActiveCat] = useState('lunch');
  const [search, setSearch] = useState('');
  
  // Use global cart store
  const { cart, addToCart, changeQty } = useCartStore();

  const filtered = useMemo(() =>
    MENU_ITEMS.filter(i =>
      i.cat === activeCat &&
      i.name.toLowerCase().includes(search.toLowerCase())
    ), [activeCat, search]);

  const getItem = (id: number) => MENU_ITEMS.find(i => i.id === id);

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
