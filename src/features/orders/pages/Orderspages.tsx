import React, { useState, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Icon } from '@iconify/react';

// ─── Tokens & Theme ──────────────────────────────────────────────────────────
const T = {
  bg: '#f8fafc',
  surface: '#ffffff',
  ink: '#0f172a',
  inkMuted: '#64748b',
  accent: '#2563eb',
  success: '#10b981',
  danger: '#ef4444',
  border: '#e2e8f0',
  paper: '#f1f5f9',
  shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
};

// ─── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  body {
    background: ${T.bg};
    color: ${T.ink};
    font-family: 'Outfit', sans-serif;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 10px; }
`;

// ─── Styled Components ────────────────────────────────────────────────────────
const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr 340px;
  height: 100vh;
  overflow: hidden;
`;

// ─── Sidebar (Navigation) ───
const NavRail = styled.nav`
  background: ${T.ink};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 16px;
  z-index: 20;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: ${props => props.$active ? T.accent : 'transparent'};
  color: ${props => props.$active ? '#fff' : T.inkMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? T.accent : 'rgba(255,255,255,0.1)'};
    color: #fff;
  }
`;

// ─── Main Content ───
const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${T.bg};
`;

const Header = styled.header`
  height: 64px;
  background: ${T.surface};
  border-bottom: 1px solid ${T.border};
  display: flex;
  align-items: center;
  padding: 0 24px;
  justify-content: space-between;
`;

const SearchBar = styled.div`
  background: ${T.paper};
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 320px;

  input {
    background: transparent;
    border: none;
    outline: none;
    font-family: 'Outfit', sans-serif;
    font-size: 0.9rem;
    width: 100%;
  }
`;

// ─── Category Selection ───
const CatBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  overflow-x: auto;
  flex-shrink: 0;

  &::-webkit-scrollbar { display: none; }
`;

const CatCard = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? T.accent : T.surface};
  color: ${props => props.$active ? '#fff' : T.ink};
  border: 1px solid ${props => props.$active ? T.accent : T.border};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${T.shadow};

  div { text-align: left; }
  span:first-child { font-size: 1.5rem; }
  b { display: block; font-size: 0.85rem; font-weight: 600; }
  small { font-size: 0.7rem; opacity: 0.7; }

  &:hover { transform: translateY(-2px); }
`;

// ─── Item Grid ───
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 0 24px 24px;
  overflow-y: auto;
`;

const ProductCard = styled.div`
  background: ${T.surface};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${T.border};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    transform: translateY(-4px);
    border-color: ${T.accent};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  background: ${T.paper};
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const PriceTag = styled.div`
  font-family: monospace;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${T.ink};
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// ─── Invoice (Receipt) ───
const ReceiptSidebar = styled.aside`
  background: ${T.surface};
  border-left: 1px solid ${T.border};
  display: flex;
  flex-direction: column;
  padding: 24px;
  z-index: 10;
`;

const ReceiptTape = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;

const ReceiptItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.85rem;

  img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }
`;

const QtyControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  
  button {
    width: 20px; height: 20px; border-radius: 4px; border: 1px solid ${T.border};
    background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center;
  }
`;

const TotalsArea = styled.div`
  border-top: 2px dashed ${T.border};
  padding-top: 20px;
  
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }
`;

