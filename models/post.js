import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Definición del esquema para la publicación
const postSchema = new Schema({
  message: {
    type: String,
    required: true, // El mensaje es obligatorio
  },
  scheduledTime: {
    type: Date,
    required: true, // La hora programada es obligatoria
  },
  platform: {
    type: String,
    required: true, // Indica en qué plataforma se publicará
  },
  isScheduled: {
    type: Boolean,
    default: true, // Asumimos que las publicaciones son programadas por defecto
  },
  createdAt: {
    type: Date,
    default: Date.now, // Registra la fecha de creación
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Registra la fecha de la última actualización
  },
  user: { // Relación con el modelo de usuario
    type: mongoose.Schema.Types.ObjectId, // Tipo de dato para una referencia a un objeto
    ref: 'User', // Referencia al modelo de Usuario
    required: true, // Cada publicación debe tener un usuario asignado
  },
});


export default model('Post', postSchema);
