import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/login/pages/LoginPage';
import { OrdersPage } from '../features/orders/pages/Orderspages';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* Redirect root to login for now */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Catch-all route to redirect back home/login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};