const PayButton = styled.button`
  width: 100%;
  background: ${T.accent};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 16px;
  cursor: pointer;
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
  transition: all 0.2s;

  &:hover { filter: brightness(1.1); }
  &:active { transform: scale(0.98); }
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'breakfast', name: 'Desayunos', stock: 12, icon: '🍳' },
  { id: 'lunch',     name: 'Almuerzos',  stock: 32, icon: '🍱' },
  { id: 'dinner',    name: 'Cenas',     stock: 8,  icon: '🍽️' },
  { id: 'soup',      name: 'Sopas',      stock: 6,  icon: '🍜' },
  { id: 'beverages', name: 'Bebidas',    stock: 20, icon: '🥤' },
];

const MENU_ITEMS = [
  { id:1, cat:'lunch', name:'Pasta Bolognese',   desc:'Deliciosa pasta con carne de res', price:50.5, img:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&q=70' },
  { id:2, cat:'lunch', name:'Pollo Picante',     desc:'Pollo frito con especias', price:45.7, img:'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&q=70' },
  { id:3, cat:'lunch', name:'Corte de Carne',    desc:'Steak a la parrilla premium', price:80.0, img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&q=70' },
  { id:4, cat:'lunch', name:'Pescado y Papas',   desc:'Clásico Fish and Chips', price:90.4, img:'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=200&q=70' },
  { id:10,cat:'breakfast',name:'Pancakes',       desc:'Hot cakes con miel de maple', price:22.0, img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=70' },
  { id:11,cat:'beverages',name:'Limonada Fresca', desc:'Limonada natural con menta', price:12.5, img:'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&q=70' },
];

// ── OrdersPage ─────────────────────────────────────────────────────────────────
export const OrdersPage = () => {
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

  return (
    <>
      <GlobalStyle />
      <AppLayout>
        {/* Sidebar */}
        <NavRail>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', marginBottom: 20 }}>A</div>
          <NavItem $active><Icon icon="mdi:view-dashboard" fontSize={24} /></NavItem>
          <NavItem><Icon icon="mdi:clipboard-text" fontSize={24} /></NavItem>
          <NavItem><Icon icon="mdi:chart-bar" fontSize={24} /></NavItem>
          <NavItem><Icon icon="mdi:cog" fontSize={24} /></NavItem>
          <NavItem style={{ marginTop: 'auto' }}><Icon icon="mdi:logout" fontSize={24} /></NavItem>
        </NavRail>

        {/* Main */}
        <MainContent>
          <Header>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Menu Principal</div>
            <SearchBar>
              <Icon icon="mdi:magnify" color={T.inkMuted} />
              <input 
                placeholder="Buscar por nombre o SKU..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </SearchBar>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <b style={{ display: 'block', fontSize: '0.85rem' }}>Courtney H.</b>
                <small style={{ color: T.inkMuted, fontSize: '0.75rem' }}>ID: 2341</small>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.accent }} />
            </div>
          </Header>

          <CatBar>
            {CATEGORIES.map(cat => (
              <CatCard 
                key={cat.id} 
                $active={activeCat === cat.id}
                onClick={() => setActiveCat(cat.id)}
              >
                <span>{cat.icon}</span>
                <div>
                  <b>{cat.name}</b>
                  <small>{cat.stock} Items</small>
                </div>
              </CatCard>
            ))}
          </CatBar>

          <Grid>
            {filtered.map(item => (
              <ProductCard key={item.id} onClick={() => addToCart(item.id)}>
                <ProductImage src={item.img} />
                <ProductInfo>
                  <b style={{ fontSize: '0.9rem' }}>{item.name}</b>
                  <div style={{ fontSize: '0.75rem', color: T.inkMuted, marginTop: 4 }}>{item.desc}</div>
                  <PriceTag>
                    ${item.price.toFixed(2)}
                    <Icon icon="mdi:plus-circle" color={T.accent} fontSize={24} />
                  </PriceTag>
                </ProductInfo>
              </ProductCard>
            ))}
          </Grid>
        </MainContent>

        {/* Receipt */}
        <ReceiptSidebar>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon icon="mdi:receipt-text-outline" />
            Orden Actual
          </div>
          
          <ReceiptTape>
            {cart.map(c => {
              const item = getItem(c.id);
              if (!item) return null;
              return (
                <ReceiptItem key={c.id}>
                  <img src={item.img} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: T.inkMuted, fontSize: '0.75rem' }}>Uni: ${item.price.toFixed(2)}</div>
                    <QtyControl>
                      <button onClick={(e) => { e.stopPropagation(); changeQty(c.id, -1); }}>-</button>
                      <span style={{ fontWeight: 700 }}>{c.qty}</span>
                      <button onClick={(e) => { e.stopPropagation(); changeQty(c.id, 1); }}>+</button>
                    </QtyControl>
                  </div>
                  <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>
                    ${(item.price * c.qty).toFixed(2)}
                  </div>
                </ReceiptItem>
              );
            })}
            {cart.length === 0 && (
              <div style={{ textAlign: 'center', color: T.inkMuted, marginTop: 40 }}>
                <Icon icon="mdi:cart-outline" fontSize={48} style={{ opacity: 0.2 }} />
                <p>Carrito vacío</p>
              </div>
            )}
          </ReceiptTape>

          <TotalsArea>
            <div>
              <span style={{ color: T.inkMuted }}>Subtotal</span>
              <b style={{ fontFamily: 'monospace' }}>${subtotal.toFixed(2)}</b>
            </div>
            <div>
              <span style={{ color: T.inkMuted }}>Impuestos (5%)</span>
              <b style={{ fontFamily: 'monospace' }}>${tax.toFixed(2)}</b>
            </div>
            <div style={{ marginTop: 12, fontSize: '1.2rem' }}>
              <b>Total</b>
              <b style={{ color: T.accent, fontFamily: 'monospace' }}>${total.toFixed(2)}</b>
            </div>
            <PayButton onClick={() => alert('Procesando Pago...')}>
              PAGAR AHORA
            </PayButton>
          </TotalsArea>
        </ReceiptSidebar>
      </AppLayout>
    </>
  );
};

export default OrdersPage;
