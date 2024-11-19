import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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

// Llave pública de Stripe (reemplaza con tu propia clave)
const stripePromise = loadStripe('tu_llave_publica_de_stripe');

function App() {
  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>        
        <Route path='/payment' element={<Elements stripe={stripePromise}><Payment /></Elements>} />
        <Route path='/dashboard' 
                element={
                <PrivateRoute>
                  <Dashboard />
                  </PrivateRoute>
                }/>
           <Route path='/profile' 
               element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
               } />
           <Route path='/settings' 
               element={
                <PrivateRoute>
                  <Settings />
                  </PrivateRoute>
               } />
            <Route path='/Home' element={<Home />} />
        </Routes>
    </Router>
    </Elements>
    </AuthProvider>
  );
}

export default App;
