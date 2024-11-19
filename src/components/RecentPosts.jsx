import React from 'react';

const RecentPosts = ({ posts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Publicaciones Recientes</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index} className="mb-2">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay publicaciones recientes.</p>
      )}
    </div>
  );
};

export default RecentPosts;
