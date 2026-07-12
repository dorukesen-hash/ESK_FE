"use client"

import {AppContext} from "@/Context/AppContext";
import {useContext, useEffect, useState} from "react";

export default function RecipientAddressForm () {
    const {state, order, setOrder} = useContext(AppContext);
    const { user } = state;
    const { recipient, billing } = order;
    const [isBillingDifferent, setIsBillingDifferent] = useState(false);

    useEffect(() => {
      if(user?.email !== recipient.email) {
        setOrder({
          ...order,
          recipient: {
            email: user?.email || "",
            firstname: user?.name || "",
            lastname: user?.surname || "",
            phone: user?.shipping_profies[0]?.phone || "",
            firstline: user?.shipping_profies[0]?.firstline || "",
            secondline: user?.shipping_profies[0]?.secondline || "",
            city: user?.shipping_profies[0]?.city || "",
            state: user?.shipping_profies[0]?.state || "",
            zip: user?.shipping_profies[0]?.zip || "",
            country: user?.shipping_profies[0]?.country || "",
          },
          billing: isBillingDifferent ? billing : {
            email: user?.email || "",
            firstname: user?.name || "",
            lastname: user?.surname || "",
            phone: user?.shipping_profies[0]?.phone || "",
            firstline: user?.shipping_profies[0]?.firstline || "",
            secondline: user?.shipping_profies[0]?.secondline || "",
            city: user?.shipping_profies[0]?.city || "",
            state: user?.shipping_profies[0]?.state || "",
            zip: user?.shipping_profies[0]?.zip || ""
          }
        });
      }
      }, [user, isBillingDifferent]);

    // recipient değiştiğinde billing'i güncelle
    useEffect(() => {
      if (!isBillingDifferent) {
        setOrder(order => ({
          ...order,
          billing: {
            firstname: order.recipient.firstname || "",
            lastname: order.recipient.lastname || "",
            email: order.recipient.email ||"" ,
            phone: order.recipient.phone || "",
            firstline: order.recipient.firstline || "",
            secondline: order.recipient.secondline || "",
            city: order.recipient.city || "",
            state: order.recipient.state || "",
            zip: order.recipient.zip || ""
          }
        }));
      }
    }, [order.recipient, isBillingDifferent]);

    const handleRecipientChange = (e) => {
      const { name, value } = e.target;
      setOrder({
        ...order,
        recipient: {
          ...order.recipient,
          [name]: value || "",
        },
        billing: isBillingDifferent ? order.billing : {
          ...order.recipient,
          [name]: value || "",
        }
      });
    };

    const handleBillingChange = (e) => {
      const { name, value } = e.target;
      setOrder({
        ...order,
        billing: {
          ...order.billing,
          [name]: value || "",
        }
      });
    };

    return (
      <div>
        <div
          autoComplete="on"
          className="w-full max-w-[720px] grid grid-cols-12 gap-[10px] text-text-dark"
        >
          <h2 className="text-[18px] tablet:text-[22px] font-semibold mb-[24px] col-span-full">
            Shipping Address
          </h2>

          <div className="flex flex-col col-span-full">
            <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-semibold">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="shipping_email"
              name="email"
              type="email"
              value={recipient?.email}
              placeholder="Enter your email address"
              className="w-full h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
              onChange={handleRecipientChange}
            />
            <p className="text-[12px] indent-1 tablet:indent-4">
              Your account will automatically created after checkout.
            </p>
          </div>
          <div className="flex flex-col tablet:col-span-4 col-span-6">
            <label
              className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]"
              htmlFor="shipping_firstName"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="shipping_firstName"
              name="firstname"
              autoComplete="given-name"
              type="text"
              value={recipient?.firstname}
              placeholder="First name"
              className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
              onChange={handleRecipientChange}
            />
          </div>
          <div className="flex flex-col tablet:col-span-4 col-span-6">
            <label
              className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]"
              htmlFor="shipping_lastName"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="shipping_lastName"
              name="lastname"
              autoComplete="family-name"
              type="text"
              value={recipient?.lastname}
              placeholder="Last name"
              className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
              onChange={handleRecipientChange}
            />
          </div>
          <div className="flex flex-col tablet:col-span-4 col-span-6">
            <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="shipping_phone">
              Phone Number
            </label>
            <input
                id="shipping_phone"
                name="phone"
                autoComplete="phone"
                type="tel"
                value={recipient?.phone}
                placeholder="Phone number"
                className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                onChange={handleRecipientChange}
            />
          </div>
          <div className="flex flex-col col-span-full ">
            <label
                className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]"
                htmlFor="shipping_address1"
            >
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
                id="shipping_address1"
                name="firstline"
                autoComplete="address-line1"
                type="text"
                value={recipient?.firstline}
                placeholder="Address Line 1"
                className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                onChange={handleRecipientChange}
            />
          </div>
          <div className="flex flex-col col-span-full ">
            <label
              className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]"
              htmlFor="shipping_address2"
            >
              Address Line 2 (Optional)<span className="text-red-500">*</span>
            </label>
            <input
              id="shipping_address2"
              name="secondline"
              autoComplete="address-line2"
              type="text"
              value={recipient?.secondline}
              placeholder="Address Line 2 (Optional)"
              className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
              onChange={handleRecipientChange}
            />
          </div>
          <div className="flex flex-col tablet:col-span-4 col-span-6">
            <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="shipping_state">
              State/Province
            </label>
            <input
              id="shipping_state"
              name="state"
              autoComplete="state"
              type="text"
              value={recipient?.state}
              placeholder="State or Province"
              className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
              onChange={handleRecipientChange}
            />
          </div>
          <div className="flex flex-col tablet:col-span-4 col-span-6">
            <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="shipping_city">
              City
            </label>
            <input
              id="shipping_city"
              name="city"
              autoComplete="address-level2"
              type="text"
              value={recipient?.city}
              placeholder="City"
              className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
              onChange={handleRecipientChange}
            />
          </div>
          <div className="flex flex-col tablet:col-span-4 col-span-6">
            <label
              className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]"
              htmlFor="shipping_postalCode"
            >
              Zip/Postal Code
            </label>
            <input
              id="shipping_postalCode"
              name="zip"
              autoComplete="postal-code"
              type="text"
              value={recipient?.zip}
              placeholder="Zip or postal code"
              className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
              onChange={handleRecipientChange}
            />
          </div>
        </div>
        <div className="col-span-full my-4">
          <label className="flex items-center gap-2 text-[15px] font-[500]">
            <input
                type="checkbox"
                checked={isBillingDifferent}
                onChange={e => setIsBillingDifferent(e.target.checked)}
                className="w-4 h-4"
            />
            My billing address is different from my shipping address
          </label>
        </div>
        {/* Billing address form (shown only if different) */}
        
        
        {isBillingDifferent && (
          <div className="mt-8 col-span-full">
            <h2 className="text-[22px] font-[500] mb-[24px]">Billing Address</h2>
            <div
                autoComplete="on"
                className="w-full max-w-[720px] grid grid-cols-12 gap-[10px] text-text-dark"
            >
              <div className="flex flex-col col-span-full">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="billing_email"
                  name="email"
                  type="email"
                  value={billing.email || ""}
                  placeholder="Enter your billing email address"
                  className="w-full  h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col tablet:col-span-4 col-span-6">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="billing_firstName">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="billing_firstName"
                  name="firstname"
                  autoComplete="given-name"
                  type="text"
                  value={billing.firstname || ""}
                  placeholder="Billing first name"
                  className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col tablet:col-span-4 col-span-6">
                <label
                    className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]"
                    htmlFor="billing_lastName"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="billing_lastName"
                    name="lastname"
                    autoComplete="family-name"
                    type="text"
                    value={billing.lastname}
                    placeholder="Billing last name"
                    className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                    onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col tablet:col-span-4 col-span-6">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="billing_phone">
                  Phone Number
                </label>
                <input
                  id="billing_phone"
                  name="phone"
                  autoComplete="phone"
                  type="tel"
                  value={billing.phone || ""}
                  placeholder="Billing phone number"
                  className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col col-span-full ">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="billing_address1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  id="billing_address1"
                  name="firstline"
                  autoComplete="address-line1"
                  type="text"
                  value={billing.firstline || ""}
                  placeholder="Billing Address Line 1"
                  className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col col-span-full ">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="billing_address2">
                  Address Line 2 (Optional)
                </label>
                <input
                  id="billing_address2"
                  name="secondline"
                  autoComplete="address-line2"
                  type="text"
                  value={billing.secondline || ""}
                  placeholder="Billing Address Line 2 (Optional)"
                  className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col tablet:col-span-4 col-span-6">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="billing_state">
                  State/Province
                </label>
                <input
                  id="billing_state"
                  name="state"
                  autoComplete="state"
                  type="text"
                  value={billing.state || ""}
                  placeholder="Billing state or province"
                  className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col tablet:col-span-4 col-span-6">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="billing_city">
                  City
                </label>
                <input
                  id="billing_city"
                  name="city"
                  autoComplete="address-level2"
                  type="text"
                  value={billing.city || ""}
                  placeholder="Billing city"
                  className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
              <div className="flex flex-col tablet:col-span-4 col-span-6">
                <label className="text-[12px] tablet:text-[14px] indent-1 tablet:indent-4 font-[500]" htmlFor="billing_postalCode">
                  Zip/Postal Code
                </label>
                <input
                  id="billing_postalCode"
                  name="zip"
                  autoComplete="postal-code"
                  type="text"
                  value={billing.zip || ""}
                  placeholder="Billing zip or postal code"
                  className="h-[39px] border-[1px] border-border-gray rounded-[8px] text-[12px] indent-1 tablet:indent-4"
                  onChange={handleBillingChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
};