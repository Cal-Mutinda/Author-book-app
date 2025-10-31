import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/books/bookApi';
import { getImgUrl } from '../../utils/getImgUrl';
import { addToCart } from '../../redux/features/cart/cartSlice';
import Loading from '../../components/loading';
import { FiShoppingCart, FiFileText } from 'react-icons/fi';

const BookInfo = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError, error } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <Loading />;

  if (isError) {
    console.error("Error fetching book:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Error Loading Book Details</h2>
        <p className="text-lg mb-6">Something went wrong. Please try again later.</p>
        <Link to="/" className="text-blue-600 hover:underline text-base">← Back to Home</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-yellow-700 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Book Not Found</h2>
        <p className="text-lg mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="text-blue-600 hover:underline text-base">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Book Image */}
        <div className="relative p-6 flex justify-center items-start">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-64 h-auto object-cover rounded-2xl shadow-md"
          />
          {book.pdfUrl && (
            <div className="absolute bottom-4 left-4 bg-white text-green-700 px-4 py-2 rounded-xl flex items-center shadow-md">
              <FiFileText className="mr-2 text-lg" /> PDF Available
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">{book.title}</h1>

          <div className="space-y-2 text-gray-700 text-base">
            <p><span className="font-semibold">Author:</span> {book.author || 'Unknown Author'}</p>
            <p><span className="font-semibold">Published:</span> {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'N/A'}</p>
            <p><span className="font-semibold">Category:</span> {book.category}</p>
          </div>

          <p className="mt-6 text-gray-700 leading-relaxed border-t pt-4 text-lg">
            <span className="font-semibold">Description:</span> {book.description}
          </p>

          <div className="my-6 text-3xl font-bold text-indigo-600">
            Ksh {book.newPrice}
            {book.oldPrice && book.oldPrice > book.newPrice && (
              <span className="ml-4 text-gray-400 line-through text-xl font-medium">
                Ksh {book.oldPrice}
              </span>
            )}
          </div>

          {book.pdfUrl && (
            <>
              <div className="mb-6 inline-flex items-center gap-2 text-indigo-600 font-semibold text-base">
                📥 PDF Preview Below
              </div>
              {/* <iframe
                src={book.pdfUrl}
                title="PDF Preview"
                width="100%"
                height="500"
                className="rounded-lg border border-gray-300 shadow-sm"
              /> */}
            </>
          )}

          <button
            onClick={() => handleAddToCart(book)}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <FiShoppingCart className="text-xl" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
