"use client"

import {createContext, useEffect, useReducer, useState, useCallback} from "react";
import {appReducer, initialOrderState, initialState} from "./AppReducer";
import api, {getUserCart, updateUserCart, updateCartDetails, getUserDetails, deleteUserCart} from "@/hooks/Api";
import {calculatePrice} from "@/hooks/service";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [loading, setLoading] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);
    const [order, setOrder] = useState(initialOrderState);
	const [options, setOptions] = useState(null);


	const fetchData = useCallback(async (actionType, endpoint) => {
		try {
			const res = await api.get(endpoint);
			dispatch({type: actionType, payload: res.data});
		} catch (error) {
			console.error(`Failed to fetch ${endpoint}:`, error);
		}
	}, []);

	const getCartFromAPI = useCallback(async () => {
        setLoading(true);
		console.log("gettinnggg caaarrrrrt from  API");
        try {
            const cart = await getUserCart();
            await updateDetailedCart(cart);
        } catch (err) {
            console.error("Failed to load user cart:", err);
        } finally {
            setLoading(false);
        }
    }, []);

	const checkAuth = useCallback(async () => {
		try {
			const res = await getUserDetails();
			dispatch({type: "SET_USER", payload: res.userObject});
		} catch (error) {
			dispatch({type: "LOGOUT", payload: null});
			console.error("Auth check failed:", error);
		} finally {
			// Kullanıcı olmasa bile cookie tabanlı sepeti API'den çek
			await getCartFromAPI();
		}
	}, [getCartFromAPI]);

	const loadCategories = useCallback(() => fetchData("SET_CATEGORIES", "/category"), [fetchData]);

	const updateCart = useCallback(async (item) => {
        setLoading(true);
        try {
            const updatedCart = await updateUserCart(item); // API
            dispatch({type: "SET_CART", payload: updatedCart}); // Context
            await updateDetailedCart(updatedCart); // detailedCart + cartTotal
        } catch (err) {
            console.error("Failed to update cart:", err);
        } finally {
            setLoading(false);
        }
    }, []);


	const updateDetailedCart = async (cartData) => {
		try {
			const detailedList = await updateCartDetails(cartData);
			detailedList.sort((a, b) => a.id - b.id);
			dispatch({type: "SET_DETAILED_CART", payload: detailedList});
			const total = detailedList.reduce((sum, item) => {
				const total = calculatePrice(item)
				return sum + total;
			}, 0);
			setCartTotal(total);
		} catch (err) {
			console.error("Error updating detailed cart:", err);
		}
	};


	const removeItemFromCart = async (id) => {
        setLoading(true);
        try {
            const res = await deleteUserCart(id);
            if (res.status === 200 && Array.isArray(res.data)) {
                dispatch({type: "SET_CART", payload: res.data});
                await updateDetailedCart(res.data);
            }
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        } finally {
            setLoading(false);
        }
    };

	const emptyCart = async () => {
        setLoading(true);
        try {
            const items = state.cart;
            for (const item of items) {
                await deleteUserCart(item.id);
            }
            await getCartFromAPI();
        } catch (err) {
            console.error("Failed to empty cart:", err);
        } finally {
            setLoading(false);
        }
    };

    // Adres işlemi sonrası user-details'i güncellemek için fonksiyon
    const refreshUserDetails = useCallback(async () => {
        try {
            await checkAuth(); // Hem user hem oturum güncellenir
        } catch (error) {
            console.error("Failed to refresh user details:", error);
        }
    }, [checkAuth]);

	useEffect(() => {
		const init = async () => {
			await loadCategories();
			await checkAuth();
			setLoading(false);
		};
		init();
	}, [checkAuth, loadCategories]);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
				loading,
				checkAuth,
				loadCategories,
				updateCart,
				getCartFromAPI,
				cartTotal,
				setCartTotal,
				removeItemFromCart,
				emptyCart,
				refreshUserDetails,
                order, setOrder,
				options, setOptions
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
