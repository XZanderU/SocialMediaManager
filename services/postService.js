// postService.js

const Post = require('../models/post');

// Obtener todas las publicaciones programadas
const getPosts = async () => {
  try {
    const posts = await Post.find({ isScheduled: true });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Crear una nueva publicación programada
const schedulePost = async (platform, message, scheduledTime) => {
  try {
    const newPost = new Post({
      platform,
      message,
      scheduledTime,
      isScheduled: true,
    });
    const savedPost = await newPost.save();
    return savedPost;
  } catch (error) {
    console.error('Error scheduling post:', error);
    throw error;
  }
};

// Actualizar una publicación programada en la base de datos
const updateScheduledPost = async (id, updatedData) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedPost;
  } catch (error) {
    console.error('Error updating scheduled post:', error);
    throw error;
  }
};

// Eliminar una publicación programada de la base de datos
const deleteScheduledPost = async (id) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  } catch (error) {
    console.error('Error deleting scheduled post:', error);
    throw error;
  }
};

// Exporta las funciones
module.exports = {
  getPosts,
  schedulePost,
  updateScheduledPost,
  deleteScheduledPost,
};
