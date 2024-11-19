import React, { useState, useEffect } from 'react';


const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);

  // Cargar el idioma guardado al inicio
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage); // Guardar el idioma en localStorage
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simular una llamada a una API para guardar configuraciones
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Configuraciones guardadas con éxito!');
    setIsSaving(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Configuraciones</h2>
      <p className="mb-4">Configura tus preferencias aquí.</p>

      {/* Sección de Notificaciones */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Notificaciones</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="mr-2"
          />
          Habilitar notificaciones
        </label>
      </div>

      {/* Sección de Idioma */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Idioma</h3>
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="en">Inglés</option>
          <option value="es">Español</option>
          <option value="fr">Francés</option>
          {/* Añadir más idiomas según sea necesario */}
        </select>
      </div>

      {/* Botón de Guardar */}
      <button
        onClick={handleSave}
        className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSaving}
      >
        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
      </button>
    </div>
  );
};

export default Settings;

