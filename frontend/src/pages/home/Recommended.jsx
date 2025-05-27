import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';

const Recommended = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("../public/books.json")
            .then(res => res.json())
            .then((data) => setBooks(data))
    },
        []
    )

    return (
        <section className='bg-gray-100 w-full'>
            <div className='py-16'>
                <h2 className='text-3xl font-semibold mb-6'>Recommended For You</h2>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        1180: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        }
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {

books.length > 0 && books.slice(10, 20).map((book, index) => (
                            <SwiperSlide key={index}>
                                <BookCard key={index} book={book} />

                            </SwiperSlide>
                        ))
                    }


                </Swiper>


            </div>
        </section>
    )
}

export default Recommended
