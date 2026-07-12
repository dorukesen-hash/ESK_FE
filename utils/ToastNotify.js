import {toast} from 'react-toastify';

export const successNote = msg =>
	toast.success(msg, {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		closeButton: true,
	});

export const errorNote = msg =>
	toast.error(msg, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		closeButton: true,
		className: 'my-toast',
		bodyClassName: '',
	});