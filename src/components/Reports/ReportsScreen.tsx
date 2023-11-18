import { useNavigate, useParams } from "react-router-dom";
import { IProject } from "../../utils/types";
import { Box, Typography } from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import "./reports.scss";
import { getProject } from "../../services/projects.service";
import ProjectPieChart from "./ProjectPieChart";
import ProjectColumnBarChart from "./ProjectColumnBarChart";
import NotAssignedBarChart from "./NotAssignedBarChart";
import { BasicButton } from "../Basic";
const ReportsScreen = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();

	const project = getProject(projectId as string) as IProject;

	const onGoToBoard = () => {
		navigate(`/dashboard/projects/${projectId}/board/`);
	};
	return (
		<Box className="reports-screen">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mb: 2,
					alignItems: "center",
				}}
			>
				<Typography sx={{ fontSize: 50 }}>
					Reportes - {project?.name}
				</Typography>{" "}
				<BasicButton onClick={onGoToBoard} endIcon={<DashboardOutlinedIcon />}>
					Ver tablero
				</BasicButton>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					gap: 10,
				}}
			>
				<ProjectPieChart />
				<Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
					<Typography sx={{ fontSize: 30, mb: 3 }}>
						Estado de las tareas
					</Typography>
					<Box className="task-status-bar-chart__container">
						<ProjectColumnBarChart />
						<NotAssignedBarChart />
					</Box>
				</Box>
			</Box>
			<Box></Box>
		</Box>
	);
};

export default ReportsScreen;
