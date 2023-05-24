//export const BACKEND_HOST: string = 'http://localhost:5000';
export const BACKEND_HOST: string = 'https://market-place-v1o0.onrender.com:5000';
export const API: string = `${BACKEND_HOST}/api`;
export const AUTH_API: string = `${API}/auth`;
export const PRODUCTS_API: string = `${API}/products`;
export const COMPILATIONS_API: string = `${API}/compilations`;
export const CART_API: string = `${API}/cart`;

export const ROUTE_HOME = '/';
export const ROUTE_LOGIN = '/login';
export const ROUTE_CART = '/cart';
export const ROUTE_ORDER = '/order';
export const ROUTE_PRODUCT = '/product';
export const ROUTE_PRODUCT_ID = '/product/:id';
export const ROUTE_PROFILE = '/profile';
export const ROUTE_CATALOGUE = '/catalogue';