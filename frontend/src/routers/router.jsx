import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Book from "../pages/books/BookCard";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import Checkout from "../pages/books/Checkout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/AddBook/AddBook";
import BookInfo from "../pages/books/BookInfo";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <div>Orders</div>
            },
            {
                path: "/about",
                element: <div>About</div>
            },

            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/books/:id",
                element: <BookInfo/>
            }


        ]
    },
    {
        path: "/admin",
        element: <AdminLogin/>
    },

    {
        path: "/dashboard",
        element: <AdminRoute><Dashboard/></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><AdminDashboard/></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddBook/></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute> <div>Edit Book</div></AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBooks/></AdminRoute>
            }
        ]
    }
]);

export default router;