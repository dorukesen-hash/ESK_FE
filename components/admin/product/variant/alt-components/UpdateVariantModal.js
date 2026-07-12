"use client";
import api from "@/hooks/Api";
import { successNote } from "@/utils/ToastNotify";
import React, { useState } from "react";

export default function UpdateVariantModal({ variant, onClose }) {
  const [formData, setFormData] = useState({
    id: variant?.id,
    title: variant?.title || "",
    stock: variant?.stock || "",
    description: variant?.description ? variant?.description : "",
    listItems:
      variant?.extradata && variant?.extradata?.list_items !== null
        ? variant?.extradata?.list_items
        : [],
    one_four_units: variant?.one_four_units
      ? parseFloat(variant?.one_four_units)
      : 0,
    five_nine_units: variant?.five_nine_units
      ? parseFloat(variant?.five_nine_units)
      : 0,
    ten_plus_units: variant?.ten_plus_units
      ? parseFloat(variant?.ten_plus_units)
      : 0,
    pallet_pricing: variant?.pallet_pricing
      ? parseFloat(variant?.pallet_pricing)
      : 0,
    unit: variant?.unit ? variant?.unit : "",
    pack_width: variant?.package_info
      ? parseFloat(variant?.package_info?.box_width)
      : 0,
    pack_length: variant?.package_info
      ? parseFloat(variant?.package_info?.box_length)
      : 0,
    pack_height: variant?.package_info
      ? parseFloat(variant?.package_info?.box_height)
      : 0,
    pack_weight: variant?.package_info
      ? parseFloat(variant?.package_info?.box_weight)
      : 0,
    units_per_pallet: variant?.units_per_pallet
      ? parseFloat(variant?.units_per_pallet)
      : 0,
    pallet_width: variant?.pallet_info
      ? parseFloat(variant?.pallet_info?.pallet_width)
      : 0,
    pallet_length: variant?.pallet_info
      ? parseFloat(variant?.pallet_info?.pallet_length)
      : 0,
    pallet_height: variant?.pallet_info
      ? parseFloat(variant?.pallet_info?.pallet_height)
      : 0,
    pallet_weight: variant?.pallet_info
      ? parseFloat(variant?.pallet_info?.pallet_weight)
      : 0,
    quantity_case: variant?.quantity_case ? variant?.quantity_case : 0,
    color: variant?.color ? variant?.color : "",
    size: variant?.size ? variant?.size : "",
    footage: variant?.footage ? variant?.footage : 0,
    thickness: variant?.thickness ? variant?.thickness : 0,
    break_strength: variant?.break_strength ? variant?.break_strength : 0,
    bullet_1: variant?.bullet_1 ? variant?.bullet_1 : "",
    bullet_2: variant?.bullet_2 ? variant?.bullet_2 : "",
    bullet_3: variant?.bullet_3 ? variant?.bullet_3 : "",
    bullet_4: variant?.bullet_4 ? variant?.bullet_4 : "",
    bullet_5: variant?.bullet_5 ? variant?.bullet_5 : "",
    bullet_6: variant?.bullet_6 ? variant?.bullet_6 : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put("/admin/variant", formData)
      .then((resp) => {
        successNote("Variant updated successfully!");
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 p-6 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Update Variant</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Section (1. Section) */}
          <div className="col-span-2 border border-gray-500 rounded-lg p-4 mb-4 bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">Title and Features</h3>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-white mt-1 w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div className="flex flex-wrap gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-medium text-gray-700">
                    Stock #
                  </label>
                  <input
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="bg-white mt-1 w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="bg-white mt-1 w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-medium text-gray-700">
                    Footage
                  </label>
                  <input
                    type="number"
                    name="footage"
                    value={formData.footage}
                    onChange={handleChange}
                    className="bg-white mt-1 w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-medium text-gray-700">
                    Thickness
                  </label>
                  <input
                    type="number"
                    name="thickness"
                    value={formData.thickness}
                    onChange={handleChange}
                    className="bg-white mt-1 w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2, 3, 4 ve 5, 6, 7 Sectionlar için iki sütunlu düzen */}
          <div className="grid grid-cols-2 gap-4">
            {/* Sol Sütun (2, 3, 4. Sectionlar) */}
            <div className="space-y-4">
              {/* Description Section (2. Section) */}
              <div className="bg-gray-100 border border-gray-500 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Description Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bullet 1
                      </label>
                      <textarea
                        name="bullet_1"
                        value={formData.bullet_1}
                        onChange={handleChange}
                        className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bullet 2
                      </label>
                      <textarea
                        name="bullet_2"
                        value={formData.bullet_2}
                        onChange={handleChange}
                        className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bullet 3
                      </label>
                      <textarea
                        name="bullet_3"
                        value={formData.bullet_3}
                        onChange={handleChange}
                        className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bullet 1
                      </label>
                      <textarea
                        name="bullet_4"
                        value={formData.bullet_4}
                        onChange={handleChange}
                        className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bullet 5
                      </label>
                      <textarea
                        name="bullet_5"
                        value={formData.bullet_5}
                        onChange={handleChange}
                        className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bullet 6
                      </label>
                      <textarea
                        name="bullet_6"
                        value={formData.bullet_6}
                        onChange={handleChange}
                        className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Sütun (5, 6, 7. Sectionlar) */}
            <div className="space-y-4">
              {/* Prices Section (5. Section) */}
              <div className="bg-gray-100  border border-gray-500 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Prices Section</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Single Price
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="one_four_units"
                      value={formData.one_four_units}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Five
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="five_nine_units"
                      value={formData.five_nine_units}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ten
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="ten_plus_units"
                      value={formData.ten_plus_units}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pallet
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pallet_pricing"
                      value={formData.pallet_pricing}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Package Info Section (6. Section) */}
              <div className="bg-gray-100  border border-gray-500 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Package Info Section
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Package Width
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pack_width"
                      value={formData.pack_width}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Package Length
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pack_length"
                      value={formData.pack_length}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Package Height
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pack_height"
                      value={formData.pack_height}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Package Weight
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pack_weight"
                      value={formData.pack_weight}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Pallet Info Section (7. Section) */}
              <div className="bg-gray-100  border border-gray-500 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Pallet Info Section
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Units per Pallet
                    </label>
                    <input
                      type="number"
                      name="units_per_pallet"
                      value={formData.units_per_pallet}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pallet Width
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pallet_width"
                      value={formData.pallet_width}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pallet Length
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pallet_length"
                      value={formData.pallet_length}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pallet Height
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pallet_height"
                      value={formData.pallet_height}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pallet Weight
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="pallet_weight"
                      value={formData.pallet_weight}
                      onChange={handleChange}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
