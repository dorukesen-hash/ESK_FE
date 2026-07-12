import React, { useState } from "react";
import { api } from "@/hooks/Api";

export default function EditShippingProfile({ address, onSave, onCancel, updateUser }) {
    const [form, setForm] = useState(address);
    const [activeInput, setActiveInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            let response;
            if (address && address.id) {
                // Edit işlemi
                response = await api.put(`/shippingprofiles/${address.id}`, form);
            } else {
                // Yeni adres ekleme
                response = await api.post("/shippingprofiles", form);
            }
            if (response.status === 200 || response.status === 201) {
                onSave(response.data);
                if (updateUser) updateUser(response.data.user); // API'den dönen güncel user ile state'i güncelle
            } else {
                setError(address && address.id ? "Adres güncellenemedi." : "Adres eklenemedi.");
            }
        } catch (err) {
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.delete(`/shippingprofiles/${address.id}`);
            if (response.status === 200 || response.status === 204) {
                onSave(null); // Silme sonrası parent'a bildir
            } else {
                setError("Adres silinemedi.");
            }
        } catch (err) {
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-[10px] shadow-md shadow-border-gray p-6">
            <h3 className="text-lg font-semibold mb-2">{address && address.id ? "Edit Address" : "Add New Address"}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded border-border-gray focus:border-custom-blue outline-none" onFocus={() => setActiveInput('title')} onBlur={() => setActiveInput("")} />
                <input name="firstline" value={form.firstline} onChange={handleChange} placeholder="Address Line 1" className="border p-2 rounded border-border-gray focus:border-custom-blue outline-none" onFocus={() => setActiveInput('firstline')} onBlur={() => setActiveInput("")} />
                <input name="secondline" value={form.secondline} onChange={handleChange} placeholder="Address Line 2" className="border p-2 rounded border-border-gray focus:border-custom-blue outline-none" onFocus={() => setActiveInput('secondline')} onBlur={() => setActiveInput("")} />
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded border-border-gray focus:border-custom-blue outline-none" onFocus={() => setActiveInput('city')} onBlur={() => setActiveInput("")} />
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 rounded border-border-gray focus:border-custom-blue outline-none" onFocus={() => setActiveInput('state')} onBlur={() => setActiveInput("")} />
                <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip Code" className="border p-2 rounded border-border-gray focus:border-custom-blue outline-none" onFocus={() => setActiveInput('zip')} onBlur={() => setActiveInput("")} />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded border-border-gray focus:border-custom-blue outline-none" onFocus={() => setActiveInput('phone')} onBlur={() => setActiveInput("")} />
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <div className="flex gap-2 mt-2 justify-between">
                    {/* Sadece düzenleme modunda silme butonu göster */}
                    {address && address.id && (
                        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600">Delete</button>
                    )}
                    <div className="flex gap-2">
                        <button type="button" onClick={onCancel} className="bg-border-gray text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="bg-custom-blue text-white px-4 py-2 rounded cursor-pointer hover:bg-custom-button-green" disabled={loading}>{address && address.id ? (loading ? "Kaydediliyor..." : "Save") : (loading ? "Ekleniyor..." : "Add")}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
