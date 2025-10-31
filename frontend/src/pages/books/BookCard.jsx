import React from 'react';
import { FaShoppingCart, FaFilePdf } from "react-icons/fa"; // Imported FaFilePdf and FaShoppingCart
import { getImgUrl } from '../../utils/getImgUrl'; // Assumed to be your utility for image URLs
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { motion } from 'framer-motion'; // For card animations

const BookCard = ({ book }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Handle adding a book to the cart
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        // Optional: Provide user feedback like a toast notification
        console.log(`Added "${product.title}" to cart.`);
    };

    // Handle clicking the "Buy Now" button to proceed to checkout
    const handleBuyNow = () => {
        // Navigate to the checkout page, passing the entire book object in the state
        navigate('/checkout', { state: { book } });
    };

    // Framer Motion variants for card hover animation
    const cardHoverVariants = {
        rest: { scale: 1, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)" },
        hover: {
            scale: 1.03,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.2, ease: "easeOut" }
        },
    };

    return (
        <motion.div
            className="rounded-lg transition-shadow duration-300 bg-white p-4 h-full flex flex-col shadow-md" // Added shadow-md for consistent look
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4 flex-grow">
                {/* Book Cover Image - Links to individual book details page */}
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
                    <Link to={`/books/${book._id}`} className="block h-full w-full">
                        <img
                            src={book.coverImage ? getImgUrl(book.coverImage) : "https://placehold.co/200x288/E0E0E0/888888?text=No+Image"}
                            alt={book.title || "Book Cover"}
                            className="w-full h-72 object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/200x288/E0E0E0/888888?text=No+Image";
                            }}
                        />
                    </Link>
                </div>

                {/* Book Information and Actions */}
                <div className="flex flex-col flex-grow">
                    {/* Book Title - Links to individual book details page */}
                    <Link to={`/books/${book?._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-2 leading-tight">
                            {book.title || "Untitled Book"}
                        </h3>
                    </Link>
                    {/* Book Description */}
                    <p className="text-gray-600 text-sm mb-2 flex-grow">
                        {book?.description && book.description.length > 120
                            ? `${book.description.slice(0, 120)}...`
                            : book.description || "No description available."}
                    </p>

                    {/* PDF Link Section */}
                    {book.pdfUrl && ( // Conditionally render if pdfUrl exists
                        <a
                            href={book.pdfUrl}
                            target="_blank" // Opens the PDF in a new browser tab
                            rel="noopener noreferrer" // Recommended for security with target="_blank"
                            className="flex items-center text-amber-600 hover:text-amber-800 transition-colors duration-200 mb-3 font-medium"
                            title="View PDF Version" // Tooltip on hover
                        >
                            <FaFilePdf className="mr-2 size-6 md:size-7" /> {/* Adjusted size for better visibility */}
                            <span>PDF Version Available</span>
                        </a>
                    )}

                    {/* Book Price */}
                    <p className="font-medium text-lg mb-4">
                        Kes{book?.newPrice?.toFixed(2) || 'N/A'}
                        {book?.oldPrice && (
                            <span className="line-through font-normal ml-2 text-gray-400">
                                Kes{book.oldPrice.toFixed(2)}
                            </span>
                        )}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-auto">
                        {/* "Add to Cart" Button */}
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="flex-1 min-w-[120px] bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2
                                       hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <FaShoppingCart className="text-lg" />
                            <span className="text-sm font-medium">Add to Cart</span>
                        </button>

                        {/* "Buy Now" Button - Navigates to Checkout Page */}
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 min-w-[120px] bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2
                                       hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span className="text-sm font-medium">Buy Now</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BookCard;
