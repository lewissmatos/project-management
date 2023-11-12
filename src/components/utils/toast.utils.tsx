//Documents
// https://fkhadra.github.io/react-toastify/introduction/
import { toast, ToastOptions } from "react-toastify";

// Define the types of toast messages
export type ToastType = "success" | "error" | "warning" | "info";

// Define the structure of LaunchToastType interface
type LaunchToastType = {
	type?: ToastType;
	message: string;
	options?: ToastOptions;
	code?: number;
};

// Function to display a toast message
export const launchToast = ({
	type = "success",
	message,
	options = {},
	code,
}: LaunchToastType) => {
	if (code) {
		code >= 200 && code < 400 ? (type = "success") : (type = "error");
	}
	// Define toast methods for each type
	const { success, error, warning, info } = toast;

	// Assign appropriate toast method based on the provided type
	const toastType = {
		success,
		error,
		warning,
		info,
	};

	// Call the corresponding toast method with the provided message and options
	return toastType[type](message || type, options);
};
