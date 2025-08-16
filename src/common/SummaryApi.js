export const baseURL = "https://blinkit-be-1.onrender.com"

const SummaryApi =  {
    register: {
        url: '/api/user/register',
        method: 'post'
    },
    login: {
        url: '/api/user/login',
        method: 'post'
    },
    forgotPassword: {
        url: '/api/user/forgot-password',
        method: 'put'
    },
    forgot_password_otp_verification: {
        url: '/api/user/verify-forgot-password-otp',
        method: 'put'
    },
    resetPassword: {
        url: '/api/user/reset-password',
        method: 'put'
    },
    refreshToken: {
        url: '/api/user/refresh-token',
        method: 'post'
    },
    userDetails: {
        url: '/api/user/user-details',
        method: 'get'
    },
    logout: {
        url: '/api/user/logout',
        method: 'get'
    },
    uploadAvatar: {
        url: '/api/user/upload-avatar',
        method: 'put'
    },
    updateUserDetails: {
        url: '/api/user/update-user',
        method: 'put'
    },
    addCategory: {
        url: '/api/category/add-category',
        method: 'post'
    },
    uploadImage: {
        url: '/api/file/upload',
        method: 'post'
    },
    getCategories: {
        url: '/api/category/get-category',
        method: 'get'
    },
    updateCategory: {
        url: '/api/category/update-category',
        method: 'put'
    },
    deleteCategory: {
        url: '/api/category/delete-category',
        method: 'delete'
    },
    createSubCategory: {
        url: '/api/subCategory/create-subcategory',
        method: 'post'
    },
    getSubCategory: {
        url: '/api/subCategory/get-subcategory',
        method: 'get'
    },
    updateSubCategory: {
        url: '/api/subCategory/update-subcategory',
        method: 'put'
    },
    deleteSubCategory: {
        url: '/api/subCategory/delete-subcategory',
        method: 'delete'
    },
    createProduct: {
        url: '/api/product/create-product',
        method: 'post'
    },
    getProducts: {
        url: '/api/product/get-product',
        method: 'post'
    },
    getProductByCategory: {
        url: '/api/product/get-product-by-category',
        method: 'post'
    },
    getProductByCategoryAndSubCategory: {
        url: '/api/product/get-product-by-category-and-subcategory',
        method: 'post'
    },
    getProductDetails: {
        url: '/api/product/get-product-details',
        method: 'post'
    },
    updateProductDetails: {
        url: '/api/product/update-product-details',
        method: 'put'
    },
    deleteProduct: {
        url: '/api/product/delete-product',
        method: 'delete'
    },
    searchProduct: {
        url: '/api/product/search-product',
        method: 'post'
    },
    addToCart: {
        url: '/api/cart/create',
        method: 'post'
    },
    getCartItem: {
        url: '/api/cart/get',
        method: 'get'
    }, 
    updateCartItemQty: {
       url: '/api/cart/update-qty',
       method: 'put'
    },
    deleteCartItem: {
       url: '/api/cart/delete-cart-item',
       method: 'delete'
    },
    addAddress: {
        url: '/api/address/create',
        method: 'post'
    },
    getAddress: {
        url: '/api/address/get',
        method: 'get'
    },
    updateAddress: {
        url: '/api/address/update',
        method: 'put'
    },
    deleteAddress: {
        url: '/api/address/delete',
        method: 'delete'
    },
    cashOnDelivery: {
        url: '/api/order/cash-on-delivery',
        method: 'post'
    },
    payment: {
        url: '/api/order/checkout',
        method: 'post'
    },
    webhookStripe: {
        url: '/api/order/webhook-stripe',
        method: 'post'
    },
    getOrderDetails: {
        url: '/api/order/order-list',
        method: 'get'
    }
}

export default SummaryApi