import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useFetchAllBooksQuery } from '../../redux/features/books/bookApi';

const categories = ["All Genres", "Fiction", "Business", "Adventure", "Horror", "Thriller", "Children's Fiction", "Finance"];

const Trending = () => {

    const [selectedCategory, setSelectedCategory] = useState("All Genres");

    const { data: books = [] } = useFetchAllBooksQuery();

    const filteredBooks = selectedCategory === "All Genres"
        ? books
        : books.filter(book =>
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        },
    };

    return (
        <div className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white shadow-inner'>
            <h2 className='text-4xl font-extrabold text-center mb-12 text-gray-900'>
                <span className="bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text drop-shadow-md">
                    Explore My Literary Works
                </span>
            </h2>

            <div className='mb-12 flex justify-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className='
                        border border-gray-300 rounded-lg px-6 py-3
                        bg-white text-gray-800 text-lg font-medium
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        shadow-sm transition-all duration-300 ease-in-out
                        hover:border-blue-400 cursor-pointer
                    '
                    value={selectedCategory}
                >
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            {filteredBooks.length > 0 ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={40}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 60,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 70,
                        }
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper !pb-12"
                >
                    {
                        filteredBooks.map((book, index) => (
                            <SwiperSlide key={book._id || index}>
                                <motion.div
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <BookCard book={book} />
                                </motion.div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <div className="text-center text-gray-600 text-lg py-10">
                    No books found for the selected category.
                </div>
            )}
        </div>
    );
};

export default Trending;
