import React from 'react';
import { Link } from 'react-router-dom';
import authorImage from '../../assets/Author.jpg';
import { motion } from 'framer-motion';

const Author = () => {
  const quotes = [
    "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
    "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    "There is no friend as loyal as a book."
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-white via-gray-50 to-white py-24 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/3 overflow-hidden rounded-3xl shadow-2xl"
        >
          <img
            src={authorImage}
            alt="Author"
            className="w-full h-full object-cover min-h-[300px]"
          />
        </motion.div>

        {/* Text */}
        <div className="w-full md:w-2/3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-extrabold text-gray-800 mb-6 font-serif"
          >
            ✍️ About Karen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-700 leading-relaxed font-light mb-8"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-700 leading-relaxed font-light mb-8"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio, similique
            porro alias ipsa culpa tempora quis. Minus magnam optio quas,
            quae, veniam quidem ipsa alias, ratione autem excepturi praesentium.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to="/about"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg transition-all duration-300"
            >
              More About Me
            </Link>
          </motion.div>

          {/* Quotes  */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">📚 Favorite Quotes</h3>
            <ul className="space-y-4 border-l-4 border-indigo-400 pl-4">
              {quotes.map((quote, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 * index }}
                  className="text-gray-600 italic text-base"
                >
                  “{quote}”
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Author;
