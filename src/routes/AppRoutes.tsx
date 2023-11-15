import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProjectsScreen from "../components/Projects/ProjectsScreen";
import ReportsScreen from "../components/Reports/ReportsScreen";
import BoardScreen from "../components/Board/BoardScreen";
import PeopleScreen from "../components/People/PeopleScreen";
import LoginScreen from "../components/Login/LoginScreen";
import SignupScreen from "../components/Login/SignupScreen";

const AppRoutes = () => {
	const isLogged = Boolean(Number(localStorage.getItem("isLogged")));
	return (
		<Routes>
			<Route
				path="/*"
				element={<Navigate to={isLogged ? `/dashboard/` : `/login`} replace />}
			/>

			{isLogged ? (
				<Route element={<Layout />}>
					{/* Default route */}
					<Route
						path={`/dashboard/`}
						element={<Navigate to={`/dashboard/projects`} replace />}
					/>
					<Route path="/dashboard/projects" element={<ProjectsScreen />} />
					<Route
						path="/dashboard/projects/:projectId/board"
						element={<BoardScreen />}
					/>
					<Route
						path="/dashboard/projects/:projectId/reports"
						element={<ReportsScreen />}
					/>
					<Route path="/dashboard/people" element={<PeopleScreen />} />
				</Route>
			) : (
				<>
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/signup" element={<SignupScreen />} />
				</>
			)}
		</Routes>
	);
};

export default AppRoutes;
