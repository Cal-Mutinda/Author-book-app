import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { set, useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [message, setMessage] = useState("");
  const { registerUser } = useAuth();
  console.log(registerUser)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password"); // watch "password" field to validate confirm password


  //register User

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await registerUser(data.email, data.password);
      alert("Registration Successful")
    } catch (error) {

      setMessage("Please provide a valid email and password")
      console.log(error)

    }
  }

  const handleGoogleSignIn = () => {
    // Implement your Google Sign-In logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-[600px]">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
          </div>
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-500 hover:text-yellow-500"
            >
              {showPassword ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
            </button>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: value =>
                  value === password || "Passwords do not match"
              })}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3 text-gray-500 hover:text-yellow-500"
            >
              {showConfirmPassword ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#000080] text-white rounded-lg hover:bg-green-600 transition-all">
            Register
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <hr className="w-1/3 border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>
        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 flex items-center justify-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
          <FaGoogle /> Sign up with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
        <br />

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Bookshelf. All rights reserved</p>
      </div>
    </div>
  );
};

export default Register;