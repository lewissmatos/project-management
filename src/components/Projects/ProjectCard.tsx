import React, { MouseEventHandler, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./projects.scss";
import { IProject, ProjectStatus } from "../../utils/types";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EditIcon from "@mui/icons-material/Edit";
import { BasicIconButton, BasicTooltip } from "../Basic";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import {
	deleteProject,
	editProject,
	getAllProjects,
} from "../../services/projects.service";
import BasicDialog from "../Basic/BasicDialog";
import BasicButton from "../Basic/BasicButton";
import dayjs from "dayjs";
import { CircularProgress, CircularProgressProps } from "@mui/material";
import { getProjectProegress } from "./projects.utils";

function CircularProgressWithLabel(
	props: CircularProgressProps & { value: number | string; message?: string }
) {
	const alertIcon = {
		"!!": (
			<PriorityHighIcon
				sx={{ fontSize: 20, color: Colors.red }}
			></PriorityHighIcon>
		),
	};
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress variant="determinate" {...props} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
					sx={{ display: "flex", alignItems: "center" }}
				>
					{typeof props.value === "number" ? (
						`${Math.round(props.value)}%`
					) : (
						<BasicTooltip accent={Colors.red} title={props.message}>
							{alertIcon[props.value as never]}
						</BasicTooltip>
					)}
				</Typography>
			</Box>
		</Box>
	);
}

interface ProjectCardProps {
	project: IProject;
	setProjects?: any;
	onSetProjectToEdit?: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	setProjects,
	onSetProjectToEdit,
}) => {
	const navigate = useNavigate();
	const [openConfirmDeleteProjectModal, setOpenConfirmDeleteProjectModal] =
		useState(false);

	const onDeleteProject = () => {
		deleteProject(project.id as string);
		setProjects(getAllProjects());
	};

	const handleOpenConfirmDeleteProjectModal = () =>
		setOpenConfirmDeleteProjectModal(true);

	const handleCloseConfirmDeleteProjectModal = () =>
		setOpenConfirmDeleteProjectModal(false);

	const goTo =
		(path: string): MouseEventHandler<HTMLButtonElement> | undefined =>
		() => {
			navigate(`/dashboard/projects/${project.id}/${path}`);
			return;
		};

	const handleSetProjectStatus = (status: ProjectStatus) => () => {
		const newProject: IProject = {
			...project,
			status,
			...(status === "Finalizado" && {
				finishedAt: dayjs().format("YYYY-MM-DD, HH:mm"),
			}),
		};
		editProject(newProject);
		setProjects(getAllProjects());
	};

	return (
		<>
			<BasicDialog
				title="Eliminar proyecto"
				content={
					(
						<Typography>
							¿Estás seguro que deseas eliminar este proyecto?
						</Typography>
					) as any
				}
				open={openConfirmDeleteProjectModal}
				handleClose={handleCloseConfirmDeleteProjectModal}
				onAccept={onDeleteProject}
			/>
			<Box className="projects-card-container">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
						justifyContent: "space-between",
					}}
				>
					<Box className="card-header">
						<Typography className="project-title">{project.name}</Typography>
					</Box>
					<Box className="card-body">
						<Typography className="project-description">
							{project.description}
						</Typography>
						<Typography className={`project-status ${project.status}`}>
							{project.status}
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography className="project-dates">
								<span>
									Creado: {dayjs(project.createdAt).format("DD-MM-YYYY")}
								</span>
								<span>
									Finalizar para: {dayjs(project.endDate).format("DD-MM-YYYY")}
								</span>
								<span>
									Finalizado:{" "}
									{project.finishedAt
										? dayjs(project.finishedAt).format("DD-MM-YYYY")
										: "N/A"}
								</span>
							</Typography>

							<CircularProgressWithLabel
								value={getProjectProegress(project).value as any}
								message={getProjectProegress(project).message}
								sx={{ color: getProjectProegress(project).color }}
							/>
						</Box>
					</Box>
					<Box className="card-footer">
						<Box>
							<BasicIconButton
								remix="text"
								title="Eliminar proyecto"
								onClick={handleOpenConfirmDeleteProjectModal}
								tooltipOptions={{ tooltipaccent: Colors.red }}
							>
								<DeleteOutlineIcon sx={{ fontSize: 20, color: Colors.red }} />
							</BasicIconButton>
							<BasicIconButton
								remix="text"
								title="Editar proyecto"
								onClick={onSetProjectToEdit(project)}
							>
								<EditIcon sx={{ fontSize: 20 }} />
							</BasicIconButton>
						</Box>
						<BasicButton
							onClick={handleSetProjectStatus(
								project.status === "Activo" ? "Finalizado" : "Activo"
							)}
							size="small"
							remix={project.status === "Activo" ? "cancel" : "contained"}
						>
							{project.status === "Activo" ? "Finalizar" : "Reactivar"} proyecto
						</BasicButton>
						<Box>
							<BasicIconButton
								remix="text"
								title="Ver tablero"
								onClick={goTo("board")}
								// disabled={project.status === "Finalizado"}
							>
								<DashboardOutlinedIcon sx={{ fontSize: 20 }} />
							</BasicIconButton>
							<BasicIconButton
								remix="text"
								title="Ver reportes"
								onClick={goTo("reports")}
							>
								<DataUsageOutlinedIcon sx={{ fontSize: 20 }} />
							</BasicIconButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ProjectCard;
