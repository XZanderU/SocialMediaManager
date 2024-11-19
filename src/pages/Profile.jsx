import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserData, updateUserData } from "../../services/api";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePic: ''
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        setProfilePicPreview(data.profilePic);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        alert('Error al obtener los datos del usuario');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
        setUserData((prevData) => ({ ...prevData, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUserData(userData);
      alert('Datos actualizados exitosamente');
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      alert('Error al actualizar los datos');
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold text-gray-700 mt-10">Cargando...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">Perfil de Usuario</h1>

      {/* Sección de la Foto de Perfil */}
      <div className="flex flex-col items-center mb-6">
        <motion.img
          src={profilePicPreview || 'https://via.placeholder.com/150'}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full mb-4 object-cover"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="mt-2"
          />
        )}
      </div>

      {/* Detalles del Perfil */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Nombre:</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
                disabled={isSubmitting}
              />
            ) : (
              <span className="text-gray-900">{userData.name}</span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Correo Electrónico:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
                disabled={isSubmitting}
              />
            ) : (
              <span className="text-gray-900">{userData.email}</span>
            )}
          </div>
        </motion.div>

        {/* Biografía */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Biografía:</span>
            {isEditing ? (
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
                disabled={isSubmitting}
              />
            ) : (
              <span className="text-gray-900">{userData.bio || "Agrega una biografía"}</span>
            )}
          </div>
        </motion.div>

        {/* Botones de Edición */}
        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white p-2 rounded-lg font-semibold"
              >
                Cancelar
              </button>
              <motion.button
                type="submit"
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-blue-500 text-white p-2 rounded-lg font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </motion.button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white p-2 rounded-lg font-semibold"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;





