"use client"


import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/Context/AppContext";
import EditShippingProfile from "./EditShippingProfile";

export default function SelectShippingAddress () {
    const {state, refreshUserDetails, order, setOrder} = useContext(AppContext);
    const {user} = state;
    const [shippingProfiles, setShippingProfiles] = useState( []);
    const [editIndex, setEditIndex] = useState(null);
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        setShippingProfiles(user?.shipping_profies);
    },[user]);

    const updateShippingAddress = (address) => {
        // order içindeki recipient'ı güncelle
        const updatedOrder = {
            ...order,
            recipient: {
                ...order.recipient,
                firstline: address.firstline || "",
                secondline: address.secondline || "",
                city: address.city || "",
                state: address.state || "",
                zip: address.zip || "",
                country: address.country || "",
                phone: address.phone || ""
            }
        };
        setOrder(updatedOrder);
    }

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleSave = async (updatedAddress) => {
        if (updatedAddress === null) {
            // Silme işlemi: ilgili adresi shippingProfiles listesinden çıkar
            const filteredProfiles = shippingProfiles.filter((_, idx) => idx !== editIndex);
            setShippingProfiles(filteredProfiles);
            setEditIndex(null);
            await refreshUserDetails();
            return;
        }
        const updatedProfiles = [...shippingProfiles];
        updatedProfiles[editIndex] = updatedAddress;
        setShippingProfiles(updatedProfiles);
        setEditIndex(null);
        await refreshUserDetails(); // Adres işlemi sonrası user-details güncelle
    };

    const handleAddSave = async (newAddress) => {
        setShippingProfiles([...shippingProfiles, newAddress]);
        setAddMode(false);
        await refreshUserDetails(); // Yeni adres ekleme sonrası user-details güncelle
    };

    const handleCancel = () => {
        setEditIndex(null);
        setAddMode(false);
    };

    const handleAdd = () => {
        setAddMode(true);
    };

    console.log(user)
    return (
        <div
            autoComplete="on"
            className="w-full max-w-[720px] text-text-dark mb-[24px]"
        >
            <h2 className="text-[18px] tablet:text-[22px] font-[500] mb-[24px]">
                Shipping Profiles
            </h2>
            {(editIndex !== null || addMode) ? (
                <EditShippingProfile
                    address={editIndex !== null ? shippingProfiles[editIndex] : { title: "", firstline: "", secondline: "", city: "", state: "", zip: "", phone: "" }}
                    onSave={editIndex !== null ? handleSave : handleAddSave}
                    onCancel={editIndex !== null ? handleCancel : handleCancel}
                />
            ) : (
                <div className="flex flex-wrap w-full gap-1 tablet:gap-2">
                    {shippingProfiles?.map((address, index) => (
                        <div
                            key={index}
                            className="mb-[20px] p-[16px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                            onClick={() => updateShippingAddress(address)}
                        >
                            <h3 className="text-[14px] tablet:text-[18px] font-[500] mb-[8px]">{address.title}</h3>
                            <p className="text-[12px] tablet:text-[14px] mb-[4px]">{address.firstline} {address.secondline}</p>
                            <p className="text-[12px] tablet:text-[14px] mb-[4px]">{address.city}, {address.state} {address.zip}</p>
                            <p className="text-[12px] tablet:text-[14px]">Phone: {address.phone}</p>
                            <button className="text-[12px] mt-[8px] tablet:text-[14px] text-text-blue hover:underline" onClick={(e) => {e.stopPropagation(); handleEdit(index);}}>
                                Edit
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAdd}
                        className="text-[12px] tablet:text-[14px] h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-text-blue hover:border-text-blue hover:text-text-blue px-4"
                    >
                        + Add New Address
                    </button>
                </div>
            )}
        </div>
    )

}