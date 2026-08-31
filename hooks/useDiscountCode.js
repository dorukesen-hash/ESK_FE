"use client";

import { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "@/Context/AppContext";
import api from "@/hooks/Api";

// Shared by CartTable's "Coupon Code" input and SummaryCard's "Have a
// coupon?" link - both apply/preview against the same order.discountCode
// (persisted on the shared `order` context state, so it survives the
// Cart -> Shipping -> Payment navigation) via the same public
// POST /discount-codes/validate endpoint create-payment-intent/createOrder
// use internally, so the preview can never promise more than checkout
// actually gives.
export const useDiscountCode = () => {
    const { order, setOrder } = useContext(AppContext);
    const [preview, setPreview] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [error, setError] = useState(null);

    const items = (order?.items || []).map((item) => ({ variantId: item.id, quantity: item.quantity }));
    const itemsSignature = JSON.stringify(items);

    useEffect(() => {
        if (!order?.discountCode || items.length === 0) {
            setPreview(null);
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                const res = await api.post("/discount-codes/validate", { items, discountCode: order.discountCode });
                if (!cancelled) {
                    setPreview(res.data);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setPreview(null);
                    setError(err?.response?.data?.message || "Invalid discount code.");
                }
            }
        })();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order?.discountCode, itemsSignature]);

    const applyCode = useCallback(
        async (code) => {
            const trimmed = (code || "").trim();
            if (!trimmed) return;
            setIsApplying(true);
            setError(null);
            try {
                const res = await api.post("/discount-codes/validate", { items, discountCode: trimmed });
                setPreview(res.data);
                setOrder((prev) => ({ ...prev, discountCode: trimmed }));
            } catch (err) {
                setError(err?.response?.data?.message || "Invalid discount code.");
                setPreview(null);
            } finally {
                setIsApplying(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [itemsSignature, setOrder]
    );

    const removeCode = useCallback(() => {
        setPreview(null);
        setError(null);
        setOrder((prev) => ({ ...prev, discountCode: "" }));
    }, [setOrder]);

    return { discountCode: order?.discountCode || "", preview, isApplying, error, applyCode, removeCode };
};
