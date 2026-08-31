import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,  // Ensure cookies are sent with every request
	xsrfCookieName: 'XSRF-TOKEN', // Backend bu cookie'yi ayarlamalı
	xsrfHeaderName: 'X-XSRF-TOKEN', // İsteklerde otomatik header
});

// Üretimde NEXT_PUBLIC_API_URL mutlaka https:// ile başlamalı.

// Request Interceptor
api.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error)
);


// Response Interceptor to Handle Token Expiry & Refresh
let isRefreshing = false;
api.interceptors.response.use(
	(response) => response,
	async (error) => {

		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			// ✅ Prevent multiple refresh attempts
			if (isRefreshing) {
				return Promise.reject(error);
			}

			isRefreshing = true;
			originalRequest._retry = true;

			try {
				await api.post("/auth/refresh-token"); // Calls the backend to refresh the token
				isRefreshing = false;
				return api(originalRequest); // ✅ Retry the original request
			} catch (refreshError) {
				console.error("Token refresh failed:", refreshError);
				isRefreshing = false;
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export const googleAuthUrl = `${api.defaults.baseURL}/auth/google`;


// User
export const getUserDetails = async () => {
	const response = await api.get("/user/user-details");
	return response.data
}

// Category
export const getAllCategories = async () => {
	const response = await api.get('/category')
	return response.data
}
export const getCategoryById = async (id) => {
	const response = await api.get(`/category/:${id}`)
	return response.data
}

// SubCategory
export const getSubCategories = async () => {
	const response = await api.get(`/subcategory`);
	return response.data;
}
export const getSubCategoryById = async (id) => {
	let finalId;

	if (typeof id === 'string' && /^\d+$/.test(id)) {
		finalId = parseInt(id, 10);
	} else {
		finalId = id;
	}

	const response = await api.get(`/subcategory/details/${finalId}`);
	return response.data;
}

// Product
export const getAllProducts = async () => {
	const response = await api.get(`/product`);
	return response.data
}

export const getProductsById = async (id) => {
	let finalId;

	if (typeof id === 'string' && /^\d+$/.test(id)) {
		finalId = parseInt(id, 10);
	} else {
		finalId = id;
	}

	const response = await api.get(`/product/details/${finalId}`);
	return response.data;
};

export const getProductsByName = async (name) => {
	const response = await api.get(`/product/name/`,
		{headers: {query: name}}
	);
	return response.data;
}

// Variant
export const getAllVariants = async () => {
	const response = await api.get(`/variant`);
	return response.data
}

export const getAllVariantsOfProduct = async (id) => {
	const response = await api.get(`/variant/productId/${id}`);
	return response.data
}

export const getVariantById = async (id) => {
	const response = await api.get(`/variant/${id}`);
	return response.data
}

export const getVariantsByIdList = async (ids) => {
	try {
		const response = await api.post(`/variant/id-list`, { ids: ids });
		return response.data;
	} catch (error) {
		console.error("getVariantsByIdList error:", error);
		return error;
	}
}
// Calculate Shipping

export const getShippingOptions = async (info, cancelToken) => {
	const response = await api.post(`/services/combined-shipping-options`, info, { cancelToken });
	return response.data
}

export const calculateTax = async ({items, address}) => {
	const res = await axios.post("/api/stripe/calculate-tax", {
		items,
		address,
	});
	return res.data;
}


// Cart
export const getUserCart = async () => {
	const response = await api.get(`/cart`);
	return response.data
}
export const updateUserCart = async (item) => {
	const response = await api.put(`/cart/update`, item);
	return response.data
}
export const deleteUserCart = async (id) => {
	const response = await api.delete(`/cart/delete`, {data: {id}});
	return response
}

export const updateCartDetails = async (cartObject) => {
	try {
		const responses = [];

		for (let i = 0; i < cartObject.length; i++) {
			const item = cartObject[i];
			let variant = await getVariantById(item.id);
			variant.quantity = item.quantity;
			variant.isPallet = item.isPallet;
			responses.push(variant);
		}
		return responses;
	} catch (error) {
		console.error("updateCartDetails error:", error);
		return [];
	}
};

// Orders
export const getOrders = async (params) => {
	const response = await api.get('/account/orders', { params });
	return response.data;
}

// Invoices
export const getInvoices = async () => {
	const response = await api.get('/account/invoices');
	return response.data?.invoices ?? [];
}

export default api;