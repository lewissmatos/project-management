import { FC } from "react";
import {
	ToastContainer as Container,
	// Slide,
	Flip,
	ToastContainerProps,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer: FC<
	ToastContainerProps & { isAuthenticated: boolean }
> = ({ isAuthenticated }) => {
	return (
		<Container
			theme={isAuthenticated ? "light" : "dark"}
			transition={Flip}
			autoClose={2000}
			style={{ marginTop: 50, fontSize: 16 }}
			limit={5}
			newestOnTop
		/>
	);
};

export default ToastContainer;
