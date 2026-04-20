import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MAX_PIN = 4;

export const useLoginLogic = () => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleKey = (key: string) => {
    if (key === 'C') {
      setPin('');
      return;
    }
    if (pin.length < MAX_PIN) {
      setPin(prev => prev + key);
    }
  };

  const deleteLastDigit = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleAuth = () => {
    if (pin.length === MAX_PIN) {
      setLoading(true);
      setTimeout(() => navigate('/orders'), 800);
    }
  };

  return {
    pin,
    loading,
    MAX_PIN,
    handleKey,
    handleAuth,
    deleteLastDigit,
  };
};
