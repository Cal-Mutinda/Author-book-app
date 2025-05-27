import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice'

const CartPage = () => {


    const cartItems = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const handleRemovefromCart = (product) => {
        dispatch(removeFromCart(product))
    }
    const handleClearCart = (product) => {
        dispatch(clearCart(product))
    }

    return (
        <>
            <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl rounded-lg">
                <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
                    <div className="flex items-start justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>
                        <div className="ml-3 flex h-8 items-center">
                            <button

                                onClick={handleClearCart}
                                type="button"

                                className="relative -m-2 py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flow-root">

                            {
                                cartItems.length > 0 ? (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">

                                        {
                                            cartItems.map((product) => (
                                                <li key={product?._id} className="flex py-6 hover:bg-gray-200 transition duration-300 rounded-lg">
                                                    <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-600">
                                                        <img
                                                            alt="Book"
                                                            src={`${getImgUrl(product?.coverImage)}`}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>
                                                    <div className="ml-6 flex flex-1 flex-col">
                                                        <div className="flex justify-between text-xl font-semibold text-gray-800">
                                                            <h3>
                                                                <Link to='/'>{product.title}</Link>
                                                            </h3>
                                                            <p className="ml-4">Ksh {product.newPrice}</p>
                                                        </div>

                                                        <p className="mt-1 text-sm text-gray-600"><strong>Category :</strong> {product?.category}</p>
                                                        <div className="flex justify-between items-end mt-4">
                                                            <p className="text-gray-600"><strong>Qty:</strong> 1</p>


                                                            <button
                                                                onClick={() => handleRemovefromCart(product)}
                                                                type="button" className="text-red-600 hover:text-red-500 font-medium transition cursor-pointer">Remove</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }


                                    </ul>
                                ) : (<p>No Book Found</p>)
                            }


                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 px-6 py-8 sm:px-8">
                    <div className="flex justify-between text-xl font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Ksh {totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-8">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition duration-300"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-gray-600">
                        <Link to="/">
                            <button

                                type="button"
                                className=" cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 ml-1 transition"
                            >
                                Continue Shopping &rarr;
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage
