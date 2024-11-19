import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion'
import {FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube} from 'react-icons/fa'
import Navbar from '../components/Navbar';
import RedesSociales from '../Img/person.png'
import logoImageUrl from '../Img/EngagePro.png'
import {Link} from 'react-router-dom';
import PaymentButton from '../components/PaymentButton'

// URL de las imágenes de fondo y el logo
const backgroundImageUrl = 'https://example.com/your-background-image.jpg';
 
  const Home = () => {

    const testimonios = [
      {
        quote: "“Esta herramienta ha transformado mi forma de trabajar. ¡No puedo vivir sin ella!”",
        author: "- Alexander Urrea",
        image: "src/Img/Alexander Urrea.webp",
      },
      {
        quote: "“Un cambio radical en mi gestión de redes sociales, simplemente increíble.”",
        author: "- Influencer ABC",
        image: "",
      },
      {
        quote: "“Nunca había sido tan fácil gestionar mi contenido. ¡Lo recomiendo!”",
        author: "- Influencer 123",
        image:"",
      },
      {
        quote: "“La analítica en tiempo real me ha ayudado a crecer significativamente.”",
        author: "- Influencer DEF",
        image: "",
      },
      {
        quote: "“Una herramienta imprescindible para cualquier influencer.”",
        author: "- Influencer GHI",
        image: "",
      },
    ];

    const [currentTestimonio, setCurrentTestimonio] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTestimonio((prev) => (prev + 1) % testimonios.length);
      }, 5000); // Cambiar cada 5 segundos
      return () => clearInterval(interval);
    }, [testimonios.length]);
  

     return (
    <div
      className="bg-cover bg-center text-textPrimary p-6"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Navbar/>
      <header className="text-center">
        <motion.img 
          src={logoImageUrl} 
          alt="Logo" 
          className="mx-auto mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, scale: 1 }} // Configuración de animación al montar
          transition={{ duration: 0.8, ease: 'easeOut' }} // Duración y tipo de transición
          whileHover={{ scale: 1.1 }} // Efecto al pasar el cursor
          whileTap={{ scale: 0.95 }}
        />
        
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Gestiona tus Redes Sociales de Manera Efectiva
        </motion.h1>
        
        <motion.p 
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          La herramienta ideal para influencers que buscan optimizar su tiempo y aumentar su alcance.
        </motion.p>

        <Link to="/login">
            <motion.button 
                className="bg-primary text-white py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded mt-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                 whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
              Comienza Ahora
            </motion.button>
        </Link>

</header>

      <motion.section 
  className="mt-12 flex flex-col md:flex-row items-center"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, delay: 1.5 }}
>
  <div className="flex-1">
    <h2 className="text-3xl font-semibold text-center mb-6" id='Caracteristics'>Características Clave</h2>
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <ul className="space-y-4">
        <li className="flex items-start">
          <img src="../src/Icons/Programacion.svg" alt="Programación" className="w-12 h-12 mr-4" />
          <div>
            <span className="text-primary font-medium">&#9679;</span>
            <span className="text-gray-700 text-lg">Programación de publicaciones en múltiples plataformas.</span>
          </div>
        </li>
        <li className="flex items-start">
          <img src="/src/Icons/Analytics.svg" alt="Analytics" className="w-12 h-12 mr-4" />
          <div>
            <span className="text-primary font-medium">&#9679;</span>
            <span className="text-gray-700 text-lg">Analytics en tiempo real para medir tu rendimiento.</span>
          </div>
        </li>
        <li className="flex items-start">
          <img src="/src/Icons/Comments.svg" alt="Gestión" className="w-12 h-12 mr-4" />
          <div>
            <span className="text-primary font-medium">&#9679;</span>
            <span className="text-gray-700 text-lg">Gestión centralizada de comentarios y mensajes.</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div className="flex-1 hidden md:block">
    <img src={RedesSociales} alt="Redes Sociales" className="w-full h-auto rounded-lg" />
  </div>
