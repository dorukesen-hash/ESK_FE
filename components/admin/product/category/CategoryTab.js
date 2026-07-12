import api from '@/hooks/Api';
import {successNote} from '@/utils/ToastNotify';
import {useState, useEffect, useRef} from 'react';

export default function CategoryTab() {
	const [categories, setCategories] = useState([]); // Kategorilerin listesi
	const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Ekleme modal'ı için
	const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Düzenleme modal'ı için
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Silme modal'ı için
	const [selectedCategory, setSelectedCategory] = useState(null); // Seçilen kategori
	const [newCategoryName, setNewCategoryName] = useState(""); // Yeni kategori adı
	const [editCategoryName, setEditCategoryName] = useState(""); // Düzenlenen kategori adı
	const [openMenuId, setOpenMenuId] = useState(null); // Açık olan menünün ID'si
	const editCategoryNameRef = useRef(editCategoryName);

	// Input değiştiğinde hem state'i hem de ref'i güncelle
	const handleInputChange = (e) => {
		const value = e.target.value;
		setEditCategoryName(value);
		editCategoryNameRef.current = value; // Ref'i güncelle
	};

	// Yeni kategori ekleme
	const handleAddCategory = () => {
		api
			.post(`/admin/category`, {
				name: newCategoryName ? newCategoryName.trim() : "",
			})
			.then((resp) => {
				if (newCategoryName.trim()) {
					const newCategory = {
						id: resp.data.id,
						name: newCategoryName,
					};
					setCategories([...categories, newCategory]);
					setNewCategoryName("");
					setIsAddModalOpen(false);
				}
			});
	};

	// Kategori düzenleme
	const handleEditCategory = () => {
		const currentName = editCategoryNameRef.current.trim(); // Ref'ten güncel değeri al
		if (!currentName) {
			return; // Boş isim girilmişse işlem yapma
		}

		api
			.put("/admin/category", {id: selectedCategory.id, name: currentName})
			.then((resp) => {
				const updatedCategories = categories.map((category) =>
					category.id === selectedCategory.id
						? {...category, name: currentName}
						: category
				);
				setCategories(updatedCategories);
				setIsEditModalOpen(false);
				successNote('Category updated successfully');
			})
			.catch((err) => {
				console.error("Category update error:", err.message);
			});
	};

	// Kategori silme
	const handleDeleteCategory = () => {
		api
			.delete(`/admin/category/${selectedCategory.id}`)
			.then((resp) => {
				const updatedCategories = categories.filter(
					(category) => category.id !== selectedCategory.id
				);
				setCategories(updatedCategories);
				setIsDeleteModalOpen(false);
				successNote("Category deleted successfully");
			})
			.catch((err) => console.log(err));
	};

	// Menüyü açıp kapama
	const toggleMenu = (id) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await api.get(`/admin/category/`);
				setCategories(response.data.rows); // Varyant verileri
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchCategories();
	}, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-text-dark">Category List</h2>


			{/* Ekleme Butonu */}
			<button
				onClick={() => setIsAddModalOpen(true)}
				className="cursor-pointer mb-4 p-2 px-6 bg-custom-blue text-white rounded-[4px] hover:bg-custom-button-green transition duration-200"
			>
				+ Add Category
			</button>

      {/* Tablo */}
      <div className="overflow-visible bg-white rounded-lg shadow text-text-dark">
        <table ble className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                {/* Actions Sütunu */}
                <td className="px-6 py-4 whitespace-nowrap relative">
                  <button
                    onClick={() => toggleMenu(category.id)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>

                  {/* Menü */}
                  {openMenuId === category.id && (
                    <div className="absolute left-5 mt-1 w-48 bg-white rounded-lg shadow-lg z-[9999] text-text-dark">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setEditCategoryName(category.name);
                          setIsEditModalOpen(true);
                          setOpenMenuId(null);
                        }}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDeleteModalOpen(true);
                          setOpenMenuId(null);
                        }}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>


							{/* Name Sütunu */}
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{category.name}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

      {/* Ekleme Modal'ı */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-text-dark">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Düzenleme Modal'ı */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-text-dark">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={editCategoryName}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEditCategory}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Silme Modal'ı */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-text-dark">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Delete Category</h3>
            <p className="mb-4">
              Are you sure you want to delete this category? Subcategories,
              products and variants linked to the category will also be deleted.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}