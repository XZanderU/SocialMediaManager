import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentButton = ({ plan, price }) => {
  const stripe = useStripe();

  const handlePayment = async () => {
    try {
      // Llama a tu servidor backend para crear la sesión de pago
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, price })
      });
      
      const session = await response.json();

      // Redirige a Stripe Checkout usando el id de la sesión
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      className="bg-primary text-white py-2 px-6 rounded-lg mt-6 w-full font-medium hover:bg-primary-dark transition-colors duration-300 bg-blue-500"
    >
      Seleccionar {plan}
    </button>
  );
};

export default PaymentButton;
