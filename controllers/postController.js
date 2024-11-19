import Post from '../models/post.js'; // Asegúrate de que esta ruta sea correcta y de que el modelo esté bien configurado

// Obtener todas las publicaciones programadas
export async function getAllScheduledPosts(req, res) {
  try {
    const posts = await Post.find({ isScheduled: true });
    const formattedPosts = posts.map(post => ({
      _id: post._id,
      message: post.message,
      scheduledTime: post.scheduledTime, // Asegúrate de que este campo existe en tu modelo
    }));
    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    res.status(500).json({ message: 'Error fetching scheduled posts' });
  }
}

// Crear una nueva publicación
export async function createPost(req, res) {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
}

// Actualizar una publicación
export async function updatePost(req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
}

// Eliminar una publicación
export async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
}


