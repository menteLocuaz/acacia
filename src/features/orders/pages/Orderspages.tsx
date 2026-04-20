import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { CATEGORIES } from '../constants/menuData';
import { useOrdersLogic } from '../hooks/useOrdersLogic';
import { ProductCard } from '../components/ProductCard';
import { ReceiptItem } from '../components/ReceiptItem';
import { useAuthStore } from '../../login/store/authStore';

// ─── Styled Components ────────────────────────────────────────────────────────
const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr 340px;
  height: 100vh;
  overflow: hidden;
  background: ${props => props.theme.fresh.colors.background};
  font-family: 'Outfit', sans-serif;
`;

const NavRail = styled.nav`
  background: ${props => props.theme.industrial.colors.chassis};
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
  background: ${props => props.$active ? props.theme.fresh.colors.accent : 'transparent'};
  color: ${props => props.$active ? '#fff' : props.theme.fresh.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? props.theme.fresh.colors.accent : 'rgba(255,255,255,0.1)'};
    color: #fff;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${props => props.theme.fresh.colors.background};
`;

const Header = styled.header`
  height: 64px;
  background: ${props => props.theme.fresh.colors.surface};
  border-bottom: 1px solid ${props => props.theme.fresh.colors.border};
  display: flex;
  align-items: center;
  padding: 0 24px;
  justify-content: space-between;
`;

const SearchBar = styled.div`
  background: ${props => props.theme.fresh.colors.paper};
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
    color: inherit;
  }
`;

const CatBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  overflow-x: auto;
  flex-shrink: 0;

  &::-webkit-scrollbar { display: none; }
`;

const CatCard = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? props.theme.fresh.colors.accent : props.theme.fresh.colors.surface};
  color: ${props => props.$active ? '#fff' : props.theme.fresh.colors.text};
  border: 1px solid ${props => props.$active ? props.theme.fresh.colors.accent : props.theme.fresh.colors.border};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.theme.fresh.shadows?.standard || 'none'};

  div { text-align: left; }
  span:first-child { font-size: 1.5rem; }
  b { display: block; font-size: 0.85rem; font-weight: 600; }
  small { font-size: 0.7rem; opacity: 0.7; }

  &:hover { transform: translateY(-2px); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 0 24px 24px;
  overflow-y: auto;
`;

const ReceiptSidebar = styled.aside`
  background: ${props => props.theme.fresh.colors.surface};
  border-left: 1px solid ${props => props.theme.fresh.colors.border};
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

const TotalsArea = styled.div`
  border-top: 2px dashed ${props => props.theme.fresh.colors.border};
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
  background: ${props => props.theme.fresh.colors.accent};
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

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.theme.fresh.colors.accent};
`;

const TotalValue = styled.b`
  color: ${props => props.theme.fresh.colors.accent};
  font-family: monospace;
`;

// ── OrdersPage ─────────────────────────────────────────────────────────────────
export const OrdersPage = () => {
  const {
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
  } = useOrdersLogic();

  const user = useAuthStore((state) => state.user);

  return (
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
            <Icon icon="mdi:magnify" style={{ opacity: 0.5 }} />
            <input 
              placeholder="Buscar por nombre o SKU..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </SearchBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <b style={{ display: 'block', fontSize: '0.85rem' }}>{user?.name || 'Invitado'}</b>
              <small style={{ opacity: 0.5, fontSize: '0.75rem' }}>ID: {user?.id || '----'}</small>
            </div>
            <UserAvatar />
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
            <ProductCard 
              key={item.id} 
              item={item} 
              onClick={() => addToCart(item.id)} 
            />
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
              <ReceiptItem 
                key={c.id} 
                item={item} 
                qty={c.qty}
                onIncrease={() => changeQty(c.id, 1)}
                onDecrease={() => changeQty(c.id, -1)}
              />
            );
          })}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', opacity: 0.5, marginTop: 40 }}>
              <Icon icon="mdi:cart-outline" fontSize={48} style={{ opacity: 0.2 }} />
              <p>Carrito vacío</p>
            </div>
          )}
        </ReceiptTape>

        <TotalsArea>
          <div>
            <span style={{ opacity: 0.7 }}>Subtotal</span>
            <b style={{ fontFamily: 'monospace' }}>${subtotal.toFixed(2)}</b>
          </div>
          <div>
            <span style={{ opacity: 0.7 }}>Impuestos (5%)</span>
            <b style={{ fontFamily: 'monospace' }}>${tax.toFixed(2)}</b>
          </div>
          <div style={{ marginTop: 12, fontSize: '1.2rem' }}>
            <b>Total</b>
            <TotalValue>${total.toFixed(2)}</TotalValue>
          </div>
          <PayButton onClick={() => alert('Procesando Pago...')}>
            PAGAR AHORA
          </PayButton>
        </TotalsArea>
      </ReceiptSidebar>
    </AppLayout>
  );
};

export default OrdersPage;
