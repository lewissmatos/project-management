import { useParams } from "react-router-dom";
import { IProject } from "../../utils/types";
import { Box, Typography } from "@mui/material";

import "./reports.scss";
import { getProject } from "../../services/projects.service";
import ProjectPieChart from "./ProjectPieChart";
import ProjectColumnBarChart from "./ProjectColumnBarChart";
import NotAssignedBarChart from "./NotAssignedBarChart";
const ReportsScreen = () => {
	const { projectId } = useParams();

	const project = getProject(projectId as string) as IProject;

	return (
		<Box className="reports-screen">
			<Typography sx={{ fontSize: 50, mb: 3 }}>
				Reportes - {project?.name}
			</Typography>
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
