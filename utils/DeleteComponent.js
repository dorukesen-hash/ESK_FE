'use client';
import api from '@/hooks/Api';

const DeleteComponent = ({property, id, onClose, isOpen, variations, setVariations}) => {
	if (!isOpen) return null;

	const messages = {
		variant: 'Are you sure you want to delete the selected variant?',
		category: 'Are you sure you want to delete the selected category?',
		subcategory: 'Are you sure you want to delete the selected sub-category?',
	};

	const handleDelete = async () => {
		try {
			await api.delete(`/${property}/${id}`);
			if (variations) {
				setVariations(variations.filter(item => item.id !== id));
			}
			onClose();
		} catch (error) {
			console.error('Error deleting', error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
				<h2 className="text-xl font-semibold mb-4">{messages[property] || 'Are you sure?'}</h2>
				<div className="mt-4 flex justify-end space-x-2">
					<button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
						Cancel
					</button>
					<button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteComponent;
