import React, { useEffect, useState } from 'react';
import { checkSubscriptionStatus, updateSubscriptionStatus } from '../../services/authServices';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Payment = ({ userId }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        setLoading(true);
        const status = await checkSubscriptionStatus(userId);
        setSubscriptionStatus(status);
      } catch (error) {
        console.error('Error al obtener el estado de suscripción:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [userId]);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Asegúrate de que Stripe y Elements estén cargados
      return;
    }

    // Obtener los datos de la tarjeta del usuario
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Error al crear el token:', error);
    } else {
      try {
        // Aquí envías el token a tu backend para procesar el pago
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id, userId }),
        });

        const data = await response.json();

        if (data.success) {
          // Actualizar el estado de la suscripción en el frontend
          handleSubscriptionUpdate();
        } else {
          console.error('Error al procesar el pago:', data.message);
        }
      } catch (error) {
        console.error('Error en la comunicación con el backend:', error);
      }
    }
  };

  const handleSubscriptionUpdate = async () => {
    try {
      const updatedStatus = await updateSubscriptionStatus(userId, 'active');
      setSubscriptionStatus(updatedStatus);
    } catch (error) {
      console.error('Error al actualizar la suscripción:', error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className='text text-center py-2 px-4'>
      <h1>Estado de la suscripción</h1>
      {subscriptionStatus === 'trial' && (
        <p>Estás en un período de prueba gratuito. Asegúrate de completar el pago antes de que expire.</p>
      )}
      {subscriptionStatus === 'expired' && (
        <>
          <p>Tu período de prueba ha terminado. Por favor, realiza el pago para continuar usando la aplicación.</p>
          <div>
            <CardElement />
          </div>
          <button className="bg-primary bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={handlePayment} disabled={!stripe}>Realizar Pago</button>
        </>
      )}
      {subscriptionStatus === 'active' && (
        <p >Tu suscripción está activa. Gracias por tu apoyo.</p>
      )}
      {/* Botón para simular actualización del estado de suscripción */}
      <button className="bg-primary bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={handleSubscriptionUpdate}>Actualizar Estado de Suscripción</button>
    </div>
  );
};

export default Payment;

