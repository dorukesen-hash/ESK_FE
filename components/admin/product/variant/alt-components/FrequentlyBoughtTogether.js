import React, { useEffect, useState } from "react";
import api from "@/hooks/Api";

const FrequentlyBoughtTogether = ({ variant, allVariants }) => {
  const [items, setItems] = useState([{ id: "0001", title: "item 001", stock:"0000001" },{ id: "0002", title: "item 001", stock:"0000002" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [variantSearch, setVariantSearch] = useState("");

  const filteredVariants = allVariants.filter(variant =>
    variant.title.toLowerCase().includes(variantSearch.toLowerCase()) ||
    variant.stock?.toLowerCase().includes(variantSearch.toLowerCase())
  );

  // Varyant ekleme
  const addItem = async () => {
    if (!selectedVariantId) return;
    const selected = allVariants.find(v => v.id === Number(selectedVariantId));
    if (selected && !items.some(item => item.id === selected.id)) {
      setLoading(true);
      setError(null);
      try {
        // API'ye POST isteği atılıyor
        await api.post("/featured", {source_id: variant.id, target_id : selected.id}
        );
        setItems([...items, selected]);
        setSelectedVariantId("");
      } catch (err) {
        setError("Varyant eklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Varyant silme
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="p-2 text-[12px]">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : items.length === 0 ? (
        <p>-</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} onClick={() => setModalOpen(true)} style={{ cursor: "pointer" }}>
              <span className="font-semibold">{item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}</span> <br/> {item.stock}
            </li>
          ))}
        </ul>
      )}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md mx-auto">
            <h4 className="text-sm font-semibold mb-4 text-center">Update Frequently Bought Together</h4>
            <ul className="mb-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-1">
                  <p> <span  className="font-semibold">{item.title.length > 40 ? item.title.slice(0, 50) + "..." : item.title} </span> <br/>{item.stock}</p>
                  <button onClick={() => deleteItem(item.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mb-4">
              <input
                type="text"
                placeholder="Search variant..."
                value={variantSearch}
                onChange={e => setVariantSearch(e.target.value)}
                className="border rounded px-2 py-1 w-full mb-1"
              />
              <div className="border rounded bg-white max-h-40 overflow-y-auto">
                {filteredVariants.length === 0 ? (
                  <div className="px-2 py-1 text-gray-400">No variants found</div>
                ) : (
                  filteredVariants.map(v => (
                    <div
                      key={v.id}
                      className={`px-2 py-1 cursor-pointer hover:bg-blue-100 ${selectedVariantId === String(v.id) ? 'bg-blue-200' : ''}`}
                      onClick={() => setSelectedVariantId(String(v.id))}
                    >
                      {v.title.length > 60 ? v.title.slice(0, 60) + "..." : v.title} <br/> {v.stock}
                    </div>
                  ))
                )}
              </div>
              <button onClick={addItem} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Add</button>
            </div>
            <button onClick={() => setModalOpen(false)} className="w-full py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrequentlyBoughtTogether;
