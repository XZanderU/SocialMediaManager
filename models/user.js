import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Definición del esquema para el usuario
const userSchema = new Schema({
  name: {
    type: String,
    required: true, // El nombre es obligatorio
  },
  email: {
    type: String,
    required: true, // El correo electrónico es obligatorio
    unique: true,  // El correo debe ser único
  },
  password: {
    type: String,
    required: true, // La contraseña es obligatoria
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación del usuario
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Fecha de la última actualización del usuario
  },
});

// Crear y exportar el modelo de usuario
const User = model('User', userSchema);
export default User;
