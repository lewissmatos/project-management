import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./routes/AppRoutes";

function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
