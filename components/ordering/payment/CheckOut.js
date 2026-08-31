"use client";

import {Elements, PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useState, useContext} from "react";
import {AppContext} from "@/Context/AppContext";
import {useCreatePaymentIntent} from "@/hooks/Stripe";
import api from "@/hooks/Api";
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const CheckoutForm = () => {
	const { order, setOrder } = useContext(AppContext);
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		try {
			console.log("starting payment process...");

			// 1. Stripe ile ödeme onayı
			const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
				elements,
				redirect: "if_required",
				confirmParams: {
					return_url: `${window.location.origin}/cart/success`,
				},
			});

			console.log("paymentIntent:", paymentIntent);

			if (stripeError) {
				setError(stripeError.message);
				setLoading(false);
				return;
			}

			console.log("stripe error:", stripeError);

			// 2. Ödeme başarılı mı?
			if (paymentIntent && paymentIntent.status === "succeeded") {
				console.log("payment succeeded", paymentIntent);

				// 3. Build the object to send from the REAL Stripe result, not
				// the stale `order` closure from before confirmPayment ran -
				// setOrder() below is async and wouldn't be reflected in
				// `order` in this same tick. Field names here (id, payment_method)
				// match what the backend actually reads from a real PaymentIntent.
				const confirmedOrder = {
					...order,
					paymentIntent: {
						id: paymentIntent.id,
						amount: paymentIntent.amount,
						currency: paymentIntent.currency,
						status: paymentIntent.status,
						payment_method: paymentIntent.payment_method,
					},
				};
				setOrder(confirmedOrder);

				// 4. Order API'ye gönder
				const res = await api.post("/orders/", confirmedOrder);
				console.log("order success:", res);

				// Eğer cevap 200 ise yönlendirme yap
				if (res.status === 200) {
					router.push('/cart/success');
				}


			}
		} catch (err) {
			console.error("Order error:", err);
			setError("Beklenmeyen bir hata oluştu.");
		}

		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-[480px] w-full p-8 bg-white shadow-lg rounded-lg">
			<PaymentElement/>
			<button
				type="submit"
				disabled={!stripe || loading}
				className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 mt-4"
			>
				{loading ? "Processing Payment..." : "💳 Pay Now"}
			</button>
			{error && <p className="text-red-500 mt-2">{error}</p>}
		</form>
	);
};

export default function CheckOut() {
	const { order } = useContext(AppContext);

	// The charge amount is computed server-side (from real catalog prices for
	// the logged-in customer) - we only send what's in the cart, not a dollar
	// amount. See ESK_API's stripeController.createPaymentIntent.
	const { clientSecret, loading, error } = useCreatePaymentIntent({
		items: order.items.map((item) => ({ variantId: item.id, quantity: item.quantity })),
		shipping: order.shipping,
	});

	const appearance = { theme: "stripe" };
	const options = { clientSecret, appearance };

	if (loading) return <p className="text-center">💳 Preparing payment page...</p>;
	if (error) return <p className="text-center text-red-500">⚠️ Error: {error.message}</p>;

	return (
		<>
			{clientSecret && (
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm  />
				</Elements>
			)}
		</>
	);
}
