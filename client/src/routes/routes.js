import Admin from "../components/admin/admin"
import SignIn from "../components/auth/signin"
import SignUp from "../components/auth/signup"
import Cart from "../components/cart/cart"
import Product from "../components/product/product"
import CategoryProducts from "../components/products/category-products"
import Products from "../components/products/products"

import { 
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    PRODUCT_ROUTE,
    PRODUCTS_ROUTE,
    ADMIN_ROUTE,
    CATEGORY_PRODUCTS_ROUTE,
    CART_ROUTE
} from "../utils/consts"

export const authRoutes = [
    {
        path: SIGNIN_ROUTE,
        Component: SignIn
    },
    {
        path: SIGNUP_ROUTE,
        Component: SignUp
    }
]

export const publicRoutes = [
    {
        path: PRODUCTS_ROUTE,
        Component: Products
    },
    {
        path: PRODUCT_ROUTE,
        Component: Product
    },
    {
        path: CATEGORY_PRODUCTS_ROUTE,
        Component: CategoryProducts
    },
 
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]