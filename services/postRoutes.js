import { Router } from 'express';
import { getAllScheduledPosts, createPost, updatePost, deletePost } from '../controllers/postController.js';


const router = Router();

// Ruta para obtener todas las publicaciones programadas
router.get('/scheduled', getAllScheduledPosts);

// Ruta para crear una nueva publicación programada
router.post('/scheduled', createPost);

// Ruta para actualizar una publicación programada
router.put('/scheduled/:id', updatePost);

// Ruta para eliminar una publicación programada
router.delete('/scheduled/:id', deletePost);

export default router;
