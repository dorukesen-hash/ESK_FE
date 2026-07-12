// appReducer.js - Flat array structure for cart, categories, and detailedCart


export const initialState = {
	user: null,
	isAuthenticated: false,
	categories: [],
	cart: [],
	detailedCart: [],
};
export const initialOrderState = {
	billing: {
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		firstline: "",
		secondline: "",
		city: "",
		state: "",
		zip: ""
	},
	items: [],
	recipient: {
		firstname: "",
		lastname: "",
		firstline: "",
		secondline: "",
		email: "",
		phone: "",
		city: "",
		state: "",
		zip: ""
	},
	shipping: {
		carrier: "",
		tracking: "",
		price: 0,
		totalDeci: 0,
		totalWeight: 0
	},
	paymentIntent: {
		paymentIntentId: "",
		amount: 0,
		currency: "usd",
		created: null,
		description: null,
		status: "",
		receiptEmail: null,
		shipping: null,
		paymentMethod: ""
	}
};

export const appReducer = (state, action) => {
	switch (action.type) {
		// User
		case "SET_USER":
			return {
				...state,
				user: action.payload,
				isAuthenticated: !!action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};

		// Categories
		case "SET_CATEGORIES":
			return {
				...state,
				categories: action.payload,
			};

		// Cart
		case "SET_CART":
			return {
				...state,
				cart: action.payload,
			};

		// Detailed Cart
		case "SET_DETAILED_CART":
			return {
				...state,
				detailedCart: action.payload,
			};

		default:
			return state;
	}
};
