import {useState, useEffect} from "react";
import api from "@/hooks/Api"; // API instance

// `cart` is { items: [{variantId, quantity}], shipping: {...} } - the actual
// charge amount is computed server-side from real catalog prices, not sent
// as a raw dollar amount (see ESK_API's stripeController.createPaymentIntent).
export const useCreatePaymentIntent = (cart) => {
	const [clientSecret, setClientSecret] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [lastSignature, setLastSignature] = useState(null);

	const items = cart?.items;
	const shipping = cart?.shipping;
	const signature = items && items.length > 0 ? JSON.stringify({ items, shipping }) : null;

	useEffect(() => {
		if (!signature || signature === lastSignature) return;
		const fetchClientSecret = async () => {
			setLoading(true);
			try {
				const response = await api.post("/stripe/create-payment-intent", { items, shipping, currency: "usd" });
				if (response?.data?.clientSecret) {
					setClientSecret(response.data.clientSecret);
					setLastSignature(signature);
				} else {
					console.log({"Error": "clientSecret couldn't be created!"})
				}
			} catch (err) {
				console.error("Error Creating Payment Intent:", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchClientSecret();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signature, lastSignature]);

	return {clientSecret, loading, error};
};