</motion.section>




      <motion.section 
  className="mt-8"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, delay: 2 }}
>
  <h2 className="text-3xl font-semibold text-center mb-6" id='pricing'>Planes de Suscripción</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
    {['Plan Básico', 'Plan Pro', 'Plan Premium'].map((plan, index) => (
      <motion.div 
        key={plan} 
        className="border border-gray-200 shadow-lg rounded-lg p-6 min-h-[300px] flex flex-col justify-between items-center transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-semibold">{plan}</h3>
          <p className="mt-3 text-lg font-medium text-gray-700">${10 * (index + 1)}/mes</p>
          <p className="mt-2 text-sm text-gray-500">{
            index === 0 ? 'Ideal para principiantes.' :
            index === 1 ? 'Para negocios en crecimiento.' :
            'Para grandes marcas.'
          }</p>
        </div>
        
        <ul className="mt-6 space-y-3 text-gray-600 text-sm">
          {index === 0 && (
            <>
              <li>Gestión de hasta 3 cuentas</li>
              <li>Informes básicos</li>
              <li>Soporte por correo</li>
            </>
          )}
          {index === 1 && (
            <>
              <li>Gestión de hasta 10 cuentas</li>
              <li>Informes avanzados</li>
              <li>Soporte prioritario</li>
            </>
          )}
          {index === 2 && (
            <>
              <li>Gestión de cuentas ilimitadas</li>
              <li>Informes personalizados</li>
              <li>Asesoría dedicada</li>
            </>
          )}
        </ul>

        <div className="mt-8 flex justify-center space-x-4 text-gray-600">
          <FaFacebook className="text-xl" />
          <FaInstagram className="text-xl" />
          <FaTiktok className="text-xl" />
          <FaYoutube className="text-xl" />
          <FaLinkedin className="text-xl" />
        </div>

        <PaymentButton plan={plan} price={10 * (index + 1)} />
      </motion.div>
    ))}
  </div>
  <p className="mt-8 text-center text-gray-700">¡Prueba gratuita de 14 dias <span className="text-blue-500 font-semibold">para nuevos usuarios!</span></p>
</motion.section>

<motion.section className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6" id='testimonials'>Testimonios</h2>
      <div className="flex flex-col items-center">
        <motion.img
          src={testimonios[currentTestimonio].image}
          alt={testimonios[currentTestimonio].author}
          className="w-20 h-20 rounded-full mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8}}
          transition={{ duration: 0.5 }}
        />
          <blockquote className="mt-2 border-l-4 border-secondary pl-4 max-w-md text-center">
            <motion.p
              key={currentTestimonio}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20}}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {testimonios[currentTestimonio].quote}
            </motion.p>
            <footer className="mt-2 font-semibold">{testimonios[currentTestimonio].author}</footer>
          </blockquote>
        </div>
      </motion.section>

      <motion.section 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <h2 className="text-2xl font-semibold">Únete a EngagePro Hoy</h2>
        <p className="mt-2">Prueba EngagePro y descubre cómo puede mejorar tu estrategia de redes sociales.</p>
        <Link to="/login">
        <motion.button 
          className="bg-primary bg-blue-500 text-white py-2 px-4 rounded mt-4"
          whileHover={{ scale: 1.1 }}
        >
          Regístrate
        </motion.button>
        </Link>
      </motion.section>

      <div className="mt-8 flex justify-center space-x-4">
    <FaFacebook className="text-blue-600 text-2xl" />
    <FaInstagram className="text-pink-600 text-2xl" />
    <FaTiktok className="text-black text-2xl" />
    <FaYoutube className="text-red-600 text-2xl" />
    <FaLinkedin className="text-blue-700 text-2xl" />
  </div>

      <footer className="mt-8 text-center">
        <p className="text-sm">© 2024 EngagePro. Todos los derechos reservados.</p>
        <a href="/privacy" className="text-secondary">Política de Privacidad</a> | 
        <a href="/terms" className="text-secondary"> Términos de Servicio</a>
      </footer>
    </div>
  );
};

export default Home;