import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import postRoutes from './services/postRoutes.js';
import User from './models/user.js';

dotenv.config();
const app = express();

// Configuración de Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Usa tu clave secreta de Stripe

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error conectando a MongoDB:', error));

// Endpoint para iniciar el pago con Stripe
app.post('/api/payment/initiate', async (req, res) => {
  const { userId, amount } = req.body; // Amount: cantidad a cobrar

  try {
    // Crear una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Suscripción Premium', // Nombre del producto
            },
            unit_amount: amount * 100, // Cantidad en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`, // Redirige al frontend en caso de éxito
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`, // Redirige al frontend en caso de cancelación
      client_reference_id: userId, // Aquí asociamos el `userId` a la sesión de pago
    });

    // Devolver la URL de pago de Stripe
    res.json({ paymentUrl: session.url });
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    res.status(500).json({ message: 'Error al iniciar el pago' });
  }
});

// Endpoint para verificar el estado de la suscripción del usuario
app.get('/api/user/check-subscription', async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const today = new Date();
    if (user.subscriptionStatus === 'trial' && today > user.trialEndDate) {
      // Si el periodo de prueba ha terminado, actualiza el estado
      user.subscriptionStatus = 'expired';
      await user.save();
    }

    res.json({ subscriptionStatus: user.subscriptionStatus });
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar la suscripción' });
  }
});

// Endpoint para actualizar el estado de suscripción tras el pago
app.post('/api/user/update-subscription', async (req, res) => {
  const { userId, status } = req.body; // `status` podría ser 'active' o 'expired' según el pago

  try {
    const user = await User.findByIdAndUpdate(userId, { subscriptionStatus: status }, { new: true });
    res.json({ message: 'Estado de suscripción actualizado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la suscripción' });
  }
});

// Webhook de Stripe para recibir notificaciones de pagos
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verificar la firma del webhook
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Usar `client_reference_id` para obtener el userId
      const userId = session.client_reference_id;

      const user = await User.findById(userId);
      if (user) {
        user.subscriptionStatus = 'active';
        await user.save();
      }
    }

    res.status(200).send('Webhook recibido');
  } catch (error) {
    console.error('Error al procesar el webhook de Stripe:', error);
    res.status(400).send('Error al procesar el webhook');
  }
});

// Rutas de posts
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});