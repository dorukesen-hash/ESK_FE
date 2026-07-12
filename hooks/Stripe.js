import {useState, useEffect} from "react";
import api from "@/hooks/Api"; // API instance

export const useCreatePaymentIntent = (amount) => {
	const [clientSecret, setClientSecret] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [lastAmount, setLastAmount] = useState(null);

	useEffect(() => {
		if (!amount || typeof amount !== "number" || amount <= 0 || amount === lastAmount) return;
		const fetchClientSecret = async () => {
			setLoading(true);
			try {
				const response = await api.post("/stripe/create-payment-intent", {amount, currency: "usd"});
				if (response?.data?.clientSecret) {
					setClientSecret(response.data.clientSecret);
					setLastAmount(amount);
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
	}, [amount, lastAmount]);

	return {clientSecret, loading, error};
};
