import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('mpesa'); // Default to M-Pesa
    const [mpesaNumber, setMpesaNumber] = useState('');
    const [processingPayment, setProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [fullName, setFullName] = useState('');
      const [email, setEmail] = useState('');


    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleMpesaNumberChange = (event) => {
        setMpesaNumber(event.target.value);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handlePayWithMpesa = async () => {
        if (!mpesaNumber) {
            setPaymentError('Please enter your M-Pesa phone number.');
            return;
        }
        if (!fullName) {
            setPaymentError('Please enter your full name.');
            return;
        }
          if (!email) {
            setPaymentError('Please enter your email.');
            return;
        }
        setPaymentError('');
        setProcessingPayment(true);

        // Simulate sending M-Pesa request (replace with actual API call)
        console.log('Initiating M-Pesa payment for:', mpesaNumber, 'amount:', totalPrice);
        setTimeout(() => {
            setProcessingPayment(false);
            // In a real scenario, you would check the payment status
            alert('M-Pesa payment request sent. Please check your phone to enter your PIN.');
            // Optionally redirect to an order confirmation page
            navigate('/order-confirmation');
        }, 3000);
    };



    if (cartItems.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty.</h2>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                    <ul className="-my-6 divide-y divide-gray-200">
                        {cartItems.map(item => (
                            <li key={item?._id} className="flex py-6">
                                
                                
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                                    <img
                                        src={getImgUrl(item?.coverImage)}
                                        alt={item.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link to="/">{item.title}</Link>
                                            </h3>
                                            <p className="ml-4">Ksh {item.newPrice}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Category: {item?.category}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty: 1</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 border-t border-gray-200 py-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>Ksh {totalPrice}</p>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Shipping and taxes calculated at the next step.</p>
                    </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={fullName}
                            onChange={handleFullNameChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="mb-4">
                    
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <select
                            id="paymentMethod"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                        >
                            <option value="mpesa">M-Pesa</option>
                        </select>
                    </div>

                    {paymentMethod === 'mpesa' && (
                        <div>
                            <div className="mb-4">
                                <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700">M-Pesa Phone Number</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500">254</span>
                                    </div>
                                    <input
                                        type="tel"
                                        id="mpesaNumber"
                                        className="block w-full pl-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="7xxxxxxxx"
                                        value={mpesaNumber}
                                        onChange={handleMpesaNumberChange}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handlePayWithMpesa}
                                className={`w-full rounded-md bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition duration-300 cursor-pointer ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={processingPayment}
                            >
                                {processingPayment ? 'Sending M-Pesa Request...' : 'Pay with M-Pesa'}
                            </button>
                        </div>
                    )}



                    {paymentError && <p className="mt-4 text-red-500">{paymentError}</p>}

                    <div className="mt-6 flex justify-center text-sm text-gray-600">
                        <Link to="/cart" className="font-medium text-indigo-600 hover:text-indigo-500">
                            &larr; Back to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
