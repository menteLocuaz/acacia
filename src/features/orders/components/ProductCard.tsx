import styled from 'styled-components';
import { Icon } from '@iconify/react';

const Card = styled.div`
  background: ${props => props.theme.fresh.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.fresh.colors.border};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    transform: translateY(-4px);
    border-color: ${props => props.theme.fresh.colors.accent};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  background: ${props => props.theme.fresh.colors.paper};
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const PriceTag = styled.div`
  font-family: monospace;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${props => props.theme.fresh.colors.text};
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ProductCardProps {
  item: {
    id: number;
    name: string;
    desc: string;
    price: number;
    img: string;
  };
  onClick: () => void;
}

export const ProductCard = ({ item, onClick }: ProductCardProps) => {
  return (
    <Card onClick={onClick}>
      <ProductImage src={item.img} />
      <ProductInfo>
        <b style={{ fontSize: '0.9rem' }}>{item.name}</b>
        <div style={{ fontSize: '0.75rem', color: 'inherit', opacity: 0.7, marginTop: 4 }}>{item.desc}</div>
        <PriceTag>
          ${item.price.toFixed(2)}
          <Icon icon="mdi:plus-circle" color="currentColor" style={{ color: 'var(--accent-color, #2563eb)' }} fontSize={24} />
        </PriceTag>
      </ProductInfo>
    </Card>
  );
};
