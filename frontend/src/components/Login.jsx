import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { GiBookCover, GiBookshelf } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [message, setMessage] = useState("");
  const {loginUser, SignInWithGoogle} = useAuth();
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = async(data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Login Successful");
      navigate("/")
    
    } catch (error) {

      setMessage("Please provide a valid email and password")
      console.log(error)
      
    }
  }

  const handleGoogleSignIn = async() => {
    try {
      await SignInWithGoogle();
      alert("Signed In Successfully")
      navigate("/")
    } catch (error) {
      alert("Google sign in failed!")
      console.log(error)
      navigate("/")
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"

          />
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"

            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-500 hover:text-yellow-500"
            >
              {showPassword ? <GiBookshelf size={24} /> : <GiBookCover size={24} />}
            </button>
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-3 mt-4 bg-[#000080] text-white rounded-lg hover:bg-green-600 transition-all">
            Login
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
          <FaGoogle /> Sign in with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
        <br />

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Booky. All rights reserved</p>


      </div>

    </div>
  );
};

export default Login;
