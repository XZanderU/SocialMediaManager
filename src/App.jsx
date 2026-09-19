import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './components/Settings';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Payment from './pages/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Llave pública de Stripe
const stripePromise = loadStripe('tu_llave_publica_de_stripe');

function App() {
  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            {/* Redirección automática desde la raíz a Home */}
            <Route path="/" element={<Navigate to="/Home" replace />} />
            
            <Route path="/login" element={<Login />} />        
            <Route path="/payment" element={<Payment />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route 
              path="/settings" 
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Router>
      </Elements>
    </AuthProvider>
  );
}

export default App;