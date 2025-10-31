import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

import abstractBg from '../../assets/hero.avif';

const Hero = () => {
  const [heroText] = useState({
    heading: "Unleash Your Stories",
    subheading: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, alias. Excepturi voluptatem esse quidem enim possimus debitis minus repudiandae, autem assumenda commodi ducimus cumque, optio magnam, porro facilis maiores nobis.</p>,
    cta: "Explore My Collection",
  });

  const headingControls = useAnimation();
  const subheadingControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await headingControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } });
      await subheadingControls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } });
      await buttonControls.start({ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } });
    }

    sequence();
  }, [headingControls, subheadingControls, buttonControls]);

  return (
    <motion.div
      className='relative min-h-screen flex items-center justify-center overflow-hidden rounded-md'
      style={{
        backgroundImage: `url(${abstractBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black opacity-70 z-0"></div>
      <div className='relative z-10 text-center text-white px-6 md:px-0'>
        <motion.h1
          className='md:text-6xl text-4xl font-bold tracking-tight mb-8'
          initial={{ opacity: 0, y: 30 }}
          animate={headingControls}
          style={{ fontFamily: 'Playfair Display, serif' }} // Elegant serif font
        >
          {heroText.heading}
        </motion.h1>
        <motion.p
          className='md:text-xl text-lg font-light mb-10 leading-relaxed max-w-xl mx-auto'
          initial={{ opacity: 0, y: 30 }}
          animate={subheadingControls}
          style={{ fontFamily: 'Merriweather, serif' }} // Readable serif font
        >
          {heroText.subheading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={buttonControls}
        >
          <Link to="/books" className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition-all duration-300'>
            {heroText.cta}
          </Link>
          {/* Optional: Add a subtle scroll down indicator */}
          {/* <motion.div className="mt-12 absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-60" initial={{ opacity: 0, y: 20 }} animate={buttonControls} transition={{ delay: 0.7 }}>
            <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;