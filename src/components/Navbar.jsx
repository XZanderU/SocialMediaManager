import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Fondo borroso solo detrás del navbar */}
      <div
        className={`fixed top-0 left-0 w-full h-screen transition-all duration-300 ${
          isVisible ? 'backdrop-blur-sm' : ''
        }`}
        style={{ zIndex: -1, top: '64px' }} // Ajusta el top según la altura del navbar
      ></div>
  
      <motion.nav
        className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ${
          isVisible ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ zIndex: 10 }} // Navbar sobre el fondo
      >
        <div className="flex justify-between items-center">
          <img src="src/Img/EngagePro.png" alt="Logo" className="h-20" />
          <button
            className="block lg:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
  
        <div
          className={`lg:flex lg:items-center lg:space-x-4 mt-4 lg:mt-0 ${
            isMenuOpen ? 'block' : 'hidden'
          } lg:block`}
        >
          <a href="#Caracteristics" className="block text-gray-700 hover:text-blue-500">
            Características
          </a>
          <a href="#pricing" className="block text-gray-700 hover:text-blue-500">
            Planes
          </a>
          <a href="#testimonials" className="block text-gray-700 hover:text-blue-500">
            Testimonios
          </a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-500">
            Contacto
          </a>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
