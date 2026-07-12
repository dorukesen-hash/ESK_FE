export default function StripeModal({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
			onClick={handleBackdropClick}
		>
			{children}
		</div>
	);
}