import styled from 'styled-components';

const Container = styled.div`
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
    width: 20px; height: 20px; border-radius: 4px; border: 1px solid ${props => props.theme.fresh.colors.border};
    background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: inherit;
    &:hover {
      background: ${props => props.theme.fresh.colors.paper};
    }
  }
`;

interface ReceiptItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    img: string;
  };
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const ReceiptItem = ({ item, qty, onIncrease, onDecrease }: ReceiptItemProps) => {
  return (
    <Container>
      <img src={item.img} alt={item.name} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{item.name}</div>
        <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>Uni: ${item.price.toFixed(2)}</div>
        <QtyControl>
          <button onClick={(e) => { e.stopPropagation(); onDecrease(); }}>-</button>
          <span style={{ fontWeight: 700 }}>{qty}</span>
          <button onClick={(e) => { e.stopPropagation(); onIncrease(); }}>+</button>
        </QtyControl>
      </div>
      <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>
        ${(item.price * qty).toFixed(2)}
      </div>
    </Container>
  );
};
