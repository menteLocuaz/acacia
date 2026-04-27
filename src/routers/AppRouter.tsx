import { Routes, Route } from 'react-router-dom';
import { Home } from '../index';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={< Home />} />
    </Routes>
  );
};
