import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import axios from "axios";
import getBaseURL from '../utils/baseURL';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseURL()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            const auth = response.data;
            console.log(auth)
            // navigate("/");
        } catch (error) {
            setMessage("Please provide valid credentials.");
            console.error("Login error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-slate-200">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center tracking-wide">
                        Admin <span className="text-indigo-600">Login</span>
                    </h2>
                    <p className="text-center text-gray-500 mt-2">Enter your credentials to access the dashboard.</p>
                </div>

                {message && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {message}</span>
                </div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="relative">
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                            type="email"
                            placeholder="Email Address"
                            className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <input
                            {...register("password", { required: "Password is required" })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="appearance-none block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="text-gray-500 hover:text-indigo-500 focus:outline-none"
                            >
                                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out font-semibold"
                    >
                        Sign in
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                        </div>
                    </div>

                    
                </div>

                <p className='mt-8 text-center text-gray-500 text-xs'>© 2025 CM. All rights reserved</p>
            </div>
        </div>
    );
};

export default AdminLogin;