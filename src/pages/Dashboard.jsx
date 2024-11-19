import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import RecentPosts from '../components/RecentPosts';
import {FaUser, FaClipboard, FaCog, FaChartLine, FaComments, FaHouseUser,FaUsers, FaServer, FaUserCog, } from 'react-icons/fa';
import { getStats, getPosts, getMetrics, getComments } from '../../services/api';
import Spinner from '../components/Spiner';
import Calendar from '../components/Calendar' 
 

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0, settings: 0 });
  const [posts, setPosts] = useState([]);
  const [metrics, setMetrics] = useState({ reach: 0, engagement: 0, followers: 0 });
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date()); // Estado para la fecha seleccionada en el calendario

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStats();
        const postsData = await getPosts();
        const metricsData = await getMetrics();
        const commentsData = await getComments();

        setStats(statsData);
        setPosts(postsData);
        setMetrics(metricsData);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav aria-label="sidebar-navigation">
          <ul>
            <li className="mb-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out">
              <Link to="/home" className="flex items-center py-2 px-4 transition-all duration-300 ease-in-out">
                <FaHouseUser className="mr-2" />
                Inicio
              </Link>
            </li>
            <li className="mb-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out">
              <Link to="/profile" className="flex items-center py-2 px-4 transition-all duration-300 ease-in-out">
                <FaUserCog className="mr-2" />
                Perfil
              </Link>
            </li>
            <li className="mb-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out">
              <Link to="/settings" className="flex items-center py-2 px-4 transition-all duration-300 ease-in-out">
                <FaCog className="mr-2" />
                Configuraciones
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-white">
        <div>
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Usuarios Activos" value={stats.users} icon={<FaUser />} className="shadow-lg p-4 bg-white rounded-lg" />
            <StatsCard title="Publicaciones" value={stats.posts} icon={<FaClipboard />} className="shadow-lg p-4 bg-white rounded-lg" />
            <StatsCard title="Configuraciones" value={stats.settings} icon={<FaCog />} className="shadow-lg p-4 bg-white rounded-lg" />
            <StatsCard title="Alcance" value={metrics.reach} icon={<FaServer />} className="shadow-lg p-4 bg-white rounded-lg" />
            <StatsCard title="Engagement" value={metrics.engagement} icon={<FaChartLine />} className="shadow-lg p-4 bg-white rounded-lg" />
            <StatsCard title="Seguidores" value={metrics.followers} icon={<FaUsers />} className="shadow-lg p-4 bg-white rounded-lg" />
          </div>

          {/* Sección de Publicaciones Recientes */}
          <RecentPosts posts={posts} />

          {/* Sección de Comentarios */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4"><FaComments className="mr-2 text-blue-500" /> Comentarios</h2>
            <ul className="bg-white rounded-lg shadow-md">
              {comments.map((comment) => (
                <li key={comment.id} className="border-b p-4 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <p><strong>{comment.user}</strong>: {comment.text}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className='mt-8'>
              <Calendar />
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;

