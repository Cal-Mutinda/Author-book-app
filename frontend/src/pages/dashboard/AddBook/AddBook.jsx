// src/pages/dashboard/AddBook.jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import InputField from './InputField'
import SelectField from './SelectField'
import { useAddBookMutation } from '../../../redux/features/books/bookApi'

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [addBook, { isLoading }] = useAddBookMutation()
  const [imageFile, setImageFile] = useState(null)
  const [imageFileName, setImageFileName] = useState('')

  const handleFileChange = ({ target }) => {
    const file = target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageFileName(file.name)
    }
  }

  const onSubmit = async (formData) => {
    const newBook = { ...formData, coverImage: imageFileName }
    try {
      await addBook(newBook).unwrap()
      reset()
      Swal.fire({ icon: 'success', title: 'Added!', text: 'Your book has been added.' })
    } catch {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' })
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-10 py-10 bg-gray-200 rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">📚 Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Title"
          name="title"
          placeholder="e.g. Atomic Habits"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Short description about the book"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose a category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('trending')}
            className="accent-blue-600 h-5 w-5 rounded"
          />
          <span className="text-sm text-gray-700 font-medium">Mark as Featured</span>
        </label>

        <InputField
          label="Price (Ksh)"
          name="newPrice"
          type="number"
          placeholder="e.g. 19.99"
          register={register}
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2 file:cursor-pointer file:transition hover:file:bg-purple-700 text-sm text-gray-600"
          />
          {imageFileName && <p className="mt-1 text-xs text-gray-500">Selected: {imageFileName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Book File</label>
          <input
            type="file"
            accept="pdf/*"
            onChange={handleFileChange}
            className="file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2 file:cursor-pointer file:transition hover:file:bg-purple-700 text-sm text-gray-600"
          />
          {imageFileName && <p className="mt-1 text-xs text-gray-500">Selected: {imageFileName}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 text-center text-white bg-purple-600 hover:bg-purple-700 font-semibold rounded-xl shadow-md transition duration-200"
        >
          {isLoading ? 'Adding…' : 'Add Book'}
        </button>
      </form>
    </div>
  )
}

export default AddBook
