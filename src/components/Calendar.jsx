import React, { useState, useEffect } from 'react';
import { fetchCalendarEvents } from '../../services/api'; // Asegúrate de tener esta función en tu API

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchCalendarEvents(); // Llama a tu API para obtener eventos
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="calendar p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Calendario de Eventos</h2>
      <div className="grid grid-cols-7 gap-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div key={day} className="font-bold">{day}</div>
        ))}
        {/* Aquí agregar días y eventos */}
        {/* Puedes personalizar cómo se muestran los días y eventos */}
        {events.map((event, index) => (
          <div key={index} className="border p-2 rounded">
            <strong>{event.date}</strong>
            <p>{event.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
