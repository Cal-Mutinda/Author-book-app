import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';

const Recommended = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center tracking-wide">
          A Look at some of  <span className="text-indigo-600">My Work</span>
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {books.length > 0 &&
            books.slice(1, 5).map((book, index) => (
              <SwiperSlide key={index}>
                <div className="transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
                  <BookCard book={book} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Recommended;
