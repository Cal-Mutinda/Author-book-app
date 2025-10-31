import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
  useAddBookMutation,
} from "../../../redux/features/books/bookApi";

const ManageBooks = () => {
  const navigate = useNavigate();
  const { data: books, refetch } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [addBook] = useAddBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    newPrice: "",
  });

  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert("Book deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error.message);
      alert("Failed to delete book. Please try again.");
    }
  };

  // Handle adding a book
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.category || !formData.newPrice) {
        alert("Please fill all fields!");
        return;
      }

      await addBook(formData).unwrap();
      alert("Book added successfully!");
      setFormData({ title: "", category: "", newPrice: "" });
      refetch();
    } catch (error) {
      console.error("Failed to add book:", error.message);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="w-full xl:w-8/12 mx-auto px-4">
          {/* Add Book Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-lg font-semibold mb-4">Add New Book</h2>
            <form
              onSubmit={handleAddBook}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <input
                type="text"
                placeholder="Book Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border p-2 rounded-md w-full"
              />
              <input
                type="number"
                placeholder="Price (Ksh)"
                value={formData.newPrice}
                onChange={(e) =>
                  setFormData({ ...formData, newPrice: e.target.value })
                }
                className="border p-2 rounded-md w-full"
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
              >
                Add Book
              </button>
            </form>
          </div>

          {/* Books Table */}
          <div className="relative flex flex-col bg-white shadow-lg rounded">
            <div className="px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-700 text-base">
                All Books
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase border-b">
                      #
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase border-b">
                      Book Title
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase border-b">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase border-b">
                      Price
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase border-b">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {books &&
                    books.map((book, index) => (
                      <tr key={book._id}>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          {book.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          Ksh {book.newPrice}
                        </td>
                        <td className="px-6 py-4 text-sm border-b space-x-3">
                          <Link
                            to={`/dashboard/edit-book/${book._id}`}
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageBooks;
