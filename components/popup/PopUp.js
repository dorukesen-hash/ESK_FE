"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const PopUp = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const STORAGE_KEY = 'promo_popup_shown';
        try {
            const alreadyShown = typeof window !== 'undefined' && window.localStorage?.getItem(STORAGE_KEY);
            if (alreadyShown) return; // Daha önce gösterildiyse hiç açma
        } catch (_) {
            // localStorage erişimi başarısız olabilir (privacy mode vs.)
        }

        const timer = setTimeout(() => {
            setVisible(true);
            try {
                window.localStorage?.setItem(STORAGE_KEY, 'true');
            } catch (_) {}
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-[9999]">
            <div className="bg-white p-20 rounded-xl shadow-lg text-center max-w-[800px] mb-8 animate-slide-up">
                <p className="text-text-dark text-[24px] font-bold mb-6">
                    <span className="text-[72px]">10% OFF</span><br/>on first order!
                </p>
                <p className="text-text-dark text-[18px] mb-10">
                    Register now and get an instant 10% discount on your first order!<br />
                    No code needed — discount applies automatically.
                </p>
                <div className="flex justify-center gap-6">
                    <button
                        className="px-6 py-3 rounded-md bg-custom-blue text-white font-semibold hover:bg-custom-button-green transition flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            try { window.localStorage?.setItem('promo_popup_shown', 'true'); } catch (_) {}
                            setVisible(false);
                            setTimeout(() => router.push('/auth/register'), 100);
                        }}
                    >
                        Register
                    </button>
                    <button
                        className="px-6 py-3 rounded-md bg-button-gray text-text-dark font-semibold hover:bg-gray-400 transition cursor-pointer"
                        onClick={() => { try { window.localStorage?.setItem('promo_popup_shown', 'true'); } catch (_) {} setVisible(false); }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;