import { createBrowserRouter  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home"
import Search from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import Product from "../pages/Product";
import AdminPermission from "../layouts/AdminPermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../components/CartMobile";
import CheckOutPage from "../components/CheckOutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "otp-verification",
                element: <OtpVerification />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "user",
                element: <UserMenuMobile />
            }, 
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "category",
                        element: <AdminPermission><CategoryPage /></AdminPermission>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermission><SubCategoryPage /></AdminPermission>
                    },
                    {
                        path: "uploadproduct",
                        element: <AdminPermission><UploadProduct /></AdminPermission>
                    },
                    {
                        path: "product",
                        element: <AdminPermission><Product /></AdminPermission>
                    },
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "myorders",
                        element: <MyOrders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    }
                ]
            },
            {
                path: ":category",
                children: [
                    {
                        path: ":subcategory",
                        element: <ProductListPage />
                    }
                ]
            },
            {
                path: "product/:product",
                element: <ProductDisplayPage />
            },
            {
                path: "cart",
                element: <CartMobile />
            },
            {
                path: "checkout",
                element: <CheckOutPage />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: "cancel",
                element: <Cancel />
            }
        ]
    }
])

export default router;