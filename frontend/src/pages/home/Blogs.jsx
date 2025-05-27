import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";
import { Link } from 'react-router-dom';

const news = [
    {
        "id": 1,
        "title": "Kenya's Economic Outlook: Navigating Inflation and Growth in 2025",
        "description": "An analysis of the current economic climate in Kenya, focusing on inflation trends, government policies, and sectors driving growth for the coming year.",
        "image": news1
    },
    {
        "id": 2,
        "title": "Emerging Career Paths for Kenyan Graduates: Tech, Green Jobs, and Beyond",
        "description": "A guide for Kenyan students exploring promising career opportunities in the rapidly evolving job market, including insights into the tech sector, renewable energy, and creative industries.",
        "image": news2
    },
    {
        "id": 3,
        "title": "Addressing Youth Unemployment: Innovative Solutions from Kenyan Communities",
        "description": "Highlighting grassroots initiatives and policy discussions aimed at tackling the persistent challenge of youth unemployment across various regions in Kenya.",
        "image": news3
    },
    {
        "id": 4,
        "title": "Financial Literacy for Kenyan Students: Smart Saving and Investment Strategies",
        "description": "Essential financial advice tailored for Kenyan students, covering budgeting, debt management, and early investment opportunities to build a secure future.",
        "image": news4
    },
    {
        "id": 5,
        "title": "The Impact of Devolution: Local Governance and Service Delivery in Kenya",
        "description": "Examining how devolution has influenced service delivery and development projects in various counties, and the ongoing challenges faced by local administrations.",
        "image": news1
    }
];

const Blogs = () => { // Renamed component to start with capital letter
    // Define animation variants for the blog cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <div className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'> {/* Added padding and a subtle background */}
            <h2 className='text-4xl font-extrabold text-center mb-12 text-gray-900'>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    Latest Insights & News
                </span>
            </h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
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
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    news.map((item) => (
                        <SwiperSlide key={item.id}>
                            <motion.div // Wrap the card div with motion.div
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible" // Animate when in view
                                viewport={{ once: true, amount: 0.3 }} // Only animate once when 30% of element is visible
                                className='
                                bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                                flex flex-col sm:flex-row items-start gap-8 p-6 border border-gray-100
                                h-[400px] sm:h-[250px] overflow-hidden relative' /* Fixed height for uniformity, overflow hidden for content */
                            >
                                {/* Image */}
                                <div className='flex-shrink-0 w-full sm:w-1/2 h-1/2 sm:h-full'>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className='w-full h-full object-cover rounded-lg shadow-md' // Image takes full height of its container
                                    />
                                </div>

                                {/* Contents */}
                                <div className='py-4 flex-1 flex flex-col justify-between h-1/2 sm:h-full overflow-hidden'>
                                    <Link to={`/blog/${item.id}`}> {/* Dynamic link for individual blog post */}
                                        <h3 className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors mb-3'>
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <div className='w-16 h-1 bg-indigo-500 rounded-full mb-4'></div> {/* Stylish separator */}
                                    <p className='text-base text-gray-600 leading-relaxed flex-grow overflow-hidden'>
                                        {item.description}
                                    </p>
                                    <Link
                                        to={`/blog/${item.id}`}
                                        className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                    >
                                        Read More &rarr;
                                    </Link>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div >
    );
};

export default Blogs;
